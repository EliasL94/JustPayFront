import { useState } from 'react';
import IconChevronUp from '../../assets/SVG_Dashboard/icon-chevron-up.svg';

interface AddAccountModalProps {
    onClose: () => void;
    onAccountCreated: (account: { name: string; balance: string; iban: string; type: string }) => void;
}

const AddAccountModal = ({ onClose, onAccountCreated }: AddAccountModalProps) => {
    const [accountType, setAccountType] = useState('Courant');
    const [accountName, setAccountName] = useState('');

    const handleCreate = () => {
        if (!accountName.trim()) {
            alert("Veuillez entrer un nom de compte.");
            return;
        }

        // Mock IBAN generation
        const mockIban = `FR76 ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}...`;

        const newAccount = {
            name: accountName,
            balance: '0,00€', // Initial balance
            iban: mockIban,
            type: accountType
        };

        onAccountCreated(newAccount);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="w-[634px] p-6 bg-white rounded-2xl inline-flex flex-col justify-start items-start gap-6 overflow-hidden shadow-xl">
                <div className="justify-start text-emerald-950 text-4xl font-bold font-['Inter'] leading-[48px] tracking-tight">Ajouter un compte</div>
                <div className="self-stretch flex flex-col justify-start items-start gap-4">
                    <div className="self-stretch flex flex-col justify-start items-start">
                        <div className="self-stretch flex flex-col justify-start items-start gap-2">
                            <div className="self-stretch inline-flex justify-start items-start gap-2.5">
                                <div className="flex-1 justify-start text-emerald-950 text-sm font-semibold font-['Inter'] leading-4">Type de compte</div>
                            </div>
                            <div className="self-stretch bg-white rounded-md outline outline-2 outline-offset-[-2px] outline-slate-300 flex flex-col justify-start items-start overflow-hidden">
                                <div className="self-stretch pl-4 pr-3 py-3 inline-flex justify-start items-center gap-2">
                                    <select
                                        value={accountType}
                                        onChange={(e) => setAccountType(e.target.value)}
                                        className="flex-1 justify-start text-emerald-950 text-base font-normal font-['Inter'] leading-6 bg-transparent outline-none appearance-none"
                                    >
                                        <option value="Courant">Compte courant</option>
                                        <option value="Epargne">Compte épargne</option>
                                    </select>
                                    <div className="w-6 h-6 relative overflow-hidden flex justify-center items-center pointer-events-none">
                                        <img src={IconChevronUp} alt="Chevron" className="w-3.5 h-2 rotate-180" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="self-stretch inline-flex justify-start items-center">
                        <div className="flex-1 pl-4 pr-3 py-3 bg-white rounded-md outline outline-2 outline-offset-[-2px] outline-slate-300 flex justify-end items-center gap-2.5">
                            <input
                                type="text"
                                value={accountName}
                                onChange={(e) => setAccountName(e.target.value)}
                                placeholder="Nom du compte"
                                className="flex-1 justify-start text-emerald-950 text-base font-normal font-['Inter'] leading-6 outline-none placeholder-neutral-400"
                            />
                        </div>
                    </div>
                </div>
                <div className="inline-flex justify-start items-start gap-2.5">
                    <div onClick={onClose} className="px-6 py-4 rounded-md outline outline-2 outline-offset-[-2px] outline-emerald-950 flex justify-center items-center gap-2 overflow-hidden cursor-pointer hover:bg-emerald-50 transition-colors">
                        <div className="justify-start text-emerald-950 text-lg font-bold font-['Inter'] leading-6">Annuler</div>
                    </div>
                    <div onClick={handleCreate} className="px-6 py-4 bg-teal-300 rounded-md flex justify-center items-center gap-2 overflow-hidden cursor-pointer hover:bg-teal-400 transition-colors">
                        <div className="justify-start text-emerald-950 text-lg font-bold font-['Inter'] leading-6">Créer un compte</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddAccountModal;
