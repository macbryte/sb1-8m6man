import React, { useState } from 'react';
import { RefreshCw, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFinancialData } from '../../hooks/useFinancialData';
import { Header } from './Header';
import { SummarySection } from './SummarySection';
import { HealthSection } from './HealthSection';
import { InputForm } from './InputForm';
import { TransactionList } from '../transactions/TransactionList';
import { FinancialData, Transaction } from '../../types';

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

  const handleUpdateTransaction = (updatedTransaction: Transaction) => {
    const updatedTransactions = data.transactions.map(t =>
      t.id === updatedTransaction.id ? updatedTransaction : t
    );
    updateData({ transactions: updatedTransactions });
  };

  const handleDeleteTransaction = (id: string) => {
    const updatedTransactions = data.transactions.filter(t => t.id !== id);
    updateData({ transactions: updatedTransactions });
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
        
        <div className="mt-8 mb-6 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Accounts Overview</h2>
          <Link
            to="/accounts"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Manage Accounts
          </Link>
        </div>

        <InputForm
          data={data}
          onUpdate={updateData}
          onSave={handleSave}
          isSaving={isSaving}
        />

        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Transactions</h2>
          <TransactionList
            transactions={data.transactions}
            onUpdateTransaction={handleUpdateTransaction}
            onDeleteTransaction={handleDeleteTransaction}
          />
        </div>
      </main>
    </div>
  );
}