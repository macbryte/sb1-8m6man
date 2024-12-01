import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { AssetItem, LiabilityItem } from '../types';

interface DetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  items: (AssetItem | LiabilityItem)[];
  onSave: (items: (AssetItem | LiabilityItem)[]) => void;
  type: 'asset' | 'liability';
}

export function DetailsModal({
  isOpen,
  onClose,
  title,
  items,
  onSave,
  type
}: DetailsModalProps) {
  const [localItems, setLocalItems] = useState<(AssetItem | LiabilityItem)[]>(items);

  if (!isOpen) return null;

  const addNewItem = () => {
    const newItem = {
      id: crypto.randomUUID(),
      name: '',
      amount: 0,
      notes: '',
      lastModified: new Date().toISOString(),
      ...(type === 'liability' ? { interestRate: 0 } : {})
    };
    setLocalItems([...localItems, newItem]);
  };

  const updateItem = (id: string, updates: Partial<AssetItem | LiabilityItem>) => {
    setLocalItems(localItems.map(item => 
      item.id === id 
        ? { ...item, ...updates, lastModified: new Date().toISOString() }
        : item
    ));
  };

  const removeItem = (id: string) => {
    setLocalItems(localItems.filter(item => item.id !== id));
  };

  const handleSave = () => {
    onSave(localItems);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {localItems.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => updateItem(item.id, { name: e.target.value })}
                  placeholder="Item name"
                  className="border rounded px-2 py-1 w-1/3"
                />
                <input
                  type="number"
                  value={item.amount}
                  onChange={(e) => updateItem(item.id, { amount: Number(e.target.value) })}
                  placeholder="Amount"
                  className="border rounded px-2 py-1 w-1/4"
                />
                {type === 'liability' && (
                  <input
                    type="number"
                    value={(item as LiabilityItem).interestRate || 0}
                    onChange={(e) => updateItem(item.id, { interestRate: Number(e.target.value) })}
                    placeholder="Interest rate %"
                    className="border rounded px-2 py-1 w-1/6"
                  />
                )}
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <textarea
                value={item.notes}
                onChange={(e) => updateItem(item.id, { notes: e.target.value })}
                placeholder="Notes"
                className="border rounded px-2 py-1 w-full h-20 resize-none"
              />
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-between">
          <button
            onClick={addNewItem}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </button>
          <button
            onClick={handleSave}
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}