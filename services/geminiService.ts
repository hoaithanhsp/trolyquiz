import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion, DifficultyLevel, DIFFICULTY_LABELS } from '../types';

const fileToPart = (file: File): Promise<any> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = (reader.result as string).split(',')[1];
            resolve({
                inlineData: {
                    data: base64String,
                    mimeType: file.type,
                },
            });
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

// Mô tả chi tiết các mức độ theo Bloom's Taxonomy
const DIFFICULTY_INSTRUCTIONS: Record<DifficultyLevel, string> = {
    nhan_biet: `
    MỨC ĐỘ: NHẬN BIẾT (Remember)
    - Câu hỏi yêu cầu nhớ lại, nhận diện thông tin cơ bản
    - Dạng: Định nghĩa là gì? Liệt kê các..., Đặc điểm nào sau đây...
    - Không cần suy luận, chỉ cần ghi nhớ
    - Đáp án thường có trong tài liệu nguyên văn`,

    thong_hieu: `
    MỨC ĐỘ: THÔNG HIỂU (Understand)  
    - Câu hỏi yêu cầu giải thích, so sánh, phân biệt khái niệm
    - Dạng: Giải thích tại sao..., So sánh A và B, Ý nghĩa của...
    - Cần hiểu bản chất, không chỉ ghi nhớ máy móc
    - Có thể diễn đạt bằng cách khác với tài liệu`,

    van_dung: `
    MỨC ĐỘ: VẬN DỤNG (Apply)
    - Câu hỏi yêu cầu áp dụng kiến thức vào tình huống cụ thể
    - Dạng: Áp dụng công thức để tính..., Trong trường hợp X thì...
    - Cần vận dụng lý thuyết để giải quyết vấn đề thực tế
    - Có thể có bài toán, tình huống giả định`,

    van_dung_cao: `
    MỨC ĐỘ: VẬN DỤNG CAO (Analyze/Evaluate/Create)
    - Câu hỏi yêu cầu phân tích, đánh giá, tổng hợp phức tạp
    - Dạng: Phân tích nguyên nhân..., Đánh giá ưu nhược điểm..., Đề xuất giải pháp...
    - Kết hợp nhiều kiến thức, tư duy phản biện
    - Tình huống phức tạp, nhiều bước giải`,

    hon_hop: `
    MỨC ĐỘ: HỖN HỢP (Mixed)
    - Kết hợp tất cả các mức độ: Nhận biết, Thông hiểu, Vận dụng, Vận dụng cao
    - Phân bố: 20% Nhận biết, 30% Thông hiểu, 30% Vận dụng, 20% Vận dụng cao
    - QUAN TRỌNG: Tạo câu hỏi theo THỨ TỰ TĂNG DẦN về mức độ:
      + Bắt đầu với các câu NHẬN BIẾT (nhan_biet)
      + Tiếp theo là THÔNG HIỂU (thong_hieu)
      + Sau đó là VẬN DỤNG (van_dung)
      + Cuối cùng là VẬN DỤNG CAO (van_dung_cao)
    - Đảm bảo đa dạng độ khó để đánh giá toàn diện`
};

// Danh sách models theo thứ tự ưu tiên
const MODELS = ['gemini-3-flash-preview', 'gemini-3-pro-preview', 'gemini-2.5-flash'];

// Lấy API key từ localStorage
const getApiKey = (): string => {
    const key = localStorage.getItem('gemini_api_key');
    if (!key) {
        throw new Error('API key không tồn tại. Vui lòng cài đặt API key.');
    }
    return key;
};

export const generateQuizData = async (
    topic: string,
    files: File[],
    count: number,
    difficultyLevel: DifficultyLevel = 'hon_hop'
): Promise<QuizQuestion[]> => {
    // Schema definition for strict JSON output
    const schema = {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                id: { type: Type.INTEGER },
                type: { type: Type.STRING, enum: ["mcq", "tf", "short"] },
                topic: { type: Type.STRING },
                question: { type: Type.STRING },
                options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "Bắt buộc cho MCQ. 4 lựa chọn."
                },
                correct: {
                    type: Type.NUMBER,
                    description: "MCQ: Index (0-3). TF: 1 là Đúng, 0 là Sai. Short: Giá trị số."
                },
                explain: { type: Type.STRING },
                level: {
                    type: Type.STRING,
                    enum: ["nhan_biet", "thong_hieu", "van_dung", "van_dung_cao"],
                    description: "Mức độ của câu hỏi"
                }
            },
            required: ["id", "type", "topic", "question", "correct", "explain", "level"]
        }
    };

    const difficultyInstruction = DIFFICULTY_INSTRUCTIONS[difficultyLevel];
    const levelLabel = DIFFICULTY_LABELS[difficultyLevel];

    const systemInstruction = `
    Bạn là Trợ lý Soạn Bài Giảng AI chuyên nghiệp.
    Nhiệm vụ: Tạo ${count} câu hỏi kiểm tra bài cũ bằng TIẾNG VIỆT dựa trên tài liệu cung cấp.
    
    ${difficultyInstruction}
    
    Yêu cầu quan trọng:
    1. Ngôn ngữ: 100% Tiếng Việt.
    2. Định dạng Toán học: Sử dụng LaTeX $$...$$ cho công thức.
    3. Đa dạng câu hỏi: Trắc nghiệm (mcq), Đúng/Sai (tf), Điền số (short).
    4. Giải thích (explain): Ngắn gọn, súc tích, bằng tiếng Việt.
    5. Mức độ đã chọn: ${levelLabel}
    6. Trường \"level\" trong mỗi câu hỏi phải ghi rõ mức độ thực tế của câu đó.
    7. Chỉ trả về JSON thuần theo schema.
    `;

    const parts = [];

    if (files.length > 0) {
        for (const file of files) {
            const part = await fileToPart(file);
            parts.push(part);
        }
        parts.push({ text: `Hãy phân tích tài liệu và tạo ${count} câu hỏi ${levelLabel} về chủ đề: ${topic || "Nội dung chính"}` });
    } else {
        parts.push({ text: `Hãy tạo ${count} câu hỏi ${levelLabel} về chủ đề: ${topic}` });
    }

    // Retry với 3 models
    let lastError: Error | null = null;
    for (const model of MODELS) {
        try {
            const apiKey = getApiKey();
            const ai = new GoogleGenAI({ apiKey });

            console.log(`Đang thử với model: ${model}...`);

            const response = await ai.models.generateContent({
                model,
                contents: { parts },
                config: {
                    systemInstruction,
                    responseMimeType: "application/json",
                    responseSchema: schema,
                    temperature: 0.4,
                }
            });

            const rawData = JSON.parse(response.text || "[]");

            // Map data to match types strictly
            let questions = rawData.map((q: any) => {
                let cleanCorrect = q.correct;
                if (q.type === 'tf') {
                    cleanCorrect = q.correct === 1 || q.correct === true;
                }
                return {
                    ...q,
                    correct: cleanCorrect,
                    level: q.level || difficultyLevel
                };
            });

            // Nếu là mức độ hỗn hợp, sắp xếp theo thứ tự tăng dần
            if (difficultyLevel === 'hon_hop') {
                const levelOrder: Record<DifficultyLevel, number> = {
                    nhan_biet: 1,
                    thong_hieu: 2,
                    van_dung: 3,
                    van_dung_cao: 4,
                    hon_hop: 0 // không dùng trong sort
                };

                questions.sort((a, b) => {
                    const orderA = levelOrder[a.level as DifficultyLevel] || 0;
                    const orderB = levelOrder[b.level as DifficultyLevel] || 0;
                    return orderA - orderB;
                });
            }

            return questions;
        } catch (err: any) {
            lastError = err;
            console.error(`Model ${model} thất bại:`, err.message);
            // Tiếp tục với model tiếp theo
        }
    }

    // Tất cả models đều fail
    throw new Error(`Không thể tạo câu hỏi. Lỗi cuối: ${lastError?.message || 'Unknown error'}`);
};