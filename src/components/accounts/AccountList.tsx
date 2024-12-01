import React, { useState } from 'react';
import { Edit2, Trash2, Plus, CreditCard, Wallet, Home, Car, GraduationCap, PiggyBank, Building, DollarSign } from 'lucide-react';
import { Account, AccountType } from '../../types';
import { AccountModal } from './AccountModal';

interface AccountListProps {
  accounts: Account[];
  onAddAccount: (account: Account) => void;
  onUpdateAccount: (account: Account) => void;
  onDeleteAccount: (id: string) => void;
}

interface AccountGroup {
  title: string;
  types: AccountType[];
  icon: React.ReactNode;
}

const ACCOUNT_GROUPS: AccountGroup[] = [
  {
    title: 'Bank Accounts',
    types: ['Chequing', 'Savings'],
    icon: <Wallet className="h-5 w-5 text-blue-600" />
  },
  {
    title: 'Registered Accounts',
    types: ['TFSA', 'RRSP'],
    icon: <PiggyBank className="h-5 w-5 text-blue-600" />
  },
  {
    title: 'Investment Accounts',
    types: ['Investment'],
    icon: <DollarSign className="h-5 w-5 text-blue-600" />
  },
  {
    title: 'Real Estate',
    types: ['Real Estate'],
    icon: <Building className="h-5 w-5 text-blue-600" />
  },
  {
    title: 'Credit Cards',
    types: ['Credit Card'],
    icon: <CreditCard className="h-5 w-5 text-blue-600" />
  },
  {
    title: 'Lines of Credit & HELOCs',
    types: ['Line of Credit', 'HELOC'],
    icon: <Home className="h-5 w-5 text-blue-600" />
  },
  {
    title: 'Mortgages',
    types: ['Mortgage'],
    icon: <Home className="h-5 w-5 text-blue-600" />
  },
  {
    title: 'Vehicle Loans',
    types: ['Car Loan', 'Vehicle'],
    icon: <Car className="h-5 w-5 text-blue-600" />
  },
  {
    title: 'Student & Personal Loans',
    types: ['Student Loan', 'Personal Loan'],
    icon: <GraduationCap className="h-5 w-5 text-blue-600" />
  }
];

export function AccountList({
  accounts,
  onAddAccount,
  onUpdateAccount,
  onDeleteAccount
}: AccountListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);

  const handleAddNew = () => {
    setEditingAccount(null);
    setIsModalOpen(true);
  };

  const handleEdit = (account: Account) => {
    setEditingAccount(account);
    setIsModalOpen(true);
  };

  const handleSave = (account: Account) => {
    if (editingAccount) {
      onUpdateAccount(account);
    } else {
      onAddAccount(account);
    }
    setIsModalOpen(false);
  };

  const renderAccountGroup = (group: AccountGroup) => {
    const groupAccounts = accounts.filter(account => group.types.includes(account.type));
    
    if (groupAccounts.length === 0) return null;

    return (
      <div key={group.title} className="mb-6 last:mb-0">
        <div className="flex items-center mb-3">
          <div className="p-2 bg-blue-100 rounded-lg mr-2">
            {group.icon}
          </div>
          <h3 className="text-lg font-medium text-gray-900">{group.title}</h3>
        </div>
        <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
          {groupAccounts.map((account) => (
            <div key={account.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
              <div>
                <div className="flex items-center">
                  <h4 className="text-sm font-medium text-gray-900">
                    {account.name}
                  </h4>
                  {account.accountNumber && (
                    <span className="ml-2 text-sm text-gray-500">
                      (×{account.accountNumber})
                    </span>
                  )}
                </div>
                {account.institution && (
                  <p className="text-sm text-gray-500">{account.institution}</p>
                )}
                {account.description && (
                  <p className="text-sm text-gray-500 mt-1">{account.description}</p>
                )}
                {account.interestRate !== undefined && account.interestRate > 0 && (
                  <p className="text-sm text-gray-500">
                    {account.category === 'Liability' ? 'Interest Rate' : 'Expected Return'}: {account.interestRate}%
                  </p>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <span className={`text-sm font-medium ${
                  account.category === 'Asset' ? 'text-green-600' : 'text-red-600'
                }`}>
                  ${Math.abs(account.balance).toLocaleString('en-US')}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(account)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDeleteAccount(account.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Accounts</h2>
        <button
          onClick={handleAddNew}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Account
        </button>
      </div>

      <div className="space-y-6">
        {ACCOUNT_GROUPS.map(group => renderAccountGroup(group))}
      </div>

      <AccountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        account={editingAccount}
        onSave={handleSave}
      />
    </div>
  );
}