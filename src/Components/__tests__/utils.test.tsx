import { describe, it, expect } from 'vitest';


describe('Utility Functions', () => {
  
  const formatTransactionDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  it('should format dates correctly', () => {
    expect(formatTransactionDate('2023-07-15T10:30:00Z')).toBe('July 15, 2023');
    expect(formatTransactionDate('2023-12-01T00:00:00Z')).toBe('December 1, 2023');
  });

  
  const getTransactionDisplayName = (productName?: string, type?: string): string => {
    return productName || type || 'Unknown';
  };

  it('should return product name when available', () => {
    expect(getTransactionDisplayName('Premium Package', 'deposit')).toBe('Premium Package');
  });

  it('should fallback to type when product name is missing', () => {
    expect(getTransactionDisplayName(undefined, 'deposit')).toBe('deposit');
  });

  it('should fallback to Unknown when both are missing', () => {
    expect(getTransactionDisplayName(undefined, undefined)).toBe('Unknown');
  });

 
  const formatAmount = (amount: number): string => {
    return `USD ${amount.toFixed(2)}`;
  };

  it('should format amounts correctly', () => {
    expect(formatAmount(5000)).toBe('USD 5000.00');
    expect(formatAmount(2500.5)).toBe('USD 2500.50');
    expect(formatAmount(0)).toBe('USD 0.00');
  });


  const getStatusColor = (status: string): string => {
    return status === 'successful' ? 'green.500' : 'red.400';
  };

  it('should return correct status colors', () => {
    expect(getStatusColor('successful')).toBe('green.500');
    expect(getStatusColor('failed')).toBe('red.400');
    expect(getStatusColor('pending')).toBe('red.400');
  });

  
  const extractErrorMessage = (error: any): string => {
    if ('error' in error) {
      return error.error;
    }
    return 'Unknown error';
  };

  it('should extract error messages correctly', () => {
    expect(extractErrorMessage({ error: 'Network error', status: '500' })).toBe('Network error');
    expect(extractErrorMessage({ status: '404' })).toBe('Unknown error');
    expect(extractErrorMessage({})).toBe('Unknown error');
  });


  const transformTransactionData = (transactions: any[]) => {
    return transactions.map(transaction => ({
      date: transaction.date,
      amount: transaction.amount,
      month: transaction.date,
      value: transaction.amount
    }));
  };

  it('should transform transaction data for charts', () => {
    const transactions = [
      { date: '2023-07-15', amount: 5000 },
      { date: '2023-07-16', amount: 3000 }
    ];

    const result = transformTransactionData(transactions);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      date: '2023-07-15',
      amount: 5000,
      month: '2023-07-15',
      value: 5000
    });
  });

  it('should handle empty transaction arrays', () => {
    expect(transformTransactionData([])).toEqual([]);
  });
});