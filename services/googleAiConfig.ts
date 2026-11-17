export const GOOGLE_AI_API_KEY_PATTERN = /^(?:AIzaSy|AQ)\S{8,}$/;

export const GOOGLE_AI_API_KEY_HINT = 'AIzaSy... hoặc AQ...';

export const isValidGoogleAiApiKey = (key: string): boolean => {
    return GOOGLE_AI_API_KEY_PATTERN.test(key.trim());
};

export const DEFAULT_GEMINI_MODEL = 'gemini-3.8-flash';

export const GEMINI_FALLBACK_MODELS = [
    'gemini-3.8-flash',
    'gemini-3.7-flash',
    'gemini-3.5-flash-lite',
    'gemini-3.6-flash',
    'gemini-3.5-flash',
    'gemini-3.1-flash-lite',
    'gemini-2.5-flash'
] as const;

export const isSupportedGeminiModel = (model?: string): boolean => {
    return !!model && GEMINI_FALLBACK_MODELS.includes(model as typeof GEMINI_FALLBACK_MODELS[number]);
};

export const getOrderedGeminiModels = (selectedModel?: string): string[] => {
    const normalizedModel = selectedModel?.trim();
    const ordered = normalizedModel && GEMINI_FALLBACK_MODELS.includes(normalizedModel as typeof GEMINI_FALLBACK_MODELS[number])
        ? [normalizedModel, ...GEMINI_FALLBACK_MODELS.filter(model => model !== normalizedModel)]
        : [...GEMINI_FALLBACK_MODELS];

    return ordered.filter((model, index) => ordered.indexOf(model) === index);
};
