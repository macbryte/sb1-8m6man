import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import { AccountList } from './AccountList';
import { useFinancialData } from '../../hooks/useFinancialData';
import { Account } from '../../types';

export function AccountsPage() {
  const navigate = useNavigate();
  const { data, setData } = useFinancialData();

  const handleAddAccount = (account: Account) => {
    setData({
      ...data,
      accounts: [...data.accounts, account],
      lastModified: new Date().toISOString()
    });
  };

  const handleUpdateAccount = (updatedAccount: Account) => {
    const updatedAccounts = data.accounts.map(account =>
      account.id === updatedAccount.id ? updatedAccount : account
    );
    setData({
      ...data,
      accounts: updatedAccounts,
      lastModified: new Date().toISOString()
    });
  };

  const handleDeleteAccount = (id: string) => {
    const updatedAccounts = data.accounts.filter(account => account.id !== id);
    setData({
      ...data,
      accounts: updatedAccounts,
      lastModified: new Date().toISOString()
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Manage Accounts</h1>
          </div>
          <button
            onClick={() => document.getElementById('add-account-button')?.click()}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Account
          </button>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <AccountList
            accounts={data.accounts}
            onAddAccount={handleAddAccount}
            onUpdateAccount={handleUpdateAccount}
            onDeleteAccount={handleDeleteAccount}
          />
        </div>
      </div>
    </div>
  );
}