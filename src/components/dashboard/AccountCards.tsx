import Flechehautorange from '../../assets/SVG_Dashboard/Icon-4.svg';
import Flechezigzag from '../../assets/SVG_Dashboard/Icon-3.svg';
import Flechebasverte from '../../assets/SVG_Dashboard/Icon-5.svg';

const AccountCards = () => {
    return (
        <div className="self-stretch inline-flex justify-start items-start gap-6">
            <div className="flex-1 px-6 py-4 bg-white rounded-2xl inline-flex flex-col justify-start items-start gap-4 overflow-hidden">
                <div className="inline-flex justify-start items-start gap-4">
                    <div className="w-12 h-12 p-2.5 bg-violet-100 rounded-[47px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                        <img src={Flechezigzag} alt="Solde" className="w-6 h-6" />
                    </div>
                    <div className="inline-flex flex-col justify-start items-start gap-2">
                        <div className="justify-start text-emerald-950 text-base font-normal font-['Inter'] leading-6">Solde</div>
                        <div className="justify-start text-emerald-950 text-4xl font-bold font-['Inter'] leading-[48px] tracking-tight">1234,56€</div>
                    </div>
                </div>
                <div className="self-stretch h-60 px-4 py-2 bg-white flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                    <div className="w-64 h-32 relative">
                        <div className="w-2 h-2 left-0 top-[118.42px] absolute bg-emerald-950 rounded-full" />
                        <div className="w-2 h-2 left-[43.33px] top-[52.63px] absolute bg-emerald-950 rounded-full" />
                        <div className="w-2 h-2 left-[86.67px] top-[86.84px] absolute bg-emerald-950 rounded-full" />
                        <div className="w-2 h-2 left-[130px] top-[77.89px] absolute bg-emerald-950 rounded-full" />
                        <div className="w-2 h-2 left-[173.33px] top-[85.53px] absolute bg-emerald-950 rounded-full" />
                        <div className="w-2 h-2 left-[216.67px] top-0 absolute bg-emerald-950 rounded-full" />
                        <div className="w-2 h-2 left-[260px] top-[43.42px] absolute bg-emerald-950 rounded-full" />
                        <div className="w-64 h-28 left-[4px] top-[4px] absolute outline outline-2 outline-offset-[-1px] outline-emerald-950" />
                    </div>
                </div>
            </div>
            <div className="flex-1 px-6 py-4 bg-white rounded-2xl inline-flex flex-col justify-start items-start gap-4 overflow-hidden">
                <div className="inline-flex justify-start items-start gap-4">
                    <div className="w-12 h-12 p-2.5 bg-sky-200 rounded-[47px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                        <img src={Flechebasverte} alt="Entrées" className="w-6 h-6" />
                    </div>
                    <div className="inline-flex flex-col justify-start items-start gap-2">
                        <div className="justify-start text-emerald-950 text-base font-normal font-['Inter'] leading-6">Entrées</div>
                        <div className="justify-start text-emerald-950 text-4xl font-bold font-['Inter'] leading-[48px] tracking-tight">1234,56€</div>
                    </div>
                </div>
                <div className="self-stretch h-60 px-4 py-2 bg-white flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                    <div className="w-64 h-32 relative">
                        <div className="w-2 h-2 left-0 top-[118.42px] absolute bg-emerald-400 rounded-full" />
                        <div className="w-2 h-2 left-[43.33px] top-[52.63px] absolute bg-emerald-400 rounded-full" />
                        <div className="w-2 h-2 left-[86.67px] top-[86.84px] absolute bg-emerald-400 rounded-full" />
                        <div className="w-2 h-2 left-[130px] top-[77.89px] absolute bg-emerald-400 rounded-full" />
                        <div className="w-2 h-2 left-[173.33px] top-[85.53px] absolute bg-emerald-400 rounded-full" />
                        <div className="w-2 h-2 left-[216.67px] top-0 absolute bg-emerald-400 rounded-full" />
                        <div className="w-2 h-2 left-[260px] top-[43.42px] absolute bg-emerald-400 rounded-full" />
                        <div className="w-64 h-28 left-[4px] top-[4px] absolute outline outline-2 outline-offset-[-1px] outline-emerald-400" />
                    </div>
                </div>
            </div>
            <div className="flex-1 px-6 py-4 bg-white rounded-2xl inline-flex flex-col justify-start items-start gap-4 overflow-hidden">
                <div className="inline-flex justify-start items-start gap-4">
                    <div className="w-12 h-12 p-2.5 bg-orange-200 rounded-[47px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                        <img src={Flechehautorange} alt="Sorties" className="w-6 h-6" />
                    </div>
                    <div className="inline-flex flex-col justify-start items-start gap-2">
                        <div className="justify-start text-emerald-950 text-base font-normal font-['Inter'] leading-6">Sorties</div>
                        <div className="justify-start text-emerald-950 text-4xl font-bold font-['Inter'] leading-[48px] tracking-tight">1234,56€</div>
                    </div>
                </div>
                <div className="self-stretch h-60 px-4 py-2 bg-white flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                    <div className="w-64 h-32 relative">
                        <div className="w-2 h-2 left-0 top-[118.42px] absolute bg-amber-600 rounded-full" />
                        <div className="w-2 h-2 left-[43.33px] top-[52.63px] absolute bg-amber-600 rounded-full" />
                        <div className="w-2 h-2 left-[86.67px] top-[86.84px] absolute bg-amber-600 rounded-full" />
                        <div className="w-2 h-2 left-[130px] top-[77.89px] absolute bg-amber-600 rounded-full" />
                        <div className="w-2 h-2 left-[173.33px] top-[85.53px] absolute bg-amber-600 rounded-full" />
                        <div className="w-2 h-2 left-[216.67px] top-0 absolute bg-amber-600 rounded-full" />
                        <div className="w-2 h-2 left-[260px] top-[43.42px] absolute bg-amber-600 rounded-full" />
                        <div className="w-64 h-28 left-[4px] top-[4px] absolute outline outline-2 outline-offset-[-1px] outline-amber-600" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountCards;
