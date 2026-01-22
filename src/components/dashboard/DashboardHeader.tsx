import { useState } from 'react';
import Flechebasbleu from '../../assets/SVG_Dashboard/Icon-2.svg';


interface DashboardHeaderProps {
    userName?: string;
    userFirstname?: string;
    accounts?: any[];
    selectedAccount?: any;
    onSelectAccount?: (account: any) => void;
}

// COMPOSANT EN-TÊTE DASHBOARD : Affiche le message de bienvenue et le sélecteur de compte.
const DashboardHeader = ({ userName, userFirstname, accounts = [], selectedAccount, onSelectAccount }: DashboardHeaderProps) => {
    const displayName = userFirstname || userName || 'Alex';
    const currentDate = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);

    const handleAccountSelect = (account: any) => {
        if (onSelectAccount) {
            onSelectAccount(account);
        }
        setIsAccountDropdownOpen(false);
    };

    const getAccountName = (acc: any) => {
        if (acc.type === 'primary') return "Compte principal";
        return acc.name || "Compte secondaire";
    };

    return (
        <div className="self-stretch inline-flex justify-between items-start z-20">
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-2.5">
                <div className="justify-start text-emerald-950 text-4xl font-bold font-['Inter'] leading-[48px] tracking-tight">Bonjour {displayName}</div>
                <div className="justify-start text-neutral-400 text-lg font-normal font-['Inter'] leading-7">{currentDate}</div>
            </div>
            <div className="w-[704px] h-14" />
            <div className="flex justify-start items-center gap-2.5">
                <div className="w-56 inline-flex flex-col justify-start items-start relative">
                    <div className="self-stretch flex flex-col justify-start items-start gap-2">
                        <div
                            className="self-stretch bg-white rounded-md outline outline-2 outline-offset-[-2px] outline-slate-300 flex flex-col justify-start items-start overflow-hidden cursor-pointer"
                            onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                        >
                            <div className="self-stretch pl-4 pr-3 py-3 inline-flex justify-start items-center gap-2">
                                <div className="flex-1 justify-start text-emerald-950 text-base font-normal font-['Inter'] leading-6 truncate">
                                    {selectedAccount ? getAccountName(selectedAccount) : "Tous mes comptes"}
                                </div>
                                <div className="w-6 h-6 relative overflow-hidden flex justify-center items-center">
                                    <img src={Flechebasbleu} alt="Chevron" className={`w-3.5 h-2 transition-transform ${isAccountDropdownOpen ? 'rotate-180' : ''}`} />
                                </div>
                            </div>
                        </div>
                    </div>
                    {isAccountDropdownOpen && (
                        <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-md shadow-lg outline outline-1 outline-slate-200 overflow-hidden z-50">
                            <div
                                className="px-4 py-3 hover:bg-slate-50 cursor-pointer text-emerald-950 text-base font-normal font-['Inter']"
                                onClick={() => handleAccountSelect(null)}
                            >
                                Tous mes comptes
                            </div>
                            {accounts.map((acc, index) => (
                                <div
                                    key={index}
                                    className="px-4 py-3 hover:bg-slate-50 cursor-pointer text-emerald-950 text-base font-normal font-['Inter'] truncate"
                                    onClick={() => handleAccountSelect(acc)}
                                >
                                    {getAccountName(acc)}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div data-label="False" data-open="False" className="w-48 inline-flex flex-col justify-start items-start">
                    <div className="self-stretch flex flex-col justify-start items-start gap-2">
                        <div className="self-stretch bg-white rounded-md outline outline-2 outline-offset-[-2px] outline-slate-300 flex flex-col justify-start items-start overflow-hidden">
                            <div className="self-stretch pl-4 pr-3 py-3 inline-flex justify-start items-center gap-2">
                                <div className="flex-1 justify-start text-emerald-950 text-base font-normal font-['Inter'] leading-6">Janvier 2025</div>
                                <div className="w-6 h-6 relative overflow-hidden flex justify-center items-center">
                                    <img src={Flechebasbleu} alt="Chevron" className="w-3.5 h-2" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHeader;
