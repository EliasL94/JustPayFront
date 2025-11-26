import Flechebasbleu from '../../assets/SVG_Dashboard/Icon-2.svg';


const DashboardHeader = () => {
    return (
        <div className="self-stretch inline-flex justify-between items-start">
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-2.5">
                <div className="justify-start text-emerald-950 text-4xl font-bold font-['Inter'] leading-[48px] tracking-tight">Bonjour Alex</div>
                <div className="justify-start text-neutral-400 text-lg font-normal font-['Inter'] leading-7">17 nov. 2025</div>
            </div>
            <div className="w-[704px] h-14" />
            <div className="flex justify-start items-center gap-2.5">
                <div data-label="False" data-open="False" className="w-56 inline-flex flex-col justify-start items-start">
                    <div className="self-stretch flex flex-col justify-start items-start gap-2">
                        <div className="self-stretch bg-white rounded-md outline outline-2 outline-offset-[-2px] outline-slate-300 flex flex-col justify-start items-start overflow-hidden">
                            <div className="self-stretch pl-4 pr-3 py-3 inline-flex justify-start items-center gap-2">
                                <div className="flex-1 justify-start text-emerald-950 text-base font-normal font-['Inter'] leading-6">Tous mes comptes</div>
                                <div className="w-6 h-6 relative overflow-hidden flex justify-center items-center">
                                    <img src={Flechebasbleu} alt="Chevron" className="w-3.5 h-2" />
                                </div>
                            </div>
                        </div>
                    </div>
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
