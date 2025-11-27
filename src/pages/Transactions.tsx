import { useState, useEffect } from 'react';
import TransactionsHeader from '../components/transactions/TransactionsHeader';
import TransactionsList from '../components/transactions/TransactionsList';
import TransactionsStats from '../components/transactions/TransactionsStats';

const API_BASE_URL = 'http://127.0.0.1:8000';

const Transactions = () => {
    const [accounts, setAccounts] = useState<any[]>([]);
    const [transactions, setTransactions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedAccount, setSelectedAccount] = useState<any>(null);
    const [selectedMonth, setSelectedMonth] = useState('Janvier 2025');

    const [beneficiaries, setBeneficiaries] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const userId = localStorage.getItem('user_id');
            if (!userId) return;

            try {
                // Fetch Accounts
                let allAccounts: any[] = [];
                const primaryResponse = await fetch(`${API_BASE_URL}/bankaccount/accounts/primary/${userId}`);
                if (primaryResponse.ok) {
                    const primaryData = await primaryResponse.json();
                    if (primaryData) allAccounts.push({ ...primaryData, type: 'primary' });
                }

                const secondaryResponse = await fetch(`${API_BASE_URL}/bankaccount/accounts/secondary/${userId}`);
                if (secondaryResponse.ok) {
                    const secondaryData = await secondaryResponse.json();
                    if (Array.isArray(secondaryData)) {
                        allAccounts = [...allAccounts, ...secondaryData.map((acc: any) => ({ ...acc, type: 'secondary' }))];
                    } else if (secondaryData.accounts && Array.isArray(secondaryData.accounts)) {
                        allAccounts = [...allAccounts, ...secondaryData.accounts.map((acc: any) => ({ ...acc, type: 'secondary' }))];
                    }
                }
                setAccounts(allAccounts);

                // Fetch Beneficiaries
                const benResponse = await fetch(`${API_BASE_URL}/beneficiaries/user/${userId}`);
                if (benResponse.ok) {
                    const benData = await benResponse.json();
                    setBeneficiaries(Array.isArray(benData) ? benData : []);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchTransactions = async () => {
            setLoading(true);
            const userId = localStorage.getItem('user_id');
            if (!userId) {
                setLoading(false);
                return;
            }

            try {
                let allTransactions: any[] = [];

                if (selectedAccount) {
                    // Fetch for specific account
                    const txResponse = await fetch(`${API_BASE_URL}/payments/account/${selectedAccount.account_number}`);
                    if (txResponse.ok) {
                        const txData = await txResponse.json();
                        if (Array.isArray(txData)) {
                            allTransactions = txData;
                        }
                    }
                } else {
                    // Fetch for all accounts
                    // We need to use the accounts state, but it might not be ready in the first render if we depend on it.
                    // However, we can re-fetch or use the accounts if they are already loaded.
                    // To be safe and simple, let's iterate over the accounts state if available, or fetch again if needed.
                    // Since this effect depends on `accounts`, it will run when accounts are loaded.

                    for (const account of accounts) {
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

                setTransactions(allTransactions);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            } finally {
                setLoading(false);
            }
        };

        if (accounts.length > 0) {
            fetchTransactions();
        } else {
            // If no accounts yet, maybe we are still loading accounts.
            // But if we truly have no accounts, we should stop loading.
            setLoading(false);
        }

    }, [accounts, selectedAccount]);

    return (
        <div className="w-full h-full bg-slate-50 min-h-screen px-4 md:px-6 py-12">
            <div className="flex flex-col gap-12">
                <TransactionsHeader
                    accounts={accounts}
                    selectedAccount={selectedAccount}
                    onSelectAccount={setSelectedAccount}
                    selectedMonth={selectedMonth}
                    onSelectMonth={setSelectedMonth}
                />
                <div className="flex justify-start items-start gap-6">
                    <TransactionsList transactions={transactions} loading={loading} accounts={accounts} beneficiaries={beneficiaries} />
                    <TransactionsStats
                        inflows={Math.abs(transactions.filter(t => t.amount < 0).reduce((acc, t) => acc + t.amount, 0))}
                        outflows={transactions.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0)}
                        count={transactions.length}
                    />
                </div>
            </div>
        </div>
    );
};

export default Transactions;
