import { useState, useEffect } from 'react';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import AccountCards from '../components/dashboard/AccountCards';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import Shortcuts from '../components/dashboard/Shortcuts';

// PAGE DASHBOARD : C'est la page d'accueil. Elle récupère et affiche toutes les infos importantes (comptes, solde total, dernières transactions) pour donner une vue d'ensemble à l'utilisateur.
const Dashboard = () => {
    // Variables pour stocker les informations de l'utilisateur, ses comptes et ses transactions
    const [userDetails, setUserDetails] = useState<any>(null);
    const [accounts, setAccounts] = useState<any[]>([]);
    const [beneficiaries, setBeneficiaries] = useState<any[]>([]);
    const [transactions, setTransactions] = useState<any[]>([]);
    const [selectedAccount, setSelectedAccount] = useState<any>(null);

    // Au chargement de la page, on récupère toutes les données nécessaires depuis le serveur
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('user_id');

            if (!token || !userId) return;

            try {

                const userResponse = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'ngrok-skip-browser-warning': 'true'
                    }
                });
                if (userResponse.ok) {
                    const userData = await userResponse.json();
                    setUserDetails(userData);
                }


                let allAccounts: any[] = [];
                const primaryResponse = await fetch(`${import.meta.env.VITE_API_URL}/bankaccount/accounts/primary/${userId}`, {
                    headers: { 'ngrok-skip-browser-warning': 'true' }
                });
                if (primaryResponse.ok) {
                    const primaryData = await primaryResponse.json();
                    if (primaryData) allAccounts.push({ ...primaryData, type: 'primary' });
                }

                const secondaryResponse = await fetch(`${import.meta.env.VITE_API_URL}/bankaccount/accounts/secondary/${userId}`, {
                    headers: { 'ngrok-skip-browser-warning': 'true' }
                });
                if (secondaryResponse.ok) {
                    const secondaryData = await secondaryResponse.json();
                    if (Array.isArray(secondaryData)) {
                        allAccounts = [...allAccounts, ...secondaryData.map((acc: any) => ({ ...acc, type: 'secondary' }))];
                    } else if (secondaryData.accounts && Array.isArray(secondaryData.accounts)) {
                        allAccounts = [...allAccounts, ...secondaryData.accounts.map((acc: any) => ({ ...acc, type: 'secondary' }))];
                    }
                }
                setAccounts(allAccounts);


                const benResponse = await fetch(`${import.meta.env.VITE_API_URL}/beneficiaries/user/${userId}`, {
                    headers: { 'ngrok-skip-browser-warning': 'true' }
                });
                if (benResponse.ok) {
                    const benData = await benResponse.json();
                    setBeneficiaries(Array.isArray(benData) ? benData : []);
                }



                let allTransactions: any[] = [];
                for (const account of allAccounts) {
                    if (account?.account_number) {
                        const txResponse = await fetch(`${import.meta.env.VITE_API_URL}/payments/account/${account.account_number}`, {
                            headers: { 'ngrok-skip-browser-warning': 'true' }
                        });
                        if (txResponse.ok) {
                            const txData = await txResponse.json();
                            if (Array.isArray(txData)) {
                                allTransactions = [...allTransactions, ...txData];
                            }
                        }
                    }
                }


                setTransactions(allTransactions);

            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchData();
    }, []);

    // Filtrage des données selon le compte sélectionné (ou tous les comptes si aucun n'est choisi)
    const displayedAccounts = selectedAccount ? [selectedAccount] : accounts;

    const displayedTransactions = selectedAccount
        ? transactions.filter(t =>
            t.account_number === selectedAccount.account_number ||
            t.beneficiary_account_number === selectedAccount.account_number
        )
        : transactions;



    return (
        <div className="self-stretch px-6 py-12 inline-flex flex-col justify-start items-start gap-12 bg-slate-50 min-h-screen">
            <DashboardHeader
                userName={userDetails?.pseudo}
                userFirstname={userDetails?.firstname}
                accounts={accounts}
                selectedAccount={selectedAccount}
                onSelectAccount={setSelectedAccount}
            />
            <AccountCards accounts={displayedAccounts} transactions={displayedTransactions} />
            <div className="self-stretch inline-flex justify-start items-start gap-6">
                <RecentTransactions transactions={displayedTransactions} accounts={accounts} beneficiaries={beneficiaries} />
                <Shortcuts />
            </div>
        </div>
    );
};

export default Dashboard;
