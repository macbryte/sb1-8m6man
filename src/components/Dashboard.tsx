import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { useFinancialData } from '../hooks/useFinancialData';
import { Header } from './dashboard/Header';
import { SummarySection } from './dashboard/SummarySection';
import { HealthSection } from './dashboard/HealthSection';
import { InputForm } from './dashboard/InputForm';
import { FinancialData } from '../types';

export function Dashboard() {
  const { data, setData, calculateIndicators, calculateNetWorth, loading } = useFinancialData();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await setData(data);
    } finally {
      setIsSaving(false);
    }
  };

  const updateData = (updates: Partial<FinancialData>) => {
    setData({ ...data, ...updates });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const indicators = calculateIndicators();
  const netWorth = calculateNetWorth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SummarySection data={data} netWorth={netWorth} />
        <HealthSection indicators={indicators} />
        <InputForm
          data={data}
          onUpdate={updateData}
          onSave={handleSave}
          isSaving={isSaving}
        />
      </main>
    </div>
  );
}