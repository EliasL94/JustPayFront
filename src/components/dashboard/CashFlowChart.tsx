import Flechezigzag from '../../assets/SVG_Dashboard/Icon-3.svg';


const CashFlowChart = () => {
    return (
        <div className="self-stretch px-6 py-4 bg-white rounded-2xl flex flex-col justify-start items-start gap-4 overflow-hidden">
            <div className="w-56 inline-flex justify-start items-start gap-4">
                <div className="w-12 h-12 p-2.5 bg-violet-100 rounded-[47px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                    <img src={Flechezigzag} alt="Flux" className="w-6 h-6" />
                </div>
                <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
                    <div className="justify-start text-emerald-950 text-base font-normal font-['Inter'] leading-6">Flux de trésorerie</div>
                    <div className="inline-flex justify-start items-start gap-2">
                        <div className="flex justify-center items-center gap-2.5">
                            <div className="w-3.5 h-3.5 bg-violet-500 rounded-full" />
                            <div className="justify-start text-emerald-950 text-base font-normal font-['Inter'] leading-6">Solde</div>
                        </div>
                        <div className="flex justify-center items-center gap-2.5">
                            <div className="w-3.5 h-3.5 bg-teal-300 rounded-full" />
                            <div className="justify-start text-emerald-950 text-base font-normal font-['Inter'] leading-6">Entrées</div>
                        </div>
                        <div className="flex justify-center items-center gap-2.5">
                            <div className="w-3.5 h-3.5 bg-orange-400 rounded-full" />
                            <div className="justify-start text-emerald-950 text-base font-normal font-['Inter'] leading-6">Sorties</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="self-stretch h-60 px-4 py-2 relative bg-white flex flex-col justify-end items-center gap-2.5 overflow-hidden">
                <div className="self-stretch p-2.5 inline-flex justify-between items-center">
                    <div className="h-24 flex justify-start items-end gap-2">
                        <div className="w-7 h-24 bg-teal-300" />
                        <div className="w-7 h-16 bg-orange-400" />
                    </div>
                    <div className="h-24 flex justify-start items-end gap-2">
                        <div className="w-7 h-20 bg-teal-300" />
                        <div className="w-7 h-8 bg-orange-400" />
                    </div>
                    <div className="h-24 flex justify-start items-end gap-2">
                        <div className="w-7 h-20 bg-teal-300" />
                        <div className="w-7 h-24 bg-orange-400" />
                    </div>
                    <div className="h-24 flex justify-start items-end gap-2">
                        <div className="w-7 h-20 bg-teal-300" />
                        <div className="w-7 h-5 bg-orange-400" />
                    </div>
                    <div className="h-24 flex justify-start items-end gap-2">
                        <div className="w-7 h-32 bg-teal-300" />
                        <div className="w-7 h-16 bg-orange-400" />
                    </div>
                    <div className="h-24 flex justify-start items-end gap-2">
                        <div className="w-7 h-28 bg-teal-300" />
                        <div className="w-7 h-10 bg-orange-400" />
                    </div>
                    <div className="h-24 flex justify-start items-end gap-2">
                        <div className="w-7 h-24 bg-teal-300" />
                        <div className="w-7 h-8 bg-orange-400" />
                    </div>
                    <div className="h-24 flex justify-start items-end gap-2">
                        <div className="w-7 h-20 bg-teal-300" />
                        <div className="w-7 h-16 bg-orange-400" />
                    </div>
                    <div className="h-24 flex justify-start items-end gap-2">
                        <div className="w-7 h-32 bg-teal-300" />
                        <div className="w-7 h-16 bg-orange-400" />
                    </div>
                    <div className="h-24 flex justify-start items-end gap-2">
                        <div className="w-7 h-24 bg-teal-300" />
                        <div className="w-7 h-20 bg-orange-400" />
                    </div>
                    <div className="h-24 flex justify-start items-end gap-2">
                        <div className="w-7 h-24 bg-teal-300" />
                        <div className="w-7 h-28 bg-orange-400" />
                    </div>
                    <div className="h-24 flex justify-start items-end gap-2">
                        <div className="w-7 h-32 bg-teal-300" />
                        <div className="w-7 h-16 bg-orange-400" />
                    </div>
                </div>
                <div className="w-[1237.56px] h-32 left-[10.69px] top-[56.23px] absolute outline outline-2 outline-offset-[-1px] outline-violet-500" />
            </div>
        </div>
    );
};

export default CashFlowChart;
