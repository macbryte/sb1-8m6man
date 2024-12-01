export type AccountType = 
  // Asset Types
  | 'Chequing'
  | 'Savings'
  | 'TFSA'
  | 'RRSP'
  | 'Investment'
  | 'Real Estate'
  | 'Vehicle'
  | 'Cash'
  // Liability Types
  | 'Credit Card'
  | 'Line of Credit'
  | 'Mortgage'
  | 'Car Loan'
  | 'Student Loan'
  | 'Personal Loan'
  | 'HELOC'
  | 'Other';

export type TransactionCategory = 'Income' | 'Bills' | 'Shopping' | 'Transportation' | 'Food' | 'Healthcare' | 'Entertainment' | 'Investment' | 'Other';

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  category: 'Asset' | 'Liability';
  balance: number;
  lastModified: string;
  description?: string;
  interestRate?: number;
  institution?: string;
  accountNumber?: string;
}

export interface Transaction {
  id: string;
  date: string;
  accountId: string;
  accountHolder: string;
  amount: number;
  category: TransactionCategory;
  description?: string;
  lastModified: string;
}

export interface AssetItem {
  id: string;
  name: string;
  amount: number;
  notes?: string;
  lastModified: string;
}

export interface LiabilityItem {
  id: string;
  name: string;
  amount: number;
  interestRate?: number;
  notes?: string;
  lastModified: string;
}

export interface Assets {
  cash: number;
  investments: number;
  property: number;
  other: number;
  details: {
    cashItems: AssetItem[];
    investmentItems: AssetItem[];
    propertyItems: AssetItem[];
    otherItems: AssetItem[];
  };
}

export interface Liabilities {
  mortgage: number;
  otherDebts: number;
  details: {
    mortgageItems: LiabilityItem[];
    debtItems: LiabilityItem[];
  };
}

export interface MonthlyFinances {
  income: number;
  expenses: number;
}

export interface FinancialData {
  monthlyFinances: MonthlyFinances;
  assets: Assets;
  liabilities: Liabilities;
  emergencyFund: number;
  accounts: Account[];
  transactions: Transaction[];
  lastModified: string;
}

export interface HealthIndicators {
  savingsRate: number;
  debtToIncomeRatio: number;
  emergencyFundHealth: number;
}

export const defaultFinancialData: FinancialData = {
  monthlyFinances: {
    income: 0,
    expenses: 0
  },
  assets: {
    cash: 0,
    investments: 0,
    property: 0,
    other: 0,
    details: {
      cashItems: [],
      investmentItems: [],
      propertyItems: [],
      otherItems: []
    }
  },
  liabilities: {
    mortgage: 0,
    otherDebts: 0,
    details: {
      mortgageItems: [],
      debtItems: []
    }
  },
  emergencyFund: 0,
  accounts: [],
  transactions: [],
  lastModified: new Date().toISOString()
};