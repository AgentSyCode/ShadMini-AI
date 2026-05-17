export interface ModelInfo {
  id: string;
  name: string;
  description: string;
}

export const AVAILABLE_MODELS: ModelInfo[] = [
  { id: 'gpt-4o-mini', name: 'GPT-4o Mini', description: '⚡ عام | مساعد سريع' },
  { id: 'deepseek-r1', name: 'DeepSeek R1', description: '🧠 منطق | تحليل عميق' },
  { id: 'Llama-3.3-70B-Instruct', name: 'Llama 3.3 70B', description: '🦙 باك-إند | كود إبداعي' },
  { id: 'Mistral-Large-2411', name: 'Mistral Large', description: '🌪️ ديف أوبس | متقدم' },
  { id: 'Phi-4', name: 'Phi-4', description: '🔬 علوم | دقيق' },
  { id: 'Codestral-2501', name: 'Codestral 2501', description: '💻 فول-ستاك | تطوير' },
  { id: 'gemini-2.0-flash-001', name: 'Gemini 2.0 Flash', description: '🗣️ محادثة | سريع' },
  { id: 'o1-mini', name: 'O1 Mini', description: '🚀 منطقي | متقدم' },
  { id: 'cohere-command-r-plus', name: 'Command R+', description: '📚 كتابة | مبدع' },
];
