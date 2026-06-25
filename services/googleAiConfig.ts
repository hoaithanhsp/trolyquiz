export const GOOGLE_AI_API_KEY_PATTERN = /^(?:AIzaSy|AQ)\S{8,}$/;

export const GOOGLE_AI_API_KEY_HINT = 'AIzaSy... hoặc AQ...';

export const isValidGoogleAiApiKey = (key: string): boolean => {
    return GOOGLE_AI_API_KEY_PATTERN.test(key.trim());
};

export const DEFAULT_GEMINI_MODEL = 'gemini-3.5-flash';

export const GEMINI_FALLBACK_MODELS = [
    DEFAULT_GEMINI_MODEL,
    'gemini-2.5-flash',
    'gemini-2.5-flash-lite',
    'gemini-2.5-pro'
] as const;

export const isSupportedGeminiModel = (model?: string): boolean => {
    return !!model && GEMINI_FALLBACK_MODELS.includes(model as typeof GEMINI_FALLBACK_MODELS[number]);
};

export const getOrderedGeminiModels = (selectedModel?: string): string[] => {
    const normalizedModel = selectedModel?.trim();

    if (!normalizedModel) {
        return [...GEMINI_FALLBACK_MODELS];
    }

    return [
        normalizedModel,
        ...GEMINI_FALLBACK_MODELS.filter(model => model !== normalizedModel)
    ];
};
