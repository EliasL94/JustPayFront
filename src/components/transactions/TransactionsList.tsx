
const TransactionsList = () => {
    return (
        <div className="w-[914px] self-stretch px-6 py-4 bg-white rounded-2xl inline-flex flex-col justify-start items-center gap-8 overflow-hidden border border-gray-100 shadow-sm">
            {/* Tabs */}
            <div className="self-stretch border-b-2 border-slate-300 inline-flex justify-start items-start gap-6">
                <div className="self-stretch py-3 border-b-2 border-emerald-950 flex justify-start items-center gap-2 cursor-pointer">
                    <div className="w-4 h-4 relative overflow-hidden bg-emerald-950 rounded-full"></div>
                    <div className="text-center justify-start text-emerald-950 text-base font-bold font-['Inter'] leading-6">Transactions</div>
                </div>
                <div className="self-stretch py-3 flex justify-start items-center gap-2 cursor-pointer">
                    <div className="w-4 h-4 relative overflow-hidden bg-neutral-400 rounded-full"></div>
                    <div className="text-center justify-start text-neutral-400 text-base font-bold font-['Inter'] leading-6">Recettes</div>
                </div>
                <div className="self-stretch py-3 flex justify-start items-center gap-2 cursor-pointer">
                    <div className="w-4 h-4 relative overflow-hidden bg-neutral-400 rounded-full"></div>
                    <div className="text-center justify-start text-neutral-400 text-base font-bold font-['Inter'] leading-6">Dépenses</div>
                </div>
            </div>

            {/* Group: En cours */}
            <div className="self-stretch flex flex-col justify-start items-start gap-6">
                <div className="justify-start text-neutral-400 text-lg font-normal font-['Inter'] leading-7">En cours</div>
                <div className="self-stretch flex flex-col justify-start items-start gap-6">
                    <div className="self-stretch h-12 inline-flex justify-between items-start">
                        <div className="flex-1 flex justify-start items-start gap-6">
                            <div className="w-12 h-12 p-2.5 bg-neutral-400 rounded-[47px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                                <div className="w-6 h-6 relative overflow-hidden bg-white rounded-full"></div>
                            </div>
                            <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
                                <div className="self-stretch h-5 justify-start text-emerald-950 text-lg font-normal font-['Inter'] leading-7">Virement sepa inst reçu</div>
                                <div className="self-stretch h-4 justify-start text-neutral-400 text-base font-normal font-['Inter'] leading-6">Virement</div>
                            </div>
                        </div>
                        <div className="justify-start text-teal-300 text-xl font-normal font-['Inter'] leading-9">+ 100 €</div>
                    </div>
                </div>
            </div>

            {/* Group: 10/11/2024 */}
            <div className="self-stretch flex flex-col justify-start items-start gap-6">
                <div className="justify-start text-neutral-400 text-lg font-normal font-['Inter'] leading-7">10/11/2024</div>
                <div className="self-stretch flex flex-col justify-start items-start gap-6">
                    <div className="self-stretch h-12 inline-flex justify-between items-start">
                        <div className="flex-1 flex justify-start items-start gap-6">
                            <div className="w-12 h-12 p-2.5 bg-neutral-400 rounded-[47px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                                <div className="w-6 h-6 relative overflow-hidden bg-white rounded-full"></div>
                            </div>
                            <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
                                <div className="self-stretch h-5 justify-start text-emerald-950 text-lg font-normal font-['Inter'] leading-7">Compte courant</div>
                                <div className="self-stretch h-4 justify-start text-neutral-400 text-base font-normal font-['Inter'] leading-6">Paiement par carte</div>
                            </div>
                        </div>
                        <div className="justify-start text-teal-300 text-xl font-normal font-['Inter'] leading-9">+9,99 €</div>
                    </div>
                    <div className="self-stretch h-12 inline-flex justify-between items-center">
                        <div className="flex-1 flex justify-start items-start gap-6">
                            <div className="w-12 h-12 p-2.5 bg-neutral-400 rounded-[47px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                                <div className="w-6 h-6 relative overflow-hidden bg-white rounded-full"></div>
                            </div>
                            <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
                                <div className="self-stretch h-5 justify-start text-emerald-950 text-lg font-normal font-['Inter'] leading-7">Compte epargne</div>
                                <div className="self-stretch h-4 justify-start text-neutral-400 text-base font-normal font-['Inter'] leading-6">Paiement par carte</div>
                            </div>
                        </div>
                        <div className="justify-start text-orange-400 text-xl font-normal font-['Inter'] leading-9">-9,99 €</div>
                    </div>
                </div>
            </div>

            {/* Pagination */}
            <div className="inline-flex justify-start items-start gap-3 mt-4">
                <div className="self-stretch px-5 bg-emerald-50 rounded-[5px] flex justify-center items-center gap-2 cursor-pointer">
                    <div className="text-teal-300 font-bold">&lt;</div>
                </div>
                <div className="flex justify-start items-start">
                    <div className="py-3 bg-teal-300 rounded-[5px] flex justify-center items-center gap-2 w-11 cursor-pointer">
                        <div className="text-center justify-start text-white text-sm font-medium font-['Inter'] leading-5">01</div>
                    </div>
                    <div className="py-3 rounded-[5px] flex justify-center items-center gap-2 w-11 cursor-pointer hover:bg-slate-100">
                        <div className="text-center justify-start text-slate-600 text-sm font-medium font-['Inter'] leading-5">02</div>
                    </div>
                    <div className="py-3 rounded-[5px] flex justify-center items-center gap-2 w-11">
                        <div className="text-center justify-start text-gray-500 text-sm font-medium font-['Inter'] leading-5">...</div>
                    </div>
                    <div className="py-3 rounded-[5px] flex justify-center items-center gap-2 w-11 cursor-pointer hover:bg-slate-100">
                        <div className="text-center justify-start text-slate-600 text-sm font-medium font-['Inter'] leading-5">05</div>
                    </div>
                </div>
                <div className="self-stretch px-5 bg-emerald-50 rounded-[5px] flex justify-center items-center gap-2 cursor-pointer">
                    <div className="text-teal-300 font-bold">&gt;</div>
                </div>
            </div>
        </div>
    );
};

export default TransactionsList;
