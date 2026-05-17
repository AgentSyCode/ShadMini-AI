'use client';
import Image from 'next/image';

interface WelcomeScreenProps {
  onQuickPrompt: (prompt: string) => void;
}

const suggestions = [
  { icon: '💡', text: 'اشرح لي الذكاء الاصطناعي', color: 'from-amber-500 to-orange-500' },
  { icon: '🧠', text: 'كيف أتعلم البرمجة؟', color: 'from-blue-500 to-cyan-500' },
  { icon: '✍️', text: 'اكتب مقالاً عن المستقبل', color: 'from-purple-500 to-pink-500' },
  { icon: '🎨', text: 'صمم شعاراً لفكرتي', color: 'from-green-500 to-emerald-500' },
];

export default function WelcomeScreen({ onQuickPrompt }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-12 animate-fade-in">
      {/* شعار مخصص */}
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/30">
          <Image src="/icon-192.png" alt="ShadMini AI Logo" width={96} height={96} className="object-cover" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-green-400 border-4 border-white dark:border-gray-900 shadow-lg"></div>
      </div>

      <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 mb-2">
        مرحباً بك في ShadMini AI
      </h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-10 max-w-md text-center leading-relaxed">
        مساعدك الذكي المدعوم بأحدث نماذج الذكاء الاصطناعي.
        اختر نموذجاً وابدأ المحادثة.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
        {suggestions.map((s, i) => (
          <button
            key={i}
            onClick={() => onQuickPrompt(s.text)}
            className="group relative overflow-hidden p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/60 dark:border-gray-700/60 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 text-right"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">{s.icon}</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200 leading-relaxed group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {s.text}
              </span>
            </div>
            <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${s.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right`}></div>
          </button>
        ))}
      </div>
    </div>
  );
}
