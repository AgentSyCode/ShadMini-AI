'use client';
import { AVAILABLE_MODELS } from '@/lib/constants';

interface ModelSelectorProps {
  selectedModel: string;
  onSelect: (model: string) => void;
}

export default function ModelSelector({ selectedModel, onSelect }: ModelSelectorProps) {
  return (
    <select
      value={selectedModel}
      onChange={e => onSelect(e.target.value)}
      className="w-full md:w-auto p-2 bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:border-blue-500"
    >
      {AVAILABLE_MODELS.map(model => (
        <option key={model.id} value={model.id}>
          {model.description}
        </option>
      ))}
    </select>
  );
}
