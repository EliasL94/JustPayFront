import { useState, useEffect, useCallback } from 'react';
import AccountsHeader from '../components/accounts/AccountsHeader';
import AccountCard from '../components/accounts/AccountCard';
import AddAccountModal from '../components/accounts/AddAccountModal';
import CloseAccountModal from '../components/accounts/CloseAccountModal';

const Accounts = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
    const [accounts, setAccounts] = useState<any[]>([]);
    const [totalAssets, setTotalAssets] = useState<string>('0,00');
    const [selectedAccountToClose, setSelectedAccountToClose] = useState<any>(null);
    const [userDetails, setUserDetails] = useState<any>(null);

    // Récupération des comptes (principal et secondaires)
    const fetchAccounts = useCallback(async () => {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
            console.warn('User ID missing');
            return;
        }

        try {
            let allAccounts: any[] = [];

            // Fetch primary account
            const primaryResponse = await fetch(`${import.meta.env.VITE_API_URL}/bankaccount/accounts/primary/${userId}`, {
                headers: { 'ngrok-skip-browser-warning': 'true' }
            });
            if (primaryResponse.ok) {
                const primaryData = await primaryResponse.json();
                console.log('Primary account data:', primaryData);
                if (primaryData) {
                    // Normalize primary account data if needed, assuming it returns a single object
                    const primaryAccount = { ...primaryData, type: 'primary' };
                    allAccounts.push(primaryAccount);
                }
            } else {
                console.warn('Error fetching primary account');
            }

            // Fetch secondary accounts
            const secondaryResponse = await fetch(`${import.meta.env.VITE_API_URL}/bankaccount/accounts/secondary/${userId}`, {
                headers: { 'ngrok-skip-browser-warning': 'true' }
            });
            if (secondaryResponse.ok) {
                const secondaryData = await secondaryResponse.json();
                console.log('Secondary accounts data:', secondaryData);

                let secondaryAccountsList: any[] = [];
                if (Array.isArray(secondaryData)) {
                    secondaryAccountsList = secondaryData;
                } else if (secondaryData.accounts && Array.isArray(secondaryData.accounts)) {
                    secondaryAccountsList = secondaryData.accounts;
                }

                // Tag them as secondary
                const taggedSecondaryAccounts = secondaryAccountsList.map(acc => ({ ...acc, type: 'secondary' }));
                allAccounts = [...allAccounts, ...taggedSecondaryAccounts];

            } else {
                console.warn('Error fetching secondary accounts');
            }

            setAccounts(allAccounts);

            // Calculate total assets
            const total = allAccounts.reduce((sum: number, account: any) => {
                const balance = typeof account.balance === 'string'
                    ? parseFloat(account.balance.replace(',', '.').replace('€', ''))
                    : account.balance;
                return sum + (isNaN(balance) ? 0 : balance);
            }, 0);

            setTotalAssets(`${total.toFixed(2).replace('.', ',')}€`);

        } catch (error) {
            console.error('Network error:', error);
        }
    }, []);

    // Récupération des détails de l'utilisateur
    const fetchUserDetails = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'ngrok-skip-browser-warning': 'true'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setUserDetails(data);
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    }, []);

    useEffect(() => {
        fetchAccounts();
        fetchUserDetails();
    }, [fetchAccounts, fetchUserDetails]);

    // Suppression d'un compte
    const handleDeleteAccount = async () => {
        if (!selectedAccountToClose || !selectedAccountToClose.account_number) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/bankaccount/accounts/${selectedAccountToClose.account_number}`, {
                method: 'DELETE',
                headers: { 'ngrok-skip-browser-warning': 'true' }
            });

            if (response.ok) {
                console.log('Account deleted successfully');
                setIsCloseModalOpen(false);
                setSelectedAccountToClose(null);
                fetchAccounts(); // Refresh list
            } else {
                console.error('Error deleting account');
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    // Création d'un compte secondaire
    const createSecondaryAccount = async (accountName: string) => {
        if (!userDetails) {
            console.error('User details not available');
            return;
        }

        const params = new URLSearchParams({
            name: accountName,
            firstname: userDetails.firstname || userDetails.first_name || '', // Adjust based on API response
            email: userDetails.email,
            age: userDetails.age ? userDetails.age.toString() : '18', // Default or handle missing age
            user_id: userDetails.id
        });

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/bankaccount/accounts/secondary?${params.toString()}`, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                }
            });

            if (response.ok) {
                console.log('Secondary account created successfully');
                fetchAccounts();
                setIsModalOpen(false);
            } else {
                console.error('Error creating secondary account');
                const errorData = await response.json();
                console.error(errorData);
                alert('Erreur lors de la création du compte');
            }
        } catch (error) {
            console.error('Network error:', error);
            alert('Erreur réseau');
        }
    };

    const handleAddAccount = (newAccount: { name: string }) => {
        createSecondaryAccount(newAccount.name);
    };

    return (
        <div className="w-full px-4 md:px-6 py-12 flex flex-col justify-start items-start gap-12 bg-slate-50 min-h-screen relative">
            <AccountsHeader onAddAccount={() => setIsModalOpen(true)} totalAssets={totalAssets} />
            {isModalOpen && <AddAccountModal onClose={() => setIsModalOpen(false)} onAccountCreated={handleAddAccount} />}
            {isCloseModalOpen && (
                <CloseAccountModal
                    onClose={() => {
                        setIsCloseModalOpen(false);
                        setSelectedAccountToClose(null);
                    }}
                    onConfirm={handleDeleteAccount}
                    accountName={selectedAccountToClose?.name}
                    userEmail={userDetails?.email}
                />
            )}
            <div className="w-full flex justify-start items-start gap-6">
                <div className="w-full max-w-[925px]">
                    <div className="grid grid-cols-2 gap-6">
                        {Array.isArray(accounts) && accounts.map((account) => (
                            <AccountCard
                                key={account.id}
                                id={account.id}
                                name={account.name || (account.type === 'primary' ? "Compte Principal" : "Compte Secondaire")}
                                balance={`${account.balance}€`}
                                iban={account.iban}
                                account_number={account.account_number}
                                isPrimary={account.type === 'primary'}
                                onCloseAccount={() => {
                                    setSelectedAccountToClose(account);
                                    setIsCloseModalOpen(true);
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Accounts;
