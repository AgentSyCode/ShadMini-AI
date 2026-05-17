'use client';

interface WelcomeScreenProps {
  onQuickPrompt: (prompt: string) => void;
}

export default function WelcomeScreen({ onQuickPrompt }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <div className="text-6xl mb-4">🤖</div>
      <h2 className="text-2xl font-bold mb-2">مرحباً بك في ShadMini AI</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        ابدأ محادثة جديدة باختيار نموذج من الأعلى
      </p>
      <div className="grid grid-cols-2 gap-3 max-w-md">
        <button
          onClick={() => onQuickPrompt('اشرح لي الذكاء الاصطناعي')}
          className="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-sm"
        >
          💡 اشرح لي الذكاء الاصطناعي
        </button>
        <button
          onClick={() => onQuickPrompt('كيف أتعلم البرمجة؟')}
          className="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-sm"
        >
          🧠 كيف أتعلم البرمجة؟
        </button>
        <button
          onClick={() => onQuickPrompt('اكتب مقالاً عن المستقبل')}
          className="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-sm"
        >
          ✍️ اكتب مقالاً عن المستقبل
        </button>
        <button
          onClick={() => onQuickPrompt('صمم شعاراً لفكرتي')}
          className="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-sm"
        >
          🎨 صمم شعاراً لفكرتي
        </button>
      </div>
    </div>
  );
}
