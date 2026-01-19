import { SavedQuiz, QuizQuestion, QuizSettings, DifficultyLevel } from '../types';

const STORAGE_KEY = 'quizgen_library';

// Lấy tất cả quiz đã lưu
export const getQuizzes = (): SavedQuiz[] => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) return [];
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return [];
    }
};

// Lưu quiz mới
export const saveQuiz = (
    name: string,
    topic: string,
    questions: QuizQuestion[],
    settings: QuizSettings,
    difficultyLevel: DifficultyLevel
): SavedQuiz => {
    const quizzes = getQuizzes();

    const newQuiz: SavedQuiz = {
        id: `quiz_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name,
        topic,
        questions,
        settings,
        difficultyLevel,
        createdAt: new Date().toISOString(),
        questionCount: questions.length
    };

    quizzes.unshift(newQuiz); // Thêm vào đầu danh sách
    localStorage.setItem(STORAGE_KEY, JSON.stringify(quizzes));

    return newQuiz;
};

// Lấy quiz theo ID
export const getQuizById = (id: string): SavedQuiz | null => {
    const quizzes = getQuizzes();
    return quizzes.find(q => q.id === id) || null;
};

// Xóa quiz
export const deleteQuiz = (id: string): boolean => {
    try {
        const quizzes = getQuizzes();
        const filtered = quizzes.filter(q => q.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
        return true;
    } catch (error) {
        console.error('Error deleting quiz:', error);
        return false;
    }
};

// Cập nhật quiz
export const updateQuiz = (id: string, updates: Partial<SavedQuiz>): boolean => {
    try {
        const quizzes = getQuizzes();
        const index = quizzes.findIndex(q => q.id === id);
        if (index === -1) return false;

        quizzes[index] = { ...quizzes[index], ...updates };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(quizzes));
        return true;
    } catch (error) {
        console.error('Error updating quiz:', error);
        return false;
    }
};

// Format ngày hiển thị
export const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};
