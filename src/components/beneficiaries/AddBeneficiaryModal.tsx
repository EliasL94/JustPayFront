import { useState } from 'react';

interface AddBeneficiaryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (name: string, accountNumber: string) => void;
}

const AddBeneficiaryModal = ({ isOpen, onClose, onAdd }: AddBeneficiaryModalProps) => {
    const [name, setName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAdd(name, accountNumber);
        setName('');
        setAccountNumber('');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-white rounded-[16px] p-6 w-full max-w-md shadow-lg flex flex-col items-start gap-6 overflow-hidden">
                <div className="text-[#002222] text-[40px] font-bold font-['Inter'] leading-[48px] tracking-wide break-words">
                    Ajouter un beneficiaire
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full self-stretch">
                    <div className="flex flex-col gap-4 w-full">
                        <div className="flex flex-col gap-2">
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full py-3 pl-4 pr-3 bg-white rounded-[6px] outline outline-2 outline-[#CBD2E0] outline-offset-[-2px] text-[#002222] text-base font-normal font-['Inter'] leading-normal placeholder:text-[#002222]"
                                placeholder="Nom du compte"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <input
                                type="text"
                                id="accountNumber"
                                value={accountNumber}
                                onChange={(e) => setAccountNumber(e.target.value)}
                                className="w-full py-3 pl-4 pr-3 bg-white rounded-[6px] outline outline-2 outline-[#CBD2E0] outline-offset-[-2px] text-[#002222] text-base font-normal font-['Inter'] leading-normal placeholder:text-[#002222]"
                                placeholder="Numéro du compte"
                                required
                            />
                        </div>
                    </div>
                    <div className="flex justify-start items-start gap-[10px] mt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-4 rounded-[6px] outline outline-2 outline-[#002222] outline-offset-[-2px] text-[#002222] text-lg font-bold font-['Inter'] leading-normal flex justify-center items-center gap-2"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-4 bg-[#58C5C3] rounded-[6px] text-[#002222] text-lg font-bold font-['Inter'] leading-normal flex justify-center items-center gap-2"
                        >
                            Ajouter
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBeneficiaryModal;
