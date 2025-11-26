import IconIncome from '../../assets/SVG_Dashboard/icon-plus.svg'; // Placeholder for income
import IconOutcome from '../../assets/SVG_Dashboard/icon-send.svg'; // Placeholder for outcome
import IconTransactions from '../../assets/SVG_Sidebar/icon-list.svg';

const TransactionsStats = () => {
    return (
        <div className="flex-1 inline-flex flex-col justify-start items-start gap-6">
            <div className="self-stretch px-6 py-4 bg-white rounded-2xl inline-flex justify-start items-start gap-4 overflow-hidden border border-gray-100 shadow-sm">
                <div className="w-12 h-12 p-2.5 bg-sky-200 rounded-[47px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                    <div className="w-6 h-6 relative overflow-hidden flex justify-center items-center">
                        <img src={IconIncome} alt="Income" className="w-4 h-4" />
                    </div>
                </div>
                <div className="inline-flex flex-col justify-start items-start gap-2">
                    <div className="justify-start text-emerald-950 text-base font-normal font-['Inter'] leading-6">Entrées</div>
                    <div className="justify-start text-emerald-950 text-4xl font-bold font-['Inter'] leading-[48px] tracking-tight">1234,56€</div>
                </div>
            </div>
            <div className="self-stretch px-6 py-4 bg-white rounded-2xl inline-flex justify-start items-start gap-4 overflow-hidden border border-gray-100 shadow-sm">
                <div className="w-12 h-12 p-2.5 bg-orange-200 rounded-[47px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                    <div className="w-6 h-6 relative overflow-hidden flex justify-center items-center">
                        <img src={IconOutcome} alt="Outcome" className="w-4 h-4" />
                    </div>
                </div>
                <div className="inline-flex flex-col justify-start items-start gap-2">
                    <div className="justify-start text-emerald-950 text-base font-normal font-['Inter'] leading-6">Sorties</div>
                    <div className="justify-start text-emerald-950 text-4xl font-bold font-['Inter'] leading-[48px] tracking-tight">168,24€</div>
                </div>
            </div>
            <div className="self-stretch px-6 py-4 bg-white rounded-2xl inline-flex justify-start items-start gap-4 overflow-hidden border border-gray-100 shadow-sm">
                <div className="w-12 h-12 p-2.5 bg-violet-100 rounded-[47px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                    <div className="w-6 h-6 relative overflow-hidden flex justify-center items-center">
                        <img src={IconTransactions} alt="Transactions" className="w-5 h-3.5" />
                    </div>
                </div>
                <div className="inline-flex flex-col justify-start items-start gap-2">
                    <div className="justify-start text-emerald-950 text-base font-normal font-['Inter'] leading-6">Transactions</div>
                    <div className="justify-start text-emerald-950 text-4xl font-bold font-['Inter'] leading-[48px] tracking-tight">26</div>
                </div>
            </div>
        </div>
    );
};

export default TransactionsStats;
