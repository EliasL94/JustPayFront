import IconDownload from '../../assets/SVG_Dashboard/Icon-3.svg'; // Placeholder for download
import IconChevronDown from '../../assets/SVG_Dashboard/icon-chevron-up.svg'; // Placeholder for chevron down

const TransactionsHeader = () => {
    return (
        <div className="self-stretch inline-flex justify-between items-start">
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-2.5">
                <div className="justify-start text-emerald-950 text-4xl font-bold font-['Inter'] leading-[48px] tracking-tight">Vos transactions</div>
                <div className="justify-start text-neutral-400 text-lg font-normal font-['Inter'] leading-7">Gérer tout l’historique de vos transactions</div>
            </div>
            <div className="flex justify-start items-center gap-2.5">
                {/* Account Filter */}
                <div className="w-56 inline-flex flex-col justify-start items-start">
                    <div className="self-stretch flex flex-col justify-start items-start gap-2">
                        <div className="self-stretch bg-white rounded-md outline outline-2 outline-offset-[-2px] outline-slate-300 flex flex-col justify-start items-start overflow-hidden">
                            <div className="self-stretch pl-4 pr-3 py-3 inline-flex justify-start items-center gap-2 cursor-pointer">
                                <div className="flex-1 justify-start text-emerald-950 text-base font-normal font-['Inter'] leading-6">Tous mes comptes</div>
                                <div className="w-6 h-6 relative overflow-hidden flex justify-center items-center">
                                    <img src={IconChevronDown} alt="Down" className="w-3.5 h-2" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Date Filter */}
                <div className="w-48 inline-flex flex-col justify-start items-start">
                    <div className="self-stretch flex flex-col justify-start items-start gap-2">
                        <div className="self-stretch bg-white rounded-md outline outline-2 outline-offset-[-2px] outline-slate-300 flex flex-col justify-start items-start overflow-hidden">
                            <div className="self-stretch pl-4 pr-3 py-3 inline-flex justify-start items-center gap-2 cursor-pointer">
                                <div className="flex-1 justify-start text-emerald-950 text-base font-normal font-['Inter'] leading-6">Janvier 2025</div>
                                <div className="w-6 h-6 relative overflow-hidden flex justify-center items-center">
                                    <img src={IconChevronDown} alt="Down" className="w-3.5 h-2" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Download Button */}
                <div className="px-6 py-4 rounded-md outline outline-2 outline-offset-[-2px] outline-emerald-950 flex justify-center items-center gap-2 overflow-hidden cursor-pointer hover:bg-emerald-50 transition-colors">
                    <div className="justify-start text-emerald-950 text-lg font-bold font-['Inter'] leading-6">Télécharger un relevé</div>
                    <div className="w-4 h-6 relative flex justify-center items-center">
                        <img src={IconDownload} alt="Download" className="w-5 h-5" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionsHeader;
