import { useState, useEffect } from 'react';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';
import { FinancialData, defaultFinancialData, HealthIndicators } from '../types';

export function useFinancialData() {
  const [data, setData] = useState<FinancialData>(defaultFinancialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      setData(defaultFinancialData);
      setLoading(false);
      return;
    }

    const userDocRef = doc(db, 'users', currentUser.uid);

    const unsubscribe = onSnapshot(userDocRef, 
      (snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.data();
          const financialData = {
            ...defaultFinancialData,
            ...userData.financialData,
            monthlyFinances: {
              ...defaultFinancialData.monthlyFinances,
              ...userData.financialData?.monthlyFinances
            },
            assets: {
              ...defaultFinancialData.assets,
              ...userData.financialData?.assets,
              details: {
                ...defaultFinancialData.assets.details,
                ...userData.financialData?.assets?.details
              }
            },
            liabilities: {
              ...defaultFinancialData.liabilities,
              ...userData.financialData?.liabilities,
              details: {
                ...defaultFinancialData.liabilities.details,
                ...userData.financialData?.liabilities?.details
              }
            }
          };
          setData(financialData);
        } else {
          setData(defaultFinancialData);
        }
        setLoading(false);
      }, 
      (err) => {
        setError(`Real-time sync error: ${err.message}`);
        console.error('Snapshot error:', err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  const saveData = async (newData: FinancialData) => {
    if (!currentUser) return;
    
    try {
      const updatedData = {
        ...newData,
        lastModified: new Date().toISOString()
      };
      
      const userDocRef = doc(db, 'users', currentUser.uid);
      await setDoc(userDocRef, { financialData: updatedData }, { merge: true });
      setData(updatedData);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save data';
      setError(errorMessage);
      console.error('Save error:', err);
      throw new Error(errorMessage);
    }
  };

  const calculateIndicators = (): HealthIndicators => {
    const monthlySavings = data.monthlyFinances.income - data.monthlyFinances.expenses;
    const savingsRate = data.monthlyFinances.income > 0 
      ? (monthlySavings / data.monthlyFinances.income) * 100 
      : 0;
    
    const monthlyDebtPayments = data.liabilities.mortgage + data.liabilities.otherDebts;
    const debtToIncomeRatio = data.monthlyFinances.income > 0 
      ? (monthlyDebtPayments / data.monthlyFinances.income) * 100 
      : 0;
    
    const emergencyFundHealth = data.monthlyFinances.expenses > 0 
      ? data.emergencyFund / data.monthlyFinances.expenses 
      : 0;

    return {
      savingsRate,
      debtToIncomeRatio,
      emergencyFundHealth,
    };
  };

  const calculateNetWorth = (): number => {
    const totalAssets = Object.values(data.assets).reduce((a, b) => 
      typeof b === 'number' ? a + b : a, 0
    );
    const totalLiabilities = Object.values(data.liabilities).reduce((a, b) => 
      typeof b === 'number' ? a + b : a, 0
    );
    return totalAssets - totalLiabilities;
  };

  return {
    data,
    setData: saveData,
    calculateIndicators,
    calculateNetWorth,
    loading,
    error
  };
}