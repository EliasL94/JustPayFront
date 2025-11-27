import { useState, useEffect } from 'react';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import AccountCards from '../components/dashboard/AccountCards';
import CashFlowChart from '../components/dashboard/CashFlowChart';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import Shortcuts from '../components/dashboard/Shortcuts';

const Dashboard = () => {
    const [userDetails, setUserDetails] = useState<any>(null);
    const [accounts, setAccounts] = useState<any[]>([]);
    const [beneficiaries, setBeneficiaries] = useState<any[]>([]);
    const [transactions, setTransactions] = useState<any[]>([]);
    const [selectedAccount, setSelectedAccount] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('user_id');

            if (!token || !userId) return;

            try {
                // Fetch User Details
                const userResponse = await fetch('http://127.0.0.1:8000/auth/me', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (userResponse.ok) {
                    const userData = await userResponse.json();
                    setUserDetails(userData);
                }

                // Fetch Accounts
                let allAccounts: any[] = [];
                const primaryResponse = await fetch(`http://127.0.0.1:8000/bankaccount/accounts/primary/${userId}`);
                if (primaryResponse.ok) {
                    const primaryData = await primaryResponse.json();
                    if (primaryData) allAccounts.push({ ...primaryData, type: 'primary' });
                }

                const secondaryResponse = await fetch(`http://127.0.0.1:8000/bankaccount/accounts/secondary/${userId}`);
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
                const benResponse = await fetch(`http://127.0.0.1:8000/beneficiaries/user/${userId}`);
                if (benResponse.ok) {
                    const benData = await benResponse.json();
                    setBeneficiaries(Array.isArray(benData) ? benData : []);
                }

                // Fetch Transactions
                // If selectedAccount is set, we could fetch only for that account, but for now let's fetch all or filter client side if we already have them.
                // Actually, the previous logic only fetched for the first account. Let's improve this to fetch for ALL accounts if possible, or fetch based on selection.
                // To keep it simple and consistent with previous "fetch all" attempt in Transactions.tsx:

                let allTransactions: any[] = [];
                for (const account of allAccounts) {
                    if (account?.account_number) {
                        const txResponse = await fetch(`http://127.0.0.1:8000/payments/account/${account.account_number}`);
                        if (txResponse.ok) {
                            const txData = await txResponse.json();
                            if (Array.isArray(txData)) {
                                allTransactions = [...allTransactions, ...txData];
                            }
                        }
                    }
                }
                // Remove duplicates if any (though unlikely if accounts are distinct)
                // Sort by date descending? The API might not sort them combined.
                // Let's assume API returns sorted or we sort them.
                allTransactions.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

                setTransactions(allTransactions);

            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchData();
    }, []);

    // Filter data based on selectedAccount
    const displayedAccounts = selectedAccount ? [selectedAccount] : accounts;

    const displayedTransactions = selectedAccount
        ? transactions.filter(t =>
            t.account_number === selectedAccount.account_number ||
            t.beneficiary_account_number === selectedAccount.account_number
        )
        : transactions;

    // Prepare Chart Data (Last 7 Days)
    const prepareChartData = () => {
        const last7Days = Array.from({ length: 7 }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - (6 - i));
            return d.toISOString().split('T')[0];
        });

        return last7Days.map(date => {
            const dayTransactions = displayedTransactions.filter(t =>
                (t.date || t.created_at || '').startsWith(date)
            );

            const income = Math.abs(dayTransactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0));
            const expense = dayTransactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);

            // Balance is tricky without historical snapshots. 
            // For sparkline, we can just show the net change or cumulative if we had start balance.
            // Let's show Net Change for "Balance" sparkline for now, or just Income - Expense.
            const net = income - expense;

            return {
                date,
                day: new Date(date).toLocaleDateString('fr-FR', { weekday: 'short' }),
                income,
                expense,
                net
            };
        });
    };

    const chartData = prepareChartData();

    return (
        <div className="self-stretch px-6 py-12 inline-flex flex-col justify-start items-start gap-12 bg-slate-50 min-h-screen">
            <DashboardHeader
                userName={userDetails?.pseudo}
                userFirstname={userDetails?.firstname}
                accounts={accounts}
                selectedAccount={selectedAccount}
                onSelectAccount={setSelectedAccount}
            />
            <AccountCards accounts={displayedAccounts} transactions={displayedTransactions} chartData={chartData} />
            <CashFlowChart data={chartData} />
            <div className="self-stretch inline-flex justify-start items-start gap-6">
                <RecentTransactions transactions={displayedTransactions} accounts={accounts} beneficiaries={beneficiaries} />
                <Shortcuts />
            </div>
        </div>
    );
};

export default Dashboard;
