import React from 'react';
import { HealthIndicator } from '../HealthIndicator';
import { HealthIndicators } from '../../types';

interface HealthSectionProps {
  indicators: HealthIndicators;
}

export function HealthSection({ indicators }: HealthSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <HealthIndicator
        label="Savings Rate"
        value={indicators.savingsRate}
        thresholds={{ warning: 20, danger: 10 }}
      />
      <HealthIndicator
        label="Debt-to-Income Ratio"
        value={indicators.debtToIncomeRatio}
        thresholds={{ warning: 30, danger: 40 }}
        higherIsBetter={false}
      />
      <HealthIndicator
        label="Emergency Fund (months)"
        value={indicators.emergencyFundHealth}
        suffix="mo"
        thresholds={{ warning: 6, danger: 3 }}
      />
    </div>
  );
}