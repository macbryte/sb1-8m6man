import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Transaction, TransactionCategory } from '../../types';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction;
  onSave: (transaction: Transaction) => void;
}

const CATEGORIES: TransactionCategory[] = [
  'Income',
  'Bills',
  'Shopping',
  'Transportation',
  'Food',
  'Healthcare',
  'Entertainment',
  'Investment',
  'Other'
];

export function TransactionModal({
  isOpen,
  onClose,
  transaction,
  onSave
}: TransactionModalProps) {
  const [editedTransaction, setEditedTransaction] = useState<Transaction>(transaction);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...editedTransaction,
      lastModified: new Date().toISOString()
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Edit Transaction</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Account Holder</label>
            <input
              type="text"
              value={editedTransaction.accountHolder}
              onChange={(e) =>
                setEditedTransaction({
                  ...editedTransaction,
                  accountHolder: e.target.value
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              value={editedTransaction.date.split('T')[0]}
              onChange={(e) =>
                setEditedTransaction({
                  ...editedTransaction,
                  date: new Date(e.target.value).toISOString()
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              step="0.01"
              value={editedTransaction.amount}
              onChange={(e) =>
                setEditedTransaction({
                  ...editedTransaction,
                  amount: Number(e.target.value)
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={editedTransaction.category}
              onChange={(e) =>
                setEditedTransaction({
                  ...editedTransaction,
                  category: e.target.value as TransactionCategory
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            >
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={editedTransaction.description || ''}
              onChange={(e) =>
                setEditedTransaction({
                  ...editedTransaction,
                  description: e.target.value
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}