import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import Flechehautorange from '../../assets/SVG_Dashboard/Icon-4.svg';
import Flechezigzag from '../../assets/SVG_Dashboard/Icon-3.svg';
import Flechebasverte from '../../assets/SVG_Dashboard/Icon-5.svg';

interface AccountCardsProps {
    accounts?: any[];
    transactions?: any[];
    chartData?: any[];
}

const AccountCards = ({ accounts = [], transactions = [], chartData = [] }: AccountCardsProps) => {
    const totalBalance = accounts.reduce((sum, account) => {
        const balance = typeof account.balance === 'string'
            ? parseFloat(account.balance.replace(',', '.').replace('€', ''))
            : account.balance;
        return sum + (isNaN(balance) ? 0 : balance);
    }, 0);

    const formattedBalance = `${totalBalance.toFixed(2).replace('.', ',')}€`;

    // Calculate inflows and outflows
    const inflows = Math.abs(transactions.filter(t => t.amount < 0).reduce((acc, t) => acc + t.amount, 0));
    const outflows = transactions.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0);

    const Sparkline = ({ data, dataKey, color }: { data: any[], dataKey: string, color: string }) => (
        <div className="self-stretch h-32 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id={`color${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                            <stop offset="95%" stopColor={color} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey={dataKey} stroke={color} fillOpacity={1} fill={`url(#color${dataKey})`} strokeWidth={2} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );

    return (
        <div className="self-stretch inline-flex justify-start items-start gap-6">
            <div className="flex-1 px-6 py-4 bg-white rounded-2xl inline-flex flex-col justify-start items-start gap-4 overflow-hidden">
                <div className="inline-flex justify-start items-start gap-4">
                    <div className="w-12 h-12 p-2.5 bg-violet-100 rounded-[47px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                        <img src={Flechezigzag} alt="Solde" className="w-6 h-6" />
                    </div>
                    <div className="inline-flex flex-col justify-start items-start gap-2">
                        <div className="justify-start text-emerald-950 text-base font-normal font-['Inter'] leading-6">Solde</div>
                        <div className="justify-start text-emerald-950 text-4xl font-bold font-['Inter'] leading-[48px] tracking-tight">{formattedBalance}</div>
                    </div>
                </div>
                <Sparkline data={chartData} dataKey="net" color="#8B5CF6" />
            </div>
            <div className="flex-1 px-6 py-4 bg-white rounded-2xl inline-flex flex-col justify-start items-start gap-4 overflow-hidden">
                <div className="inline-flex justify-start items-start gap-4">
                    <div className="w-12 h-12 p-2.5 bg-sky-200 rounded-[47px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                        <img src={Flechebasverte} alt="Entrées" className="w-6 h-6" />
                    </div>
                    <div className="inline-flex flex-col justify-start items-start gap-2">
                        <div className="justify-start text-emerald-950 text-base font-normal font-['Inter'] leading-6">Entrées</div>
                        <div className="justify-start text-emerald-950 text-4xl font-bold font-['Inter'] leading-[48px] tracking-tight">{inflows.toFixed(2).replace('.', ',')}€</div>
                    </div>
                </div>
                <Sparkline data={chartData} dataKey="income" color="#58C5C3" />
            </div>
            <div className="flex-1 px-6 py-4 bg-white rounded-2xl inline-flex flex-col justify-start items-start gap-4 overflow-hidden">
                <div className="inline-flex justify-start items-start gap-4">
                    <div className="w-12 h-12 p-2.5 bg-orange-200 rounded-[47px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                        <img src={Flechehautorange} alt="Sorties" className="w-6 h-6" />
                    </div>
                    <div className="inline-flex flex-col justify-start items-start gap-2">
                        <div className="justify-start text-emerald-950 text-base font-normal font-['Inter'] leading-6">Sorties</div>
                        <div className="justify-start text-emerald-950 text-4xl font-bold font-['Inter'] leading-[48px] tracking-tight">{outflows.toFixed(2).replace('.', ',')}€</div>
                    </div>
                </div>
                <Sparkline data={chartData} dataKey="expense" color="#FB923C" />
            </div>
        </div>
    );
};

export default AccountCards;
