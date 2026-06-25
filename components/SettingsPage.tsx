import React, { useState } from 'react';
import { Key, Cpu, Clock, Volume2, Award, Save, ExternalLink } from 'lucide-react';
import { AppSettings, DifficultyLevel, DIFFICULTY_LABELS } from '../types';
import { DEFAULT_GEMINI_MODEL, GOOGLE_AI_API_KEY_HINT } from '../services/googleAiConfig';

interface SettingsPageProps {
    settings: AppSettings;
    apiKey: string;
    onSaveSettings: (settings: AppSettings) => void;
    onSaveApiKey: (key: string) => boolean;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ settings, apiKey, onSaveSettings, onSaveApiKey }) => {
    const [localSettings, setLocalSettings] = useState<AppSettings>(settings);
    const [localApiKey, setLocalApiKey] = useState(apiKey);
    const [showApiKey, setShowApiKey] = useState(false);

    const handleSave = () => {
        if (!onSaveApiKey(localApiKey)) {
            return;
        }

        onSaveSettings(localSettings);
        alert('Đã lưu cài đặt thành công!');
    };

    const availableModels = [
        { id: DEFAULT_GEMINI_MODEL, name: 'Gemini 3.5 Flash', desc: 'Model ổn định mới - Thông minh, nhanh', isDefault: true },
        { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', desc: 'Dự phòng ổn định - Giá/hiệu năng tốt', isDefault: false },
        { id: 'gemini-2.5-flash-lite', name: 'Gemini 2.5 Flash-Lite', desc: 'Dự phòng nhẹ - Nhanh, tiết kiệm quota', isDefault: false },
        { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', desc: 'Dự phòng chất lượng cao cho nội dung khó', isDefault: false }
    ];

    return (
        <div className="max-w-4xl mx-auto px-6 py-8">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-4xl font-black text-slate-900 mb-2">Cài Đặt</h2>
                <p className="text-lg text-slate-500">Tùy chỉnh ứng dụng theo ý bạn</p>
            </div>

            <div className="space-y-6">
                {/* API Key Section */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4 border-b border-slate-200">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-100 p-2 rounded-lg">
                                <Key className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Google Gemini API Key</h3>
                                <p className="text-sm text-slate-600">Quản lý khóa API để sử dụng AI</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">API Key</label>
                            <div className="relative">
                                <input
                                    type={showApiKey ? 'text' : 'password'}
                                    value={localApiKey}
                                    onChange={(e) => setLocalApiKey(e.target.value)}
                                    placeholder={GOOGLE_AI_API_KEY_HINT}
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 outline-none transition-all font-mono text-sm"
                                />
                                <button
                                    onClick={() => setShowApiKey(!showApiKey)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-sm font-bold"
                                >
                                    {showApiKey ? 'Ẩn' : 'Hiện'}
                                </button>
                            </div>
                        </div>
                        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl space-y-3">
                            <p className="text-sm font-bold text-amber-900">📖 Hướng dẫn lấy API Key:</p>
                            <div className="space-y-2">
                                <a
                                    href="https://aistudio.google.com/apikey"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-semibold bg-blue-50 px-3 py-2 rounded-lg"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    Bước 1: Lấy API key tại Google AI Studio
                                </a>
                                <a
                                    href="https://tinyurl.com/hdsdpmTHT"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 text-sm font-semibold bg-green-50 px-3 py-2 rounded-lg"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    📺 Xem video hướng dẫn chi tiết
                                </a>
                            </div>
                            <p className="text-xs text-amber-700">⚠️ Hỗ trợ Google AI key bắt đầu bằng AIzaSy hoặc AQ. Khi model tạm quá tải, app sẽ thử model dự phòng.</p>
                        </div>
                    </div>
                </div>

                {/* AI Model Section */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-slate-200">
                        <div className="flex items-center gap-3">
                            <div className="bg-purple-100 p-2 rounded-lg">
                                <Cpu className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">AI Model</h3>
                                <p className="text-sm text-slate-600">Chọn mô hình AI mặc định</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="space-y-3">
                            {availableModels.map((model) => (
                                <label
                                    key={model.id}
                                    className={`flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all relative ${localSettings.defaultModel === model.id
                                        ? 'border-purple-500 bg-purple-50'
                                        : 'border-slate-200 hover:border-purple-200 bg-white'
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="model"
                                        value={model.id}
                                        checked={localSettings.defaultModel === model.id}
                                        onChange={(e) => setLocalSettings({ ...localSettings, defaultModel: e.target.value })}
                                        className="mt-1 accent-purple-600"
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-slate-900">{model.name}</span>
                                            {model.isDefault && (
                                                <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">DEFAULT</span>
                                            )}
                                        </div>
                                        <div className="text-sm text-slate-500">{model.desc}</div>
                                    </div>
                                </label>
                            ))}
                            <div className="bg-slate-50 p-3 rounded-lg mt-2">
                                <p className="text-xs text-slate-600">
                                    💡 <strong>Cơ chế Fallback:</strong> Model đã chọn sẽ được thử trước. Nếu gặp 503/UNAVAILABLE hoặc quá tải tạm thời, hệ thống sẽ tự động chuyển sang model dự phòng theo thứ tự trên.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Default Settings Section */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="bg-gradient-to-r from-green-50 to-teal-50 px-6 py-4 border-b border-slate-200">
                        <div className="flex items-center gap-3">
                            <div className="bg-green-100 p-2 rounded-lg">
                                <Award className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Cài Đặt Mặc Định</h3>
                                <p className="text-sm text-slate-600">Áp dụng cho bài kiểm tra mới</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 space-y-4">
                        {/* Default Difficulty */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Mức độ mặc định</label>
                            <select
                                value={localSettings.defaultDifficulty}
                                onChange={(e) => setLocalSettings({ ...localSettings, defaultDifficulty: e.target.value as DifficultyLevel })}
                                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-green-500 outline-none transition-all"
                            >
                                <option value="nhan_biet">📘 {DIFFICULTY_LABELS.nhan_biet}</option>
                                <option value="thong_hieu">📗 {DIFFICULTY_LABELS.thong_hieu}</option>
                                <option value="van_dung">📙 {DIFFICULTY_LABELS.van_dung}</option>
                                <option value="van_dung_cao">📕 {DIFFICULTY_LABELS.van_dung_cao}</option>
                                <option value="hon_hop">🌈 {DIFFICULTY_LABELS.hon_hop}</option>
                            </select>
                        </div>

                        {/* Default Timer */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                Thời gian mặc định (phút)
                            </label>
                            <input
                                type="number"
                                min="0"
                                max="60"
                                value={localSettings.defaultTimer}
                                onChange={(e) => setLocalSettings({ ...localSettings, defaultTimer: parseInt(e.target.value) || 0 })}
                                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-green-500 outline-none transition-all"
                                placeholder="0 = Không giới hạn"
                            />
                            <p className="text-xs text-slate-500 mt-1">0 = Không giới hạn thời gian</p>
                        </div>

                        {/* Default Sound */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                                <Volume2 className="w-4 h-4" />
                                Âm thanh mặc định
                            </label>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setLocalSettings({ ...localSettings, defaultSound: true })}
                                    className={`flex-1 py-3 rounded-xl font-bold transition-all ${localSettings.defaultSound
                                        ? 'bg-teal-100 text-teal-700 border-2 border-teal-300'
                                        : 'bg-slate-100 text-slate-500 border-2 border-slate-300'
                                        }`}
                                >
                                    🔊 Bật
                                </button>
                                <button
                                    onClick={() => setLocalSettings({ ...localSettings, defaultSound: false })}
                                    className={`flex-1 py-3 rounded-xl font-bold transition-all ${!localSettings.defaultSound
                                        ? 'bg-slate-200 text-slate-700 border-2 border-slate-400'
                                        : 'bg-slate-100 text-slate-500 border-2 border-slate-300'
                                        }`}
                                >
                                    🔇 Tắt
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <button
                    onClick={handleSave}
                    className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg shadow-lg shadow-teal-600/20 hover:bg-primary-dark hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                    <Save className="w-5 h-5" />
                    Lưu Tất Cả Cài Đặt
                </button>
            </div>
        </div>
    );
};

export default SettingsPage;
