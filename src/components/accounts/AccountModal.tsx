import React, { useState, useMemo } from 'react';
import { X } from 'lucide-react';
import { Account, AccountType } from '../../types';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  account: Account | null;
  onSave: (account: Account) => void;
}

interface AccountTypeOption {
  category: 'Asset' | 'Liability';
  types: AccountType[];
}

const ACCOUNT_TYPE_OPTIONS: AccountTypeOption[] = [
  {
    category: 'Asset',
    types: ['Chequing', 'Savings', 'TFSA', 'RRSP', 'Investment', 'Real Estate', 'Vehicle', 'Cash', 'Other']
  },
  {
    category: 'Liability',
    types: ['Credit Card', 'Line of Credit', 'Mortgage', 'Car Loan', 'Student Loan', 'Personal Loan', 'HELOC', 'Other']
  }
];

export function AccountModal({
  isOpen,
  onClose,
  account,
  onSave
}: AccountModalProps) {
  const [formData, setFormData] = useState<Account>(
    account || {
      id: crypto.randomUUID(),
      name: '',
      type: 'Chequing',
      category: 'Asset',
      balance: 0,
      lastModified: new Date().toISOString(),
      description: '',
      institution: '',
      accountNumber: '',
      interestRate: 0
    }
  );

  const availableTypes = useMemo(() => {
    return ACCOUNT_TYPE_OPTIONS.find(opt => opt.category === formData.category)?.types || [];
  }, [formData.category]);

  if (!isOpen) return null;

  const handleCategoryChange = (category: 'Asset' | 'Liability') => {
    const defaultType = ACCOUNT_TYPE_OPTIONS.find(opt => opt.category === category)?.types[0] || 'Other';
    setFormData({
      ...formData,
      category,
      type: defaultType
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      lastModified: new Date().toISOString()
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">
            {account ? 'Edit Account' : 'New Account'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Account Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Financial Institution</label>
            <input
              type="text"
              value={formData.institution || ''}
              onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="e.g., TD Bank, RBC, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Account Number (Last 4 digits)</label>
            <input
              type="text"
              value={formData.accountNumber || ''}
              onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="e.g., 1234"
              maxLength={4}
              pattern="[0-9]*"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Account Category</label>
            <select
              value={formData.category}
              onChange={(e) => handleCategoryChange(e.target.value as 'Asset' | 'Liability')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              {ACCOUNT_TYPE_OPTIONS.map((option) => (
                <option key={option.category} value={option.category}>
                  {option.category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Account Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as AccountType })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              {availableTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Balance</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                step="0.01"
                value={formData.balance}
                onChange={(e) => setFormData({ ...formData, balance: Number(e.target.value) })}
                className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>
            {formData.category === 'Liability' && (
              <p className="mt-1 text-sm text-gray-500">
                Enter the amount you owe as a positive number
              </p>
            )}
          </div>

          {(formData.category === 'Liability' || formData.type === 'Investment') && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {formData.category === 'Liability' ? 'Interest Rate (%)' : 'Expected Return Rate (%)'}
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.interestRate || 0}
                onChange={(e) => setFormData({ ...formData, interestRate: Number(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                min="0"
                max="100"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Description (Optional)</label>
            <textarea
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              rows={3}
              placeholder="Add any additional notes about this account"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}