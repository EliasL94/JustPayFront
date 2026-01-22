import { useNavigate } from 'react-router-dom';
import IconSend from '../../assets/SVG_Dashboard/icon-send.svg';
import IconArrowRight from '../../assets/SVG_Dashboard/icon-arrow-right.svg';

interface TransferTypeSelectionProps {
    onSelect: (type: 'internal' | 'external') => void;
}

// COMPOSANT SÉLECTION TYPE VIREMENT : Permet à l'utilisateur de choisir entre un virement interne (entre ses comptes) et un virement externe (vers un tiers).
const TransferTypeSelection = ({ onSelect }: TransferTypeSelectionProps) => {
    const navigate = useNavigate();

    return (
        <div className="w-[500px] p-6 bg-white rounded-2xl flex flex-col justify-start items-start gap-12 overflow-hidden shadow-sm">
            <div className="justify-start text-emerald-950 text-4xl font-bold font-['Inter'] leading-[48px] tracking-tight">Effectuer un virement</div>
            <div className="self-stretch flex flex-col justify-start items-start gap-6">
                <div
                    onClick={() => onSelect('internal')}
                    className="self-stretch px-6 py-4 bg-teal-300 rounded-2xl inline-flex justify-between items-center overflow-hidden cursor-pointer hover:bg-teal-400 transition-colors"
                >
                    <div className="flex justify-start items-center gap-4">
                        <div className="w-12 h-12 p-2.5 bg-teal-200 rounded-[47px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                            <div className="w-5 h-5 relative overflow-hidden flex justify-center items-center">
                                <img src={IconSend} alt="Interne" className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="inline-flex flex-col justify-start items-start gap-2">
                            <div className="justify-start text-white text-base font-normal font-['Inter'] leading-6">Virement interne</div>
                            <div className="justify-start text-emerald-50 text-sm font-normal font-['Inter'] leading-5">Envoyer des fonds sur vos comptes</div>
                        </div>
                    </div>
                    <div className="w-5 h-5 relative overflow-hidden flex justify-center items-center">
                        <img src={IconArrowRight} alt="Arrow" className="w-3.5 h-3.5" />
                    </div>
                </div>
                <div
                    onClick={() => onSelect('external')}
                    className="self-stretch px-6 py-4 bg-slate-50 rounded-2xl inline-flex justify-between items-center overflow-hidden cursor-pointer hover:bg-slate-100 transition-colors"
                >
                    <div className="flex justify-start items-center gap-4">
                        <div className="w-12 h-12 p-2.5 bg-sky-200 rounded-[47px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                            <div className="w-5 h-5 relative overflow-hidden flex justify-center items-center">
                                <img src={IconSend} alt="Externe" className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="inline-flex flex-col justify-start items-start gap-2">
                            <div className="justify-start text-emerald-950 text-base font-normal font-['Inter'] leading-6">Virement externe</div>
                            <div className="justify-start text-gray-500 text-sm font-normal font-['Inter'] leading-5">Effectuez un virement instantaté</div>
                        </div>
                    </div>
                    <div className="w-5 h-5 relative overflow-hidden flex justify-center items-center">
                        <img src={IconArrowRight} alt="Arrow" className="w-3.5 h-3.5" />
                    </div>
                </div>
            </div>
            <div className="self-stretch inline-flex justify-between items-start">
                <div onClick={() => navigate('/dashboard')} data-icon-left="false" data-icon-right="false" data-label="true" data-size="Large" data-style="Outline" className="px-6 py-4 rounded-md outline outline-2 outline-offset-[-2px] outline-emerald-950 flex justify-center items-center gap-2 overflow-hidden cursor-pointer hover:bg-emerald-50 transition-colors">
                    <div className="justify-start text-emerald-950 text-lg font-bold font-['Inter'] leading-6">Annuler</div>
                </div>
                <div data-icon-left="false" data-icon-right="false" data-label="true" data-size="Large" data-style="Solid" className="px-6 py-4 bg-teal-300 rounded-md flex justify-center items-center gap-2 overflow-hidden cursor-pointer hover:bg-teal-400 transition-colors">
                    <div className="justify-start text-emerald-950 text-lg font-bold font-['Inter'] leading-6">Suivant</div>
                </div>
            </div>
        </div>
    );
};

export default TransferTypeSelection;
