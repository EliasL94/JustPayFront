import { useState, useEffect } from 'react';
import AccountsHeader from '../components/accounts/AccountsHeader';
import AccountCard from '../components/accounts/AccountCard';
import AddAccountModal from '../components/accounts/AddAccountModal';
import CloseAccountModal from '../components/accounts/CloseAccountModal';

const Accounts = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
    const [accounts, setAccounts] = useState<any[]>([]);
    const [totalAssets, setTotalAssets] = useState<string>('0,00€');
    const [primaryAccountId, setPrimaryAccountId] = useState<string | null>(null);
    const [selectedAccountToClose, setSelectedAccountToClose] = useState<any>(null);

    const fetchAccounts = async () => {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
            console.warn('User ID missing');
            return;
        }

        try {
            // Fetch all accounts
            const response = await fetch(`http://127.0.0.1:8000/bankaccount/accounts/?user_id=${userId}`);
            if (response.ok) {
                const data = await response.json();
                console.log('Accounts data:', data); // Debug log

                const accountsList = data.accounts || [];

                if (Array.isArray(accountsList)) {
                    setAccounts(accountsList);

                    // Calculate total assets
                    const total = accountsList.reduce((sum: number, account: any) => {
                        const balance = typeof account.balance === 'string'
                            ? parseFloat(account.balance.replace(',', '.').replace('€', ''))
                            : account.balance;
                        return sum + (isNaN(balance) ? 0 : balance);
                    }, 0);

                    setTotalAssets(`${total.toFixed(2).replace('.', ',')}€`);
                } else {
                    console.error('Data.accounts is not an array:', data);
                    setAccounts([]);
                }
            } else {
                console.error('Error fetching accounts');
            }

            // Fetch primary account
            const primaryResponse = await fetch(`http://127.0.0.1:8000/bankaccount/accounts/primary/${userId}`);
            if (primaryResponse.ok) {
                const primaryData = await primaryResponse.json();
                console.log('Primary account data:', primaryData);
                // Assuming primaryData is the account object or has an id field
                setPrimaryAccountId(primaryData.id || primaryData.account_id);
            } else {
                console.warn('Error fetching primary account');
            }

        } catch (error) {
            console.error('Network error:', error);
        }
    };

    useEffect(() => {
        fetchAccounts();
    }, []);

    const handleDeleteAccount = async () => {
        if (!selectedAccountToClose || !selectedAccountToClose.account_number) return;

        try {
            const response = await fetch(`http://127.0.0.1:8000/bankaccount/accounts/${selectedAccountToClose.account_number}`, {
                method: 'DELETE',
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

    const handleAddAccount = (newAccount: { name: string; balance: string; iban: string; type: string }) => {
        // Optimistic update for now since we don't have the API endpoint for creation in this context
        // We assign a temporary ID
        const accountWithId = { ...newAccount, id: `temp-${Date.now()}` };
        setAccounts([...accounts, accountWithId]);
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
                />
            )}
            <div className="w-full flex justify-start items-start gap-6">
                <div className="w-full max-w-[925px]">
                    <div className="grid grid-cols-2 gap-6">
                        {Array.isArray(accounts) && accounts.map((account) => (
                            <AccountCard
                                key={account.id}
                                id={account.id}
                                name={account.id === primaryAccountId ? "Principal" : "Secondaire"}
                                balance={`${account.balance}€`} // Formatting balance
                                iban={account.iban}
                                account_number={account.account_number}
                                isPrimary={account.id === primaryAccountId}
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
