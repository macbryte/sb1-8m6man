import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  amount: number;
  type: 'positive' | 'negative' | 'neutral';
}

export function SummaryCard({ title, amount, type }: SummaryCardProps) {
  const getColorClass = () => {
    switch (type) {
      case 'positive':
        return 'bg-emerald-50 text-emerald-700';
      case 'negative':
        return 'bg-red-50 text-red-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  const Icon = type === 'positive' ? TrendingUp : TrendingDown;

  return (
    <div className={`rounded-lg p-6 ${getColorClass()}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-75">{title}</p>
          <p className="mt-1 text-2xl font-semibold">
            ${Math.abs(Math.round(amount)).toLocaleString('en-US')}
          </p>
        </div>
        {type !== 'neutral' && (
          <Icon className="h-8 w-8 opacity-75" />
        )}
      </div>
    </div>
  );
}