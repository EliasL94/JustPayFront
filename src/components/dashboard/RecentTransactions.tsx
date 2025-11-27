import Flechebasgauche from '../../assets/SVG_Dashboard/Icon-1.svg';
import cadie from '../../assets/SVG_Dashboard/Icon.svg';

const RecentTransactions = () => {
    return (
        <div className="w-[914px] px-6 py-4 bg-white rounded-2xl inline-flex flex-col justify-start items-start gap-8 overflow-hidden">
            <div className="self-stretch inline-flex justify-between items-center">
                <div className="justify-start text-emerald-950 text-2xl font-bold font-['Inter'] leading-8">Transactions récentes</div>
                <div data-icon-left="false" data-icon-right="false" data-label="true" data-size="Large" data-style="Solid" className="px-4 py-3 bg-teal-300 rounded flex justify-center items-center gap-1.5 overflow-hidden">
                    <div className="justify-start text-teal-950 text-sm font-bold font-['Inter'] leading-4">Toutes les transactions</div>
                </div>
            </div>
            <div className="self-stretch flex flex-col justify-start items-start gap-6">
                <div className="justify-start text-neutral-400 text-lg font-normal font-['Inter'] leading-7">En cours</div>
                <div className="self-stretch flex flex-col justify-start items-start gap-6">
                    <div className="self-stretch h-auto min-h-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex-1 flex justify-start items-start gap-6">
                            <div className="w-12 h-12 p-2.5 bg-neutral-400 rounded-[47px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden shrink-0">
                                <img src={Flechebasgauche} alt="Transaction" className="w-6 h-6" />
                            </div>
                            <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
                                <div className="self-stretch justify-start text-emerald-950 text-lg font-normal font-['Inter'] leading-7">Virement sepa inst reçu</div>
                                <div className="self-stretch justify-start text-neutral-400 text-base font-normal font-['Inter'] leading-6">Virement</div>
                            </div>
                        </div>
                        <div className="justify-start text-teal-300 text-xl font-normal font-['Inter'] leading-9 whitespace-nowrap">+ 100 €</div>
                    </div>
                </div>
            </div>
            <div className="self-stretch flex flex-col justify-start items-start gap-6">
                <div className="justify-start text-neutral-400 text-lg font-normal font-['Inter'] leading-7">10/11/2024</div>
                <div className="self-stretch flex flex-col justify-start items-start gap-6">
                    <div className="self-stretch h-auto min-h-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex-1 flex justify-start items-start gap-6">
                            <div className="w-12 h-12 p-2.5 bg-neutral-400 rounded-[47px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden shrink-0">
                                <img src={cadie} alt="Transaction" className="w-6 h-6" />
                            </div>
                            <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
                                <div className="self-stretch justify-start text-emerald-950 text-lg font-normal font-['Inter'] leading-7">Compte courant</div>
                                <div className="self-stretch justify-start text-neutral-400 text-base font-normal font-['Inter'] leading-6">Paiement par carte</div>
                            </div>
                        </div>
                        <div className="justify-start text-teal-300 text-xl font-normal font-['Inter'] leading-9 whitespace-nowrap">+9,99 €</div>
                    </div>
                    <div className="self-stretch h-auto min-h-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex-1 flex justify-start items-start gap-6">
                            <div className="w-12 h-12 p-2.5 bg-neutral-400 rounded-[47px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden shrink-0">
                                <img src={cadie} alt="Transaction" className="w-6 h-6" />
                            </div>
                            <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
                                <div className="self-stretch justify-start text-emerald-950 text-lg font-normal font-['Inter'] leading-7">Compte epargne</div>
                                <div className="self-stretch justify-start text-neutral-400 text-base font-normal font-['Inter'] leading-6">Paiement par carte</div>
                            </div>
                        </div>
                        <div className="justify-start text-orange-400 text-xl font-normal font-['Inter'] leading-9 whitespace-nowrap">-9,99 €</div>
                    </div>
                    <div className="self-stretch h-auto min-h-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex-1 flex justify-start items-start gap-6">
                            <div className="w-12 h-12 p-2.5 bg-neutral-400 rounded-[47px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden shrink-0">
                                <img src={cadie} alt="Transaction" className="w-6 h-6" />
                            </div>
                            <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
                                <div className="self-stretch justify-start text-emerald-950 text-lg font-normal font-['Inter'] leading-7">Amazon</div>
                                <div className="self-stretch justify-start text-neutral-400 text-base font-normal font-['Inter'] leading-6">Paiement par carte</div>
                            </div>
                        </div>
                        <div className="justify-start text-orange-400 text-xl font-normal font-['Inter'] leading-9 whitespace-nowrap">-2,99 €</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecentTransactions;
