import React from 'react';
import { LifeBuoy, Mail, MapPin, School, Phone, BookOpen, HelpCircle, ExternalLink } from 'lucide-react';

const SupportPage: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto px-6 py-8">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-4xl font-black text-slate-900 mb-2">Hỗ Trợ</h2>
                <p className="text-lg text-slate-500">Thông tin liên hệ và hướng dẫn sử dụng</p>
            </div>

            {/* Author Info Card */}
            <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl p-8 text-white mb-6 shadow-xl">
                <div className="flex items-start gap-6">
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                        <School className="w-12 h-12" />
                    </div>
                    <div className="flex-1">
                        <div className="text-sm font-medium text-teal-100 mb-1">TÁC GIẢ ỨNG DỤNG</div>
                        <h3 className="text-3xl font-black mb-4">Thầy Trần Hoài Thanh</h3>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                                <School className="w-5 h-5 flex-shrink-0" />
                                <div>
                                    <div className="text-sm text-teal-100">Trường</div>
                                    <div className="font-bold">THPT Khúc Thừa Dụ</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                                <MapPin className="w-5 h-5 flex-shrink-0" />
                                <div>
                                    <div className="text-sm text-teal-100">Địa chỉ</div>
                                    <div className="font-bold">Vĩnh Lại - TP Hải Phòng</div>
                                </div>
                            </div>

                            <a
                                href="https://zalo.me/0348296773"
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-3 bg-white text-primary hover:bg-teal-50 rounded-lg p-3 transition-all group"
                            >
                                <Phone className="w-5 h-5 flex-shrink-0 group-hover:rotate-12 transition-transform" />
                                <div>
                                    <div className="text-sm text-slate-500">Liên hệ Zalo</div>
                                    <div className="font-bold text-lg">0348296773</div>
                                </div>
                                <ExternalLink className="w-4 h-4 ml-auto opacity-50" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Guide */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4 border-b border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                            <BookOpen className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">Hướng Dẫn Sử Dụng</h3>
                            <p className="text-sm text-slate-600">Các bước để tạo bài kiểm tra</p>
                        </div>
                    </div>
                </div>
                <div className="p-6">
                    <ol className="space-y-4">
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                                1
                            </div>
                            <div>
                                <div className="font-bold text-slate-900 mb-1">Cấu hình API Key</div>
                                <div className="text-sm text-slate-600">
                                    Vào mục <strong>Cài đặt</strong> và nhập Google Gemini API key của bạn.
                                    <a href="https://aistudio.google.com/apikey" target="_blank" rel="noreferrer" className="text-primary hover:underline ml-1">
                                        Lấy API key tại đây →
                                    </a>
                                </div>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                                2
                            </div>
                            <div>
                                <div className="font-bold text-slate-900 mb-1">Nhập thông tin bài kiểm tra</div>
                                <div className="text-sm text-slate-600">
                                    Nhập chủ đề hoặc tải lên tài liệu (PDF, TXT, ảnh). Chọn số lượng câu hỏi và mức độ.
                                </div>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                                3
                            </div>
                            <div>
                                <div className="font-bold text-slate-900 mb-1">Tạo và xuất file</div>
                                <div className="text-sm text-slate-600">
                                    Nhấn <strong>"Tạo Câu Hỏi AI"</strong>, sau đó lưu vào thư viện hoặc tải file HTML về máy.
                                </div>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                                4
                            </div>
                            <div>
                                <div className="font-bold text-slate-900 mb-1">Quản lý và theo dõi</div>
                                <div className="text-sm text-slate-600">
                                    Xem lại các bài đã lưu trong <strong>Thư viện</strong>, theo dõi thống kê trong <strong>Báo cáo</strong>.
                                </div>
                            </div>
                        </li>
                    </ol>
                </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="bg-purple-100 p-2 rounded-lg">
                            <HelpCircle className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">Câu Hỏi Thường Gặp</h3>
                            <p className="text-sm text-slate-600">Giải đáp thắc mắc phổ biến</p>
                        </div>
                    </div>
                </div>
                <div className="p-6 space-y-4">
                    <details className="bg-slate-50 rounded-lg p-4 group">
                        <summary className="font-bold text-slate-900 cursor-pointer list-none flex items-center justify-between">
                            <span>API key có miễn phí không?</span>
                            <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="text-sm text-slate-600 mt-3 pl-4 border-l-2 border-primary">
                            Google Gemini cung cấp gói miễn phí với hạn mức sử dụng hợp lý.
                            Bạn có thể tạo hàng trăm bài kiểm tra mà không tốn phí.
                        </p>
                    </details>

                    <details className="bg-slate-50 rounded-lg p-4 group">
                        <summary className="font-bold text-slate-900 cursor-pointer list-none flex items-center justify-between">
                            <span>Làm sao để xuất file HTML?</span>
                            <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="text-sm text-slate-600 mt-3 pl-4 border-l-2 border-primary">
                            Sau khi tạo câu hỏi thành công, nhấn nút <strong>"Tải Ứng Dụng"</strong>.
                            File HTML có thể chạy offline và chia sẻ cho học sinh.
                        </p>
                    </details>

                    <details className="bg-slate-50 rounded-lg p-4 group">
                        <summary className="font-bold text-slate-900 cursor-pointer list-none flex items-center justify-between">
                            <span>Dữ liệu có được lưu trên cloud không?</span>
                            <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="text-sm text-slate-600 mt-3 pl-4 border-l-2 border-primary">
                            Không. Tất cả dữ liệu được lưu trong <strong>localStorage</strong> của trình duyệt.
                            Dữ liệu của bạn hoàn toàn riêng tư và chỉ tồn tại trên máy tính của bạn.
                        </p>
                    </details>

                    <details className="bg-slate-50 rounded-lg p-4 group">
                        <summary className="font-bold text-slate-900 cursor-pointer list-none flex items-center justify-between">
                            <span>Có thể tạo bao nhiêu câu hỏi 1 lúc?</span>
                            <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="text-sm text-slate-600 mt-3 pl-4 border-l-2 border-primary">
                            Bạn có thể tạo từ 1-20 câu hỏi mỗi lần. Khuyến nghị tạo 10-15 câu để đảm bảo chất lượng tốt nhất.
                        </p>
                    </details>
                </div>
            </div>

            {/* Contact Footer */}
            <div className="mt-8 text-center">
                <p className="text-sm text-slate-500">
                    Có vấn đề khác? Liên hệ qua Zalo: <strong className="text-primary">0348296773</strong>
                </p>
            </div>
        </div>
    );
};

export default SupportPage;
