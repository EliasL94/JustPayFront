import { useState, useEffect } from 'react';
import BeneficiariesHeader from '../components/beneficiaries/BeneficiariesHeader';
import BeneficiaryCard from '../components/beneficiaries/BeneficiaryCard';
import AddBeneficiaryModal from '../components/beneficiaries/AddBeneficiaryModal';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const Beneficiaries = () => {
    const [beneficiaries, setBeneficiaries] = useState<any[]>([]);
    const [totalAssets, setTotalAssets] = useState<string>('0,00');


    // Récupération des bénéficiaires et des comptes au chargement
    useEffect(() => {
        const fetchBeneficiaries = async () => {
            const userId = localStorage.getItem('user_id');
            if (!userId) {
                console.warn('User ID missing in localStorage.');
                return;
            }

            try {
                const response = await fetch(`${API_BASE_URL}/beneficiaries/user/${userId}`, {
                    headers: { 'ngrok-skip-browser-warning': 'true' }
                });
                if (response.ok) {
                    const data = await response.json();
                    setBeneficiaries(data);
                } else {
                    console.error('Erreur lors de la récupération des bénéficiaires');
                }
            } catch (error) {
                console.error('Erreur réseau:', error);
            }
        };

        const fetchAccounts = async () => {
            const userId = localStorage.getItem('user_id');
            if (!userId) return;

            try {
                let allAccounts: any[] = [];

                // Fetch primary account
                const primaryResponse = await fetch(`${API_BASE_URL}/bankaccount/accounts/primary/${userId}`, {
                    headers: { 'ngrok-skip-browser-warning': 'true' }
                });
                if (primaryResponse.ok) {
                    const primaryData = await primaryResponse.json();
                    if (primaryData) {
                        allAccounts.push(primaryData);
                    }
                }

                // Fetch secondary accounts
                const secondaryResponse = await fetch(`${API_BASE_URL}/bankaccount/accounts/secondary/${userId}`, {
                    headers: { 'ngrok-skip-browser-warning': 'true' }
                });
                if (secondaryResponse.ok) {
                    const secondaryData = await secondaryResponse.json();
                    if (Array.isArray(secondaryData)) {
                        allAccounts = [...allAccounts, ...secondaryData];
                    } else if (secondaryData.accounts && Array.isArray(secondaryData.accounts)) {
                        allAccounts = [...allAccounts, ...secondaryData.accounts];
                    }
                }

                // Calculate total assets
                const total = allAccounts.reduce((sum: number, account: any) => {
                    const balance = typeof account.balance === 'string'
                        ? parseFloat(account.balance.replace(',', '.').replace('€', ''))
                        : account.balance;
                    return sum + (isNaN(balance) ? 0 : balance);
                }, 0);

                setTotalAssets(`${total.toFixed(2).replace('.', ',')}€`);

            } catch (error) {
                console.error('Error fetching accounts:', error);
            }
        };

        fetchBeneficiaries();
        fetchAccounts();
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);

    // Ajout d'un nouveau bénéficiaire
    const handleAddBeneficiary = async (name: string, accountNumber: string) => {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
            alert('Utilisateur non connecté (user_id manquant).');
            return;
        }

        try {
            // Construct query parameters
            const params = new URLSearchParams({
                user_id: userId,
                name: name,
                account_number: accountNumber
            });

            const response = await fetch(`${API_BASE_URL}/beneficiaries/?${params.toString()}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                },
            });

            if (response.ok) {
                // Reload the page to refresh the list
                window.location.reload();
            } else {
                const errorData = await response.json();
                alert(`Erreur lors de l'ajout: ${errorData.detail || 'Erreur inconnue'}`);
            }
        } catch {
            // Ignore error
        }
    };
    // Suppression d'un bénéficiaire
    const handleDeleteBeneficiary = async (id: number) => {
        if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce bénéficiaire ?')) {
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/beneficiaries/${id}`, {
                method: 'DELETE',
                headers: { 'ngrok-skip-browser-warning': 'true' }
            });

            if (response.ok) {
                setBeneficiaries(beneficiaries.filter(b => b.id !== id));
            } else {
                // Handle case where API might return error text instead of JSON
                try {
                    const errorData = await response.json();
                    alert(`Erreur lors de la suppression: ${errorData.detail || 'Erreur inconnue'}`);
                } catch {
                    // Ignore error
                }
            }
        } catch (error) {
            console.error('Erreur réseau:', error);
            alert('Erreur réseau lors de la suppression.');
        }
    };

    return (
        <div className="w-full h-full flex justify-start items-start gap-6 bg-slate-50 min-h-screen">
            <div className="flex-1 self-stretch px-4 md:px-6 py-12 flex flex-col justify-start items-start gap-12">
                <BeneficiariesHeader onAddBeneficiary={() => setIsModalOpen(true)} totalAssets={totalAssets} />
                <div className="self-stretch flex-1 flex justify-start items-start gap-6">
                    <div className="w-full max-w-full md:max-w-[925px]">
                        {beneficiaries.length > 0 ? (
                            <div className="grid grid-cols-2 gap-4">
                                {beneficiaries.map((beneficiary) => (
                                    <BeneficiaryCard
                                        key={beneficiary.id}
                                        id={beneficiary.id}
                                        name={beneficiary.name}
                                        iban={beneficiary.iban}
                                        account_number={beneficiary.account_number}
                                        onDelete={() => handleDeleteBeneficiary(beneficiary.id)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="w-full py-12 flex justify-center items-center">
                                <span className="text-neutral-400 text-lg font-normal font-['Inter']">
                                    Aucun bénéficiaire pour le moment
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <AddBeneficiaryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddBeneficiary}
            />
        </div>
    );
};

export default Beneficiaries;
