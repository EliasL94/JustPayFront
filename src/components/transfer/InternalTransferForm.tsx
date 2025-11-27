import { useState, useEffect } from 'react';

interface InternalTransferFormProps {
    onBack: () => void;
    onSuccess: (amount: string, recipient: string) => void;
    accounts: any[];
}

const InternalTransferForm = ({ onBack, onSuccess, accounts }: InternalTransferFormProps) => {
    const [amount, setAmount] = useState('');
    const [label, setLabel] = useState('');
    const [selectedDebitAccount, setSelectedDebitAccount] = useState<string>('');
    const [selectedCreditAccount, setSelectedCreditAccount] = useState<string>('');

    useEffect(() => {
        if (accounts.length > 0) {
            // Default to first account for debit
            setSelectedDebitAccount(accounts[0].account_number);
            // Default to second account for credit if available, else first
            if (accounts.length > 1) {
                setSelectedCreditAccount(accounts[1].account_number);
            } else {
                setSelectedCreditAccount(accounts[0].account_number);
            }
        }
    }, [accounts]);

    const handleSubmit = async () => {
        const userId = localStorage.getItem('user_id');
        if (!userId || !selectedDebitAccount || !selectedCreditAccount || !amount) {
            alert("Veuillez remplir tous les champs obligatoires.");
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:8000/payments/transfer?user_id=${userId}&account_number=${selectedDebitAccount}&beneficiary_account_number=${selectedCreditAccount}&amount=${Number(amount) * 100}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const creditAccount = accounts.find(acc => acc.account_number === selectedCreditAccount);
                const recipientName = creditAccount ? (creditAccount.name || `${creditAccount.firstname} ${creditAccount.lastname}`) : "Compte interne";
                onSuccess(amount, recipientName);
            } else {
                const errorData = await response.json();
                const errorMessage = typeof errorData.detail === 'object' ? JSON.stringify(errorData.detail) : errorData.detail;
                alert(`Erreur lors du virement: ${errorMessage || 'Erreur inconnue'}`);
            }
        } catch (error) {
            console.error("Transfer error:", error);
            alert("Une erreur est survenue lors du virement.");
        }
    };

    const getAccountName = (acc: any) => {
        if (acc.type === 'primary') return "Compte principal";
        return acc.name || "Compte secondaire";
    };

    const selectedDebitAcc = accounts.find(acc => acc.account_number === selectedDebitAccount);
    const selectedCreditAcc = accounts.find(acc => acc.account_number === selectedCreditAccount);

    return (
        <div className="self-stretch self-stretch px-6 py-12 inline-flex flex-col justify-start items-center gap-12">
            <div className="inline-flex justify-start items-center gap-4">
                <div className="flex justify-start items-center gap-6 flex-wrap content-center">
                    <div className="w-12 h-12 px-3.5 py-0.5 bg-teal-100 rounded-[48px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                        <div className="w-2 h-6 justify-start text-black text-lg font-bold font-['Inter'] leading-6">1</div>
                    </div>
                    <div className="justify-start text-gray-500 text-lg font-bold font-['Inter'] leading-6">Type de virement</div>
                    <div className="w-24 h-0 outline outline-1 outline-offset-[-0.50px] outline-neutral-400"></div>
                </div>
                <div className="w-72 flex justify-start items-center gap-6 flex-wrap content-center">
                    <div className="w-12 h-12 px-3.5 py-0.5 bg-teal-300 rounded-[48px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                        <div className="justify-start text-black text-lg font-bold font-['Inter'] leading-6">2</div>
                    </div>
                    <div className="justify-start text-teal-300 text-lg font-bold font-['Inter'] leading-6">Bénéficiaire</div>
                    <div className="w-24 h-0 outline outline-1 outline-offset-[-0.50px] outline-neutral-400"></div>
                </div>
                <div className="flex justify-start items-center gap-6 flex-wrap content-center">
                    <div className="w-12 h-12 px-3.5 py-0.5 bg-teal-100 rounded-[48px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                        <div className="justify-start text-black text-lg font-bold font-['Inter'] leading-6">4</div>
                    </div>
                    <div className="justify-start text-gray-500 text-lg font-bold font-['Inter'] leading-6">Confirmation</div>
                </div>
            </div>
            <div className="w-[500px] p-6 bg-white rounded-2xl flex flex-col justify-start items-start gap-12 overflow-hidden">
                <div className="justify-start text-emerald-950 text-4xl font-bold font-['Inter'] leading-[48px] tracking-tight">Choisir un bénéficiaire</div>
                <div className="self-stretch flex flex-col justify-start items-start gap-4">
                    <div className="self-stretch flex flex-col justify-start items-start gap-6">
                        <div className="self-stretch flex flex-col justify-start items-start gap-4">
                            <div className="justify-start text-black text-lg font-bold font-['Inter'] leading-6">Compte à débiter</div>
                            <div className="self-stretch bg-white rounded-md outline outline-2 outline-offset-[-2px] outline-slate-300 flex flex-col justify-start items-start overflow-hidden">
                                <select
                                    value={selectedDebitAccount}
                                    onChange={(e) => setSelectedDebitAccount(e.target.value)}
                                    className="w-full p-3 bg-white outline-none text-emerald-950 text-base font-normal font-['Inter']"
                                >
                                    {accounts.map(acc => (
                                        <option key={acc.account_number} value={acc.account_number}>
                                            {getAccountName(acc)} - {acc.balance}€
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="self-stretch flex flex-col justify-start items-start gap-4">
                        <div className="justify-start text-black text-lg font-bold font-['Inter'] leading-6">Compte à créditer</div>
                        <div className="self-stretch bg-white rounded-md outline outline-2 outline-offset-[-2px] outline-slate-300 flex flex-col justify-start items-start overflow-hidden">
                            <select
                                value={selectedCreditAccount}
                                onChange={(e) => setSelectedCreditAccount(e.target.value)}
                                className="w-full p-3 bg-white outline-none text-emerald-950 text-base font-normal font-['Inter']"
                            >
                                {accounts.filter(acc => acc.account_number !== selectedDebitAccount).map(acc => (
                                    <option key={acc.account_number} value={acc.account_number}>
                                        {getAccountName(acc)} - {acc.balance}€
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="self-stretch inline-flex justify-start items-start gap-4">
                        <div data-icon="true" data-label="true" data-value="false" className="flex-1 inline-flex flex-col justify-end items-start gap-2">
                            <div className="self-stretch inline-flex justify-start items-start gap-2.5">
                                <div className="flex-1 justify-start text-gray-700 text-sm font-semibold font-['Inter'] leading-4">Montant</div>
                            </div>
                            <div className="self-stretch h-12 relative bg-white rounded-md outline outline-2 outline-offset-[-2px] outline-slate-300 flex items-center px-3">
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-full h-full outline-none text-emerald-950"
                                    placeholder="0.00"
                                />
                            </div>
                        </div>
                        <div data-icon="false" data-label="true" data-value="false" className="flex-1 inline-flex flex-col justify-end items-start gap-2">
                            <div className="self-stretch inline-flex justify-start items-start gap-2.5">
                                <div className="flex-1 justify-start text-gray-700 text-sm font-semibold font-['Inter'] leading-4">Libellé (facultatif)</div>
                            </div>
                            <input
                                type="text"
                                value={label}
                                onChange={(e) => setLabel(e.target.value)}
                                className="self-stretch h-12 px-3 bg-white rounded-md outline outline-2 outline-offset-[-2px] outline-slate-300 text-emerald-950"
                            />
                        </div>
                    </div>
                </div>
                <div className="self-stretch inline-flex justify-between items-start">
                    <div
                        onClick={onBack}
                        data-icon-left="false" data-icon-right="false" data-label="true" data-size="Large" data-style="Outline"
                        className="px-6 py-4 rounded-md outline outline-2 outline-offset-[-2px] outline-emerald-950 flex justify-center items-center gap-2 overflow-hidden cursor-pointer hover:bg-emerald-50 transition-colors"
                    >
                        <div className="justify-start text-emerald-950 text-lg font-bold font-['Inter'] leading-6">Précédent</div>
                    </div>
                    <div
                        onClick={handleSubmit}
                        data-icon-left="false" data-icon-right="false" data-label="true" data-size="Large" data-style="Solid"
                        className="px-6 py-4 bg-teal-300 rounded-md flex justify-center items-center gap-2 overflow-hidden cursor-pointer hover:bg-teal-400 transition-colors"
                    >
                        <div className="justify-start text-emerald-950 text-lg font-bold font-['Inter'] leading-6">Suivant</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InternalTransferForm;
