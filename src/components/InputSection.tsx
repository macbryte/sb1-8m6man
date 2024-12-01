import React from 'react';
import { DollarSign } from 'lucide-react';

interface InputSectionProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

export function InputSection({ label, value, onChange }: InputSectionProps) {
  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <DollarSign className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="number"
          value={value || ''}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="0.00"
          min="0"
          step="0.01"
        />
      </div>
    </div>
  );
}