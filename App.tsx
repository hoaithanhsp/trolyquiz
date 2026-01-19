import React, { useState, useRef } from 'react';
import { 
    LayoutDashboard, 
    PlusCircle, 
    Library, 
    BarChart3, 
    Settings, 
    LifeBuoy, 
    Upload, 
    FileText, 
    Sparkles, 
    Loader2, 
    Download, 
    Trash2,
    Search,
    PenSquare,
    ChevronRight,
    ChevronLeft,
    Share2,
    WifiOff
} from 'lucide-react';
import { generateQuizData } from './services/geminiService';
import { QuizQuestion, GenerationStatus } from './types';
import { HTML_TEMPLATE, EXPORT_FILENAME } from './constants';
import QuizPreview from './components/QuizPreview';

const App: React.FC = () => {
  // State
  const [topic, setTopic] = useState('');
  const [questionCount, setQuestionCount] = useState(10);
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<GenerationStatus>('idle');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (idx: number) => {
    setFiles(prev => prev.filter((_, i) => i !== idx));
  };

  const handleGenerate = async () => {
    if (!topic && files.length === 0) {
      setErrorMsg("Vui lòng nhập chủ đề hoặc tải lên tài liệu.");
      return;
    }
    
    setErrorMsg('');
    setStatus('generating');
    setQuestions([]);

    try {
      const data = await generateQuizData(topic, files, questionCount);
      setQuestions(data);
      setStatus('success');
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Không thể tạo câu hỏi. Vui lòng thử lại.");
      setStatus('error');
    }
  };

  const handleDownload = () => {
    const jsonString = JSON.stringify(questions);
    const finalHtml = HTML_TEMPLATE.replace('// {{DATA_PLACEHOLDER}}', jsonString);
    const blob = new Blob([finalHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = EXPORT_FILENAME;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background-light font-display text-slate-800">
        
        {/* Sidebar */}
        <aside className="w-64 flex flex-col border-r border-slate-200 bg-white hidden md:flex">
            <div className="p-6">
                <div className="flex items-center gap-3 mb-8">
                    <div className="bg-primary rounded-lg p-2 text-white shadow-lg shadow-teal-600/20">
                        <span className="material-symbols-outlined text-2xl">school</span>
                    </div>
                    <div>
                        <h1 className="text-lg font-bold leading-tight text-slate-900">QuizGen AI</h1>
                        <p className="text-xs text-slate-500 font-medium">Dành Cho Giáo Viên</p>
                    </div>
                </div>
                <nav className="flex flex-col gap-2">
                    <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary border-l-4 border-primary font-semibold transition-all">
                        <PlusCircle size={20} />
                        <span>Tạo Bài Mới</span>
                    </a>
                    <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-primary transition-colors">
                        <Library size={20} />
                        <span>Thư Viện</span>
                    </a>
                    <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-primary transition-colors">
                        <BarChart3 size={20} />
                        <span>Báo Cáo</span>
                    </a>
                    <div className="my-4 border-t border-slate-100"></div>
                    <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-primary transition-colors">
                        <Settings size={20} />
                        <span>Cài Đặt</span>
                    </a>
                    <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-primary transition-colors">
                        <LifeBuoy size={20} />
                        <span>Hỗ Trợ</span>
                    </a>
                </nav>
            </div>
            <div className="mt-auto p-6">
                <div className="bg-teal-50 p-4 rounded-xl border border-teal-100">
                    <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Gói Pro</p>
                    <p className="text-xs text-slate-500 mb-3">Không giới hạn tạo câu hỏi AI</p>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-primary h-full w-[85%] rounded-full"></div>
                    </div>
                </div>
            </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50/50">
            <div className="max-w-6xl mx-auto px-6 py-8 md:px-10 md:py-10">
                
                {/* Header */}
                <div className="flex justify-between items-end mb-10">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl font-black tracking-tight text-slate-900 mb-2">Xin chào, Thầy/Cô</h2>
                        <p className="text-lg text-slate-500 leading-relaxed font-sans">
                            Chuyển đổi tài liệu bài giảng thành trò chơi trắc nghiệm HTML tương tác ngay lập tức.
                        </p>
                    </div>
                    <div className="hidden md:block">
                        <div className="flex items-center gap-3 bg-white py-2 px-3 rounded-full border border-slate-200 shadow-sm">
                             <div className="size-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">P</div>
                             <div className="text-sm font-bold text-slate-700 pr-2">GV. Minh Anh</div>
                        </div>
                    </div>
                </div>

                {/* Generator Section (Split View) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
                    
                    {/* LEFT: Input Configuration */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-cyan-400 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative flex flex-col p-8 bg-white border border-slate-200 rounded-2xl shadow-sm">
                                
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="size-12 bg-teal-50 rounded-full flex items-center justify-center">
                                        <Sparkles className="text-primary w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900">Tạo Bài Kiểm Tra Mới</h3>
                                        <p className="text-sm text-slate-500">Trích xuất nội dung bằng AI</p>
                                    </div>
                                </div>

                                <div className="space-y-5">
                                    {/* Topic Input */}
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Chủ đề / Môn học</label>
                                        <input 
                                            type="text" 
                                            value={topic}
                                            onChange={(e) => setTopic(e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-sans"
                                            placeholder="Ví dụ: Quang hợp, Chiến tranh thế giới thứ 2..." 
                                        />
                                    </div>

                                    {/* Question Count */}
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Số lượng câu</label>
                                            <span className="text-xs font-bold text-primary bg-teal-50 px-2 py-0.5 rounded">{questionCount} Câu hỏi</span>
                                        </div>
                                        <input 
                                            type="range" 
                                            min="1" max="20" 
                                            value={questionCount}
                                            onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary" 
                                        />
                                    </div>

                                    {/* File Upload Area */}
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tài liệu nguồn</label>
                                        
                                        {files.length > 0 && (
                                            <div className="space-y-2 mb-3">
                                                {files.map((f, i) => (
                                                    <div key={i} className="flex items-center justify-between bg-teal-50 border border-teal-100 p-2.5 rounded-lg text-sm text-teal-900">
                                                        <div className="flex items-center gap-2 truncate">
                                                            <FileText className="w-4 h-4 text-primary" />
                                                            <span className="truncate max-w-[150px]">{f.name}</span>
                                                        </div>
                                                        <button onClick={() => removeFile(i)} className="text-teal-400 hover:text-red-500 transition-colors">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <div 
                                            onClick={() => fileInputRef.current?.click()}
                                            className="border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary hover:bg-teal-50/50 transition-all group/upload"
                                        >
                                            <input type="file" multiple ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*,.pdf,.txt,.md" />
                                            <div className="bg-slate-100 p-3 rounded-full mb-3 group-hover/upload:scale-110 transition-transform">
                                                <Upload className="w-6 h-6 text-slate-400 group-hover/upload:text-primary" />
                                            </div>
                                            <p className="text-sm font-bold text-slate-600 mb-1">Nhấn để tải tài liệu lên</p>
                                            <p className="text-xs text-slate-400">PDF, TXT, Ảnh (Tối đa 10MB)</p>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <button 
                                        onClick={handleGenerate}
                                        disabled={status === 'generating'}
                                        className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg shadow-lg shadow-teal-600/20 hover:bg-primary-dark hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {status === 'generating' ? (
                                            <>
                                                <Loader2 className="animate-spin w-5 h-5" />
                                                Đang xử lý...
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles className="w-5 h-5" />
                                                Tạo Câu Hỏi AI
                                            </>
                                        )}
                                    </button>
                                    
                                    {errorMsg && (
                                        <p className="text-xs text-red-500 bg-red-50 p-2 rounded border border-red-100 text-center font-bold">
                                            {errorMsg}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                         {/* Download Action (Visible only on success) */}
                         {status === 'success' && questions.length > 0 && (
                             <div className="bg-green-50 border border-green-200 p-4 rounded-xl flex items-center justify-between animate-in fade-in slide-in-from-top-4">
                                <div className="flex items-center gap-3">
                                    <div className="bg-green-100 p-2 rounded-lg text-green-700">
                                        <span className="material-symbols-outlined">check_circle</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-green-900 text-sm">Sẵn sàng xuất file</h4>
                                        <p className="text-xs text-green-700">File HTML đã sẵn sàng để dùng offline.</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={handleDownload}
                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm flex items-center gap-2 transition-all"
                                >
                                    <Download className="w-4 h-4" />
                                    Tải Ứng Dụng
                                </button>
                             </div>
                         )}
                    </div>

                    {/* RIGHT: Content Area / Preview */}
                    <div className="lg:col-span-7 h-full flex flex-col">
                        {status === 'success' && questions.length > 0 ? (
                            <div className="h-full min-h-[600px] animate-in slide-in-from-right-8 duration-500">
                                <QuizPreview questions={questions} />
                            </div>
                        ) : (
                            // Empty State / Recent Quizzes Placeholder
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-bold text-slate-900">Bài Kiểm Tra Gần Đây</h3>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                        <input type="text" placeholder="Tìm kiếm..." className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:border-primary w-48 transition-all" />
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-slate-50 border-b border-slate-200">
                                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Tên Bài</th>
                                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Trạng Thái</th>
                                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Thao Tác</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {[
                                                { title: "Sinh học: Hô hấp tế bào", date: "15 Câu • 10.4 MB", status: "Đã tạo" },
                                                { title: "Đại số: Phương trình bậc 2", date: "20 Câu • 4.5 MB", status: "Đã tạo" },
                                                { title: "Lịch sử: Thế chiến II", date: "Đang soạn...", status: "Nháp" }
                                            ].map((item, idx) => (
                                                <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`size-10 rounded flex items-center justify-center ${item.status === 'Nháp' ? 'bg-amber-50 text-amber-600' : 'bg-teal-50 text-primary'}`}>
                                                                <span className="material-symbols-outlined">{item.status === 'Nháp' ? 'history_edu' : 'description'}</span>
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-slate-800 text-sm">{item.title}</p>
                                                                <p className="text-xs text-slate-400">{item.date}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-[10px] font-bold uppercase ${item.status === 'Nháp' ? 'bg-slate-100 text-slate-500' : 'bg-teal-50 text-teal-700'}`}>
                                                            <span className={`size-1.5 rounded-full ${item.status === 'Nháp' ? 'bg-slate-400' : 'bg-teal-500'}`}></span>
                                                            {item.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button className="p-1.5 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600"><PenSquare className="w-4 h-4" /></button>
                                                            <button className="p-1.5 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600"><Download className="w-4 h-4" /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                                        <span className="text-xs text-slate-400 font-medium">Hiển thị 3 trên 12</span>
                                        <div className="flex gap-1">
                                            <button className="p-1 rounded hover:bg-white text-slate-400"><ChevronLeft className="w-4 h-4" /></button>
                                            <button className="p-1 rounded hover:bg-white text-slate-400"><ChevronRight className="w-4 h-4" /></button>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-teal-200 transition-all cursor-default">
                                        <div className="flex items-center gap-2 mb-2 text-primary">
                                            <Share2 className="w-5 h-5" />
                                            <h4 className="font-bold text-sm">Chia sẻ 1 chạm</h4>
                                        </div>
                                        <p className="text-xs text-slate-500">Gửi link cho học sinh hoặc nhúng vào Canvas/Moodle.</p>
                                    </div>
                                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-teal-200 transition-all cursor-default">
                                        <div className="flex items-center gap-2 mb-2 text-primary">
                                            <Sparkles className="w-5 h-5" />
                                            <h4 className="font-bold text-sm">Chấm điểm AI</h4>
                                        </div>
                                        <p className="text-xs text-slate-500">Tự động chấm điểm câu trả lời ngắn theo ngữ cảnh.</p>
                                    </div>
                                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-teal-200 transition-all cursor-default">
                                        <div className="flex items-center gap-2 mb-2 text-primary">
                                            <WifiOff className="w-5 h-5" />
                                            <h4 className="font-bold text-sm">Chế độ Offline</h4>
                                        </div>
                                        <p className="text-xs text-slate-500">Xuất file HTML hoạt động ngay cả khi không có mạng.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </main>
    </div>
  );
};

export default App;