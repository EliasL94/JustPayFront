import { useState, useEffect } from 'react';

const API_BASE_URL = 'http://127.0.0.1:8000';

const TransactionsStats = () => {
    const [income, setIncome] = useState<number>(0);
    const [expenses, setExpenses] = useState<number>(0);
    const [totalTransactions, setTotalTransactions] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransactionsStats = async () => {
            const userId = localStorage.getItem('user_id');
            if (!userId) {
                setLoading(false);
                return;
            }

            try {
                let allTransactions: any[] = [];

                const primaryResponse = await fetch(`${API_BASE_URL}/bankaccount/accounts/primary/${userId}`);
                if (primaryResponse.ok) {
                    const primaryData = await primaryResponse.json();
                    if (primaryData?.account_number) {
                        const txResponse = await fetch(`${API_BASE_URL}/payments/account/${primaryData.account_number}`);
                        if (txResponse.ok) {
                            const txData = await txResponse.json();
                            if (Array.isArray(txData)) {
                                allTransactions = [...allTransactions, ...txData];
                            }
                        }
                    }
                }

                const secondaryResponse = await fetch(`${API_BASE_URL}/bankaccount/accounts/secondary/${userId}`);
                if (secondaryResponse.ok) {
                    const secondaryData = await secondaryResponse.json();
                    let secondaryAccounts: any[] = [];

                    if (Array.isArray(secondaryData)) {
                        secondaryAccounts = secondaryData;
                    } else if (secondaryData.accounts && Array.isArray(secondaryData.accounts)) {
                        secondaryAccounts = secondaryData.accounts;
                    }

                    for (const account of secondaryAccounts) {
                        if (account?.account_number) {
                            const txResponse = await fetch(`${API_BASE_URL}/payments/account/${account.account_number}`);
                            if (txResponse.ok) {
                                const txData = await txResponse.json();
                                if (Array.isArray(txData)) {
                                    allTransactions = [...allTransactions, ...txData];
                                }
                            }
                        }
                    }
                }

                let totalIncome = 0;
                let totalExpenses = 0;

                allTransactions.forEach(tx => {
                    const amount = typeof tx.amount === 'string'
                        ? parseFloat(tx.amount.replace(',', '.'))
                        : tx.amount;

                    if (amount > 0) {
                        totalIncome += amount;
                    } else {
                        totalExpenses += Math.abs(amount);
                    }
                });

                setIncome(totalIncome);
                setExpenses(totalExpenses);
                setTotalTransactions(allTransactions.length);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching transaction stats:', error);
                setLoading(false);
            }
        };

        fetchTransactionsStats();
    }, []);

    const formatAmount = (amount: number) => {
        return amount.toFixed(2).replace('.', ',') + '€';
    };

    return (
        <div style={{ flex: '1 1 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 24, display: 'inline-flex' }}>
            <div style={{ alignSelf: 'stretch', paddingLeft: 24, paddingRight: 24, paddingTop: 16, paddingBottom: 16, background: 'white', overflow: 'hidden', borderRadius: 16, justifyContent: 'flex-start', alignItems: 'flex-start', gap: 16, display: 'inline-flex' }}>
                <div style={{ width: 50, height: 50, padding: 10, background: '#B4E5E4', overflow: 'hidden', borderRadius: 47, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5V16.5858L5.70711 11.2929C5.31658 10.9024 4.68342 10.9024 4.29289 11.2929C3.90237 11.6834 3.90237 12.3166 4.29289 12.7071L11.2929 19.7071C11.6834 20.0976 12.3166 20.0976 12.7071 19.7071L19.7071 12.7071C20.0976 12.3166 20.0976 11.6834 19.7071 11.2929C19.3166 10.9024 18.6834 10.9024 18.2929 11.2929L13 16.5858V5Z" fill="#4BA7A6" />
                    </svg>
                </div>
                <div style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex' }}>
                    <div style={{ color: '#002222', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', lineHeight: '24px', wordWrap: 'break-word' }}>Entrées</div>
                    <div style={{ color: '#002222', fontSize: 40, fontFamily: 'Inter', fontWeight: '700', lineHeight: '48px', letterSpacing: 0.40, wordWrap: 'break-word' }}>
                        {loading ? '...' : formatAmount(income)}
                    </div>
                </div>
            </div>

            <div style={{ alignSelf: 'stretch', paddingLeft: 24, paddingRight: 24, paddingTop: 16, paddingBottom: 16, background: 'white', overflow: 'hidden', borderRadius: 16, justifyContent: 'flex-start', alignItems: 'flex-start', gap: 16, display: 'inline-flex' }}>
                <div style={{ width: 50, height: 50, padding: 10, background: '#F6C4A9', overflow: 'hidden', borderRadius: 47, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.7071 4.29289C12.3166 3.90237 11.6834 3.90237 11.2929 4.29289L4.29289 11.2929C3.90237 11.6834 3.90237 12.3166 4.29289 12.7071C4.68342 13.0976 5.31658 13.0976 5.70711 12.7071L11 7.41421V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V7.41421L18.2929 12.7071C18.6834 13.0976 19.3166 13.0976 19.7071 12.7071C20.0976 12.3166 20.0976 11.6834 19.7071 11.2929L12.7071 4.29289Z" fill="#C86936" />
                    </svg>
                </div>
                <div style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex' }}>
                    <div style={{ color: '#002222', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', lineHeight: '24px', wordWrap: 'break-word' }}>Sorties</div>
                    <div style={{ color: '#002222', fontSize: 40, fontFamily: 'Inter', fontWeight: '700', lineHeight: '48px', letterSpacing: 0.40, wordWrap: 'break-word' }}>
                        {loading ? '...' : formatAmount(expenses)}
                    </div>
                </div>
            </div>

            <div style={{ alignSelf: 'stretch', paddingLeft: 24, paddingRight: 24, paddingTop: 16, paddingBottom: 16, background: 'white', overflow: 'hidden', borderRadius: 16, justifyContent: 'flex-start', alignItems: 'flex-start', gap: 16, display: 'inline-flex' }}>
                <div style={{ width: 50, height: 50, padding: 10, background: '#EEE7FE', overflow: 'hidden', borderRadius: 47, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 5C2.44772 5 2 5.44772 2 6C2 6.55228 2.44772 7 3 7H3.01C3.56228 7 4.01 6.55228 4.01 6C4.01 5.44772 3.56228 5 3.01 5H3Z" fill="#7D53DD" />
                        <path d="M8 5C7.44772 5 7 5.44772 7 6C7 6.55228 7.44772 7 8 7H21C21.5523 7 22 6.55228 22 6C22 5.44772 21.5523 5 21 5H8Z" fill="#7D53DD" />
                        <path d="M8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13H21C21.5523 13 22 12.5523 22 12C22 11.4477 21.5523 11 21 11H8Z" fill="#7D53DD" />
                        <path d="M7 18C7 17.4477 7.44772 17 8 17H21C21.5523 17 22 17.4477 22 18C22 18.5523 21.5523 19 21 19H8C7.44772 19 7 18.5523 7 18Z" fill="#7D53DD" />
                        <path d="M2 12C2 11.4477 2.44772 11 3 11H3.01C3.56228 11 4.01 11.4477 4.01 12C4.01 12.5523 3.56228 13 3.01 13H3C2.44772 13 2 12.5523 2 12Z" fill="#7D53DD" />
                        <path d="M3 17C2.44772 17 2 17.4477 2 18C2 18.5523 2.44772 19 3 19H3.01C3.56228 19 4.01 18.5523 4.01 18C4.01 17.4477 3.56228 17 3.01 17H3Z" fill="#7D53DD" />
                    </svg>
                </div>
                <div style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex' }}>
                    <div style={{ color: '#002222', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', lineHeight: '24px', wordWrap: 'break-word' }}>Transactions</div>
                    <div style={{ color: '#002222', fontSize: 40, fontFamily: 'Inter', fontWeight: '700', lineHeight: '48px', letterSpacing: 0.40, wordWrap: 'break-word' }}>
                        {loading ? '...' : totalTransactions}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionsStats;
