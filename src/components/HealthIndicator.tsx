import React from 'react';

interface HealthIndicatorProps {
  label: string;
  value: number;
  suffix?: string;
  thresholds: { warning: number; danger: number };
  higherIsBetter?: boolean;
}

export function HealthIndicator({
  label,
  value,
  suffix = '%',
  thresholds,
  higherIsBetter = true,
}: HealthIndicatorProps) {
  const getHealthColor = () => {
    if (higherIsBetter) {
      if (value >= thresholds.warning) return 'bg-emerald-500';
      if (value >= thresholds.danger) return 'bg-yellow-500';
      return 'bg-red-500';
    } else {
      if (value <= thresholds.warning) return 'bg-emerald-500';
      if (value <= thresholds.danger) return 'bg-yellow-500';
      return 'bg-red-500';
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-gray-600">{label}</h3>
        <div className={`h-2 w-2 rounded-full ${getHealthColor()}`} />
      </div>
      <p className="text-2xl font-bold">
        {value.toFixed(1)}
        {suffix}
      </p>
    </div>
  );
}