import React, { useState } from 'react';
import { Save, List } from 'lucide-react';
import { InputSection } from '../InputSection';
import { DetailsModal } from '../DetailsModal';
import { FinancialData, AssetItem, LiabilityItem } from '../../types';

interface InputFormProps {
  data: FinancialData;
  onUpdate: (updates: Partial<FinancialData>) => void;
  onSave: () => Promise<void>;
  isSaving: boolean;
}

export function InputForm({ data, onUpdate, onSave, isSaving }: InputFormProps) {
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    type: 'asset' | 'liability';
    category: string;
    items: (AssetItem | LiabilityItem)[];
    title: string;
  }>({
    isOpen: false,
    type: 'asset',
    category: '',
    items: [],
    title: ''
  });

  const openDetailsModal = (
    type: 'asset' | 'liability',
    category: string,
    items: (AssetItem | LiabilityItem)[],
    title: string
  ) => {
    // Ensure items array exists before opening modal
    const itemsArray = items || [];
    setModalConfig({ isOpen: true, type, category, items: itemsArray, title });
  };

  const handleDetailsUpdate = (items: (AssetItem | LiabilityItem)[]) => {
    const { type, category } = modalConfig;
    const total = items.reduce((sum, item) => sum + item.amount, 0);

    if (type === 'asset') {
      const newAssets = { 
        ...data.assets,
        details: {
          ...data.assets.details,
          [`${category}Items`]: items
        }
      };
      newAssets[category as keyof typeof data.assets] = total;
      onUpdate({ assets: newAssets });
    } else {
      const newLiabilities = {
        ...data.liabilities,
        details: {
          ...data.liabilities.details,
          [`${category}Items`]: items
        }
      };
      newLiabilities[category as keyof typeof data.liabilities] = total;
      onUpdate({ liabilities: newLiabilities });
    }
  };

  // Initialize empty arrays if they don't exist
  const ensureArrays = () => {
    if (!data.assets.details) {
      data.assets.details = {
        cashItems: [],
        investmentItems: [],
        propertyItems: [],
        otherItems: []
      };
    }
    if (!data.liabilities.details) {
      data.liabilities.details = {
        mortgageItems: [],
        debtItems: []
      };
    }
  };

  // Call ensureArrays when component mounts
  React.useEffect(() => {
    ensureArrays();
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-gray-900">Monthly Finances</h2>
          <InputSection
            label="Monthly Income"
            value={data.monthlyFinances.income}
            onChange={(value) =>
              onUpdate({
                monthlyFinances: { ...data.monthlyFinances, income: value },
              })
            }
          />
          <InputSection
            label="Monthly Expenses"
            value={data.monthlyFinances.expenses}
            onChange={(value) =>
              onUpdate({
                monthlyFinances: { ...data.monthlyFinances, expenses: value },
              })
            }
          />
          <InputSection
            label="Emergency Fund"
            value={data.emergencyFund}
            onChange={(value) => onUpdate({ emergencyFund: value })}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-medium text-gray-900">Assets</h2>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <InputSection
                label="Cash"
                value={data.assets.cash}
                onChange={(value) =>
                  onUpdate({ assets: { ...data.assets, cash: value } })
                }
              />
              <button
                onClick={() => openDetailsModal(
                  'asset',
                  'cash',
                  data.assets.details?.cashItems || [],
                  'Cash Details'
                )}
                className="mt-6 ml-2 p-2 text-blue-600 hover:text-blue-700"
              >
                <List className="h-5 w-5" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <InputSection
                label="Investments"
                value={data.assets.investments}
                onChange={(value) =>
                  onUpdate({ assets: { ...data.assets, investments: value } })
                }
              />
              <button
                onClick={() => openDetailsModal(
                  'asset',
                  'investments',
                  data.assets.details?.investmentItems || [],
                  'Investment Details'
                )}
                className="mt-6 ml-2 p-2 text-blue-600 hover:text-blue-700"
              >
                <List className="h-5 w-5" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <InputSection
                label="Property"
                value={data.assets.property}
                onChange={(value) =>
                  onUpdate({ assets: { ...data.assets, property: value } })
                }
              />
              <button
                onClick={() => openDetailsModal(
                  'asset',
                  'property',
                  data.assets.details?.propertyItems || [],
                  'Property Details'
                )}
                className="mt-6 ml-2 p-2 text-blue-600 hover:text-blue-700"
              >
                <List className="h-5 w-5" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <InputSection
                label="Other Assets"
                value={data.assets.other}
                onChange={(value) =>
                  onUpdate({ assets: { ...data.assets, other: value } })
                }
              />
              <button
                onClick={() => openDetailsModal(
                  'asset',
                  'other',
                  data.assets.details?.otherItems || [],
                  'Other Assets Details'
                )}
                className="mt-6 ml-2 p-2 text-blue-600 hover:text-blue-700"
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-medium text-gray-900">Liabilities</h2>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <InputSection
                label="Mortgage"
                value={data.liabilities.mortgage}
                onChange={(value) =>
                  onUpdate({
                    liabilities: { ...data.liabilities, mortgage: value },
                  })
                }
              />
              <button
                onClick={() => openDetailsModal(
                  'liability',
                  'mortgage',
                  data.liabilities.details?.mortgageItems || [],
                  'Mortgage Details'
                )}
                className="mt-6 ml-2 p-2 text-blue-600 hover:text-blue-700"
              >
                <List className="h-5 w-5" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <InputSection
                label="Other Debts"
                value={data.liabilities.otherDebts}
                onChange={(value) =>
                  onUpdate({
                    liabilities: { ...data.liabilities, otherDebts: value },
                  })
                }
              />
              <button
                onClick={() => openDetailsModal(
                  'liability',
                  'debt',
                  data.liabilities.details?.debtItems || [],
                  'Other Debts Details'
                )}
                className="mt-6 ml-2 p-2 text-blue-600 hover:text-blue-700"
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center">
        {data.lastModified && (
          <span className="text-sm text-gray-500">
            Last modified: {new Date(data.lastModified).toLocaleString()}
          </span>
        )}
        <button
          onClick={onSave}
          disabled={isSaving}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <DetailsModal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
        title={modalConfig.title}
        items={modalConfig.items}
        onSave={handleDetailsUpdate}
        type={modalConfig.type}
      />
    </div>
  );
}