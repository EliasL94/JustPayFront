import React from 'react';

interface ExternalTransferFormProps {
    onBack: () => void;
}

const ExternalTransferForm = ({ onBack }: ExternalTransferFormProps) => {
    return (
        <div className="self-stretch self-stretch px-6 py-12 inline-flex flex-col justify-start items-center gap-12">
            <div className="inline-flex justify-start items-center gap-4">
                <div className="flex justify-start items-center gap-6 flex-wrap content-center">
                    <div className="w-12 h-12 px-3.5 py-0.5 bg-teal-100 rounded-[48px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                        <div className="w-2 h-6 justify-start text-black text-lg font-bold font-['Inter'] leading-6">1</div>
                    </div>
                    <div className="justify-start text-gray-500 text-lg font-bold font-['Inter'] leading-6">Type de virement</div>
                    <div className="w-24 h-0 outline outline-1 outline-offset-[-0.50px] outline-neutral-400"></div>
                </div>
                <div className="w-72 flex justify-start items-center gap-6 flex-wrap content-center">
                    <div className="w-12 h-12 px-3.5 py-0.5 bg-teal-300 rounded-[48px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                        <div className="justify-start text-black text-lg font-bold font-['Inter'] leading-6">2</div>
                    </div>
                    <div className="justify-start text-teal-300 text-lg font-bold font-['Inter'] leading-6">Bénéficiaire</div>
                    <div className="w-24 h-0 outline outline-1 outline-offset-[-0.50px] outline-neutral-400"></div>
                </div>
                <div className="flex justify-start items-center gap-6 flex-wrap content-center">
                    <div className="w-12 h-12 px-3.5 py-0.5 bg-teal-100 rounded-[48px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                        <div className="justify-start text-black text-lg font-bold font-['Inter'] leading-6">4</div>
                    </div>
                    <div className="justify-start text-gray-500 text-lg font-bold font-['Inter'] leading-6">Confirmation</div>
                </div>
            </div>
            <div className="w-[500px] p-6 bg-white rounded-2xl flex flex-col justify-start items-start gap-12 overflow-hidden">
                <div className="justify-start text-emerald-950 text-4xl font-bold font-['Inter'] leading-[48px] tracking-tight">Choisir un bénéficiaire</div>
                <div className="self-stretch flex flex-col justify-start items-start gap-4">
                    <div className="self-stretch flex flex-col justify-start items-start gap-6">
                        <div className="self-stretch flex flex-col justify-start items-start gap-4">
                            <div className="justify-start text-black text-lg font-bold font-['Inter'] leading-6">Compte à débiter</div>
                            <div className="self-stretch bg-white rounded-md outline outline-2 outline-offset-[-2px] outline-slate-300 flex flex-col justify-start items-start overflow-hidden">
                                <div className="self-stretch pl-4 pr-3 py-3 inline-flex justify-start items-center gap-2">
                                    <div className="flex-1 justify-start"><span className="text-emerald-950 text-base font-normal font-['Inter'] leading-6">Compte principal                                           </span><span className="text-neutral-400 text-base font-normal font-['Inter'] leading-6"> 1234,56€</span></div>
                                    <div className="w-6 h-6 relative overflow-hidden">
                                        <div className="w-3.5 h-2 left-[5px] top-[8px] absolute bg-emerald-950" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="self-stretch flex flex-col justify-start items-start gap-4">
                        <div className="justify-start text-black text-lg font-bold font-['Inter'] leading-6">Compte à créditer</div>
                        <div className="self-stretch h-12 relative bg-white rounded-md outline outline-2 outline-offset-[-2px] outline-slate-300">
                            <div className="w-6 h-6 left-[416px] top-[12px] absolute overflow-hidden" />
                            <div className="w-96 left-[12px] top-[12px] absolute justify-start text-emerald-950 text-base font-normal font-['Inter'] leading-6">Rechercher un beneficiaire</div>
                        </div>
                        <div data-icon-left="false" data-icon-right="true" data-label="true" data-size="Large" data-style="Outline" className="self-stretch px-6 py-4 rounded-md outline outline-2 outline-offset-[-2px] outline-emerald-950 inline-flex justify-center items-center gap-2 overflow-hidden">
                            <div className="justify-start text-emerald-950 text-lg font-bold font-['Inter'] leading-6">Ajouter un beneficiaire</div>
                            <div className="w-4 h-6 relative">
                                <div className="w-6 h-6 left-0 top-0 absolute overflow-hidden">
                                    <div className="w-4 h-4 left-[4px] top-[4px] absolute bg-emerald-950" />
                                </div>
                            </div>
                        </div>
                        <div className="self-stretch bg-slate-50 flex flex-col justify-start items-start gap-4">
                            <div className="self-stretch p-6 rounded-2xl flex flex-col justify-start items-start gap-4 overflow-hidden">
                                <div className="self-stretch inline-flex justify-between items-start">
                                    <div className="w-96 justify-start text-emerald-950 text-lg font-normal font-['Inter'] leading-7">Jean Louis David</div>
                                    <div className="w-6 h-6 relative overflow-hidden">
                                        <div className="w-1 h-4 left-[10px] top-[3px] absolute bg-gray-700" />
                                    </div>
                                </div>
                                <div className="self-stretch inline-flex justify-start items-center gap-2.5">
                                    <div className="justify-start text-neutral-400 text-base font-normal font-['Inter'] leading-6">FR76 1234 4321  0987...</div>
                                </div>
                            </div>
                        </div>
                        <div className="self-stretch bg-slate-50 flex flex-col justify-start items-start gap-4">
                            <div className="self-stretch p-6 rounded-2xl flex flex-col justify-start items-start gap-4 overflow-hidden">
                                <div className="self-stretch inline-flex justify-between items-start">
                                    <div className="w-96 justify-start text-emerald-950 text-lg font-normal font-['Inter'] leading-7">Jean Louis David</div>
                                    <div className="w-6 h-6 relative overflow-hidden">
                                        <div className="w-1 h-4 left-[10px] top-[3px] absolute bg-gray-700" />
                                    </div>
                                </div>
                                <div className="self-stretch inline-flex justify-start items-center gap-2.5">
                                    <div className="justify-start text-neutral-400 text-base font-normal font-['Inter'] leading-6">FR76 1234 4321  0987...</div>
                                </div>
                            </div>
                        </div>
                        <div className="self-stretch bg-slate-50 flex flex-col justify-start items-start gap-4">
                            <div className="self-stretch p-6 rounded-2xl flex flex-col justify-start items-start gap-4 overflow-hidden">
                                <div className="self-stretch inline-flex justify-between items-start">
                                    <div className="w-96 justify-start text-emerald-950 text-lg font-normal font-['Inter'] leading-7">Jean Louis David</div>
                                    <div className="w-6 h-6 relative overflow-hidden">
                                        <div className="w-1 h-4 left-[10px] top-[3px] absolute bg-gray-700" />
                                    </div>
                                </div>
                                <div className="self-stretch inline-flex justify-start items-center gap-2.5">
                                    <div className="justify-start text-neutral-400 text-base font-normal font-['Inter'] leading-6">FR76 1234 4321  0987...</div>
                                </div>
                            </div>
                        </div>
                        <div className="self-stretch bg-slate-50 flex flex-col justify-start items-start gap-4">
                            <div className="self-stretch p-6 rounded-2xl flex flex-col justify-start items-start gap-4 overflow-hidden">
                                <div className="self-stretch inline-flex justify-between items-start">
                                    <div className="w-96 justify-start text-emerald-950 text-lg font-normal font-['Inter'] leading-7">Jean Louis David</div>
                                    <div className="w-6 h-6 relative overflow-hidden">
                                        <div className="w-1 h-4 left-[10px] top-[3px] absolute bg-gray-700" />
                                    </div>
                                </div>
                                <div className="self-stretch inline-flex justify-start items-center gap-2.5">
                                    <div className="justify-start text-neutral-400 text-base font-normal font-['Inter'] leading-6">FR76 1234 4321  0987...</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="self-stretch inline-flex justify-between items-start">
                    <div
                        onClick={onBack}
                        data-icon-left="false" data-icon-right="false" data-label="true" data-size="Large" data-style="Outline"
                        className="px-6 py-4 rounded-md outline outline-2 outline-offset-[-2px] outline-emerald-950 flex justify-center items-center gap-2 overflow-hidden cursor-pointer hover:bg-emerald-50 transition-colors"
                    >
                        <div className="justify-start text-emerald-950 text-lg font-bold font-['Inter'] leading-6">Précédent</div>
                    </div>
                    <div data-icon-left="false" data-icon-right="false" data-label="true" data-size="Large" data-style="Solid" className="px-6 py-4 bg-teal-300 rounded-md flex justify-center items-center gap-2 overflow-hidden cursor-pointer hover:bg-teal-400 transition-colors">
                        <div className="justify-start text-emerald-950 text-lg font-bold font-['Inter'] leading-6">Suivant</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExternalTransferForm;
