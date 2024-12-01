import React from 'react';
import { SummaryCard } from '../SummaryCard';
import { FinancialData } from '../../types';

interface SummarySectionProps {
  data: FinancialData;
  netWorth: number;
}

export function SummarySection({ data, netWorth }: SummarySectionProps) {
  const monthlyCashFlow = data.monthlyFinances.income - data.monthlyFinances.expenses;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <SummaryCard
        title="Net Worth"
        amount={netWorth}
        type={netWorth >= 0 ? 'positive' : 'negative'}
      />
      <SummaryCard
        title="Monthly Cash Flow"
        amount={monthlyCashFlow}
        type={monthlyCashFlow >= 0 ? 'positive' : 'negative'}
      />
      <SummaryCard
        title="Emergency Fund"
        amount={data.emergencyFund}
        type="neutral"
      />
    </div>
  );
}