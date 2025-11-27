import { useNavigate } from 'react-router-dom';
import Flechehautorange from '../../assets/SVG_Dashboard/Icon-4.svg';
import Flechebasbleu from '../../assets/SVG_Dashboard/Icon-2.svg';
import IconSend from '../../assets/SVG_Dashboard/icon-send.svg';
import IconUserPlus from '../../assets/SVG_Dashboard/icon-user-plus.svg';
import IconPlus from '../../assets/SVG_Dashboard/icon-plus.svg';

const Shortcuts = () => {
    const navigate = useNavigate();

    return (
        <div className="flex-1 px-6 py-4 bg-white rounded-2xl inline-flex flex-col justify-start items-start gap-4">
            <div className="self-stretch inline-flex justify-between items-center">
                <div className="justify-start text-emerald-950 text-2xl font-bold font-['Inter'] leading-8">Raccourcis</div>
                <div className="w-5 h-5 relative overflow-hidden flex justify-center items-center">
                    <img src={Flechehautorange} alt="Arrow" className="w-3 h-1.5" />
                </div>
            </div>
            <div
                onClick={() => navigate('/transfer')}
                className="self-stretch px-6 py-4 bg-teal-300 rounded-2xl inline-flex justify-between items-center overflow-hidden cursor-pointer hover:bg-teal-400 transition-colors"
            >
                <div className="flex justify-start items-center gap-4">
                    <div className="w-12 h-12 p-2.5 bg-teal-200 rounded-[47px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                        <img src={IconSend} alt="Send" className="w-5 h-5" />
                    </div>
                    <div className="inline-flex flex-col justify-start items-start gap-2">
                        <div className="justify-start text-white text-base font-normal font-['Inter'] leading-6">Envoyer de l’argent</div>
                        <div className="justify-start text-emerald-50 text-sm font-normal font-['Inter'] leading-5">Virement à vos beneficiaires</div>
                    </div>
                </div>
                <div className="w-5 h-5 relative overflow-hidden flex justify-center items-center">
                    <img src={Flechehautorange} alt="Arrow" className="w-3.5 h-3.5" />
                </div>
            </div>
            <div
                onClick={() => navigate('/beneficiaries')}
                className="self-stretch px-6 py-4 bg-slate-50 rounded-2xl inline-flex justify-between items-center overflow-hidden cursor-pointer hover:bg-slate-100 transition-colors"
            >
                <div className="flex justify-start items-center gap-4">
                    <div className="w-12 h-12 p-2.5 bg-sky-200 rounded-[47px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                        <img src={IconUserPlus} alt="User Plus" className="w-5 h-5" />
                    </div>
                    <div className="inline-flex flex-col justify-start items-start gap-2">
                        <div className="justify-start text-emerald-950 text-base font-normal font-['Inter'] leading-6">Ajouter un bénéficiaire</div>
                        <div className="justify-start text-gray-500 text-sm font-normal font-['Inter'] leading-5">Gérer la liste</div>
                    </div>
                </div>
                <div className="w-5 h-5 relative overflow-hidden flex justify-center items-center">
                    <img src={Flechehautorange} alt="Arrow" className="w-3.5 h-3.5" />
                </div>
            </div>
            <div
                onClick={() => navigate('/transfer', { state: { initialType: 'internal' } })}
                className="self-stretch px-6 py-4 bg-slate-50 rounded-2xl inline-flex justify-between items-center overflow-hidden cursor-pointer hover:bg-slate-100 transition-colors"
            >
                <div className="flex justify-start items-center gap-4">
                    <div className="w-12 h-12 p-2.5 bg-sky-200 rounded-[47px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                        <img src={IconPlus} alt="Plus" className="w-5 h-5" />
                    </div>
                    <div className="inline-flex flex-col justify-start items-start gap-2">
                        <div className="justify-start text-emerald-950 text-base font-normal font-['Inter'] leading-6">Ajouter des fonds</div>
                        <div className="justify-start text-gray-500 text-sm font-normal font-['Inter'] leading-5">Créditer votre compte</div>
                    </div>
                </div>
                <div className="w-5 h-5 relative overflow-hidden flex justify-center items-center">
                    <img src={Flechebasbleu} alt="Arrow" className="w-3.5 h-3.5" />
                </div>
            </div>
        </div>
    );
};

export default Shortcuts;
