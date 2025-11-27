import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Flechezigzag from '../../assets/SVG_Dashboard/Icon-3.svg';

interface CashFlowChartProps {
    data?: any[];
}

const CashFlowChart = ({ data = [] }: CashFlowChartProps) => {
    return (
        <div className="self-stretch px-6 py-4 bg-white rounded-2xl flex flex-col justify-start items-start gap-4 overflow-hidden">
            <div className="w-full inline-flex justify-between items-center">
                <div className="flex justify-start items-center gap-4">
                    <div className="w-12 h-12 p-2.5 bg-violet-100 rounded-[47px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                        <img src={Flechezigzag} alt="Flux" className="w-6 h-6" />
                    </div>
                    <div className="flex-col justify-start items-start gap-2 inline-flex">
                        <div className="justify-start text-emerald-950 text-base font-normal font-['Inter'] leading-6">Flux de trésorerie (7 derniers jours)</div>
                    </div>
                </div>
                <div className="inline-flex justify-start items-start gap-2">
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
            <div className="self-stretch h-60 w-full relative bg-white overflow-hidden">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="day" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0px 4px 12px rgba(0,0,0,0.1)' }}
                            cursor={{ fill: 'transparent' }}
                        />
                        <Bar dataKey="income" fill="#58C5C3" radius={[4, 4, 0, 0]} barSize={20} />
                        <Bar dataKey="expense" fill="#FB923C" radius={[4, 4, 0, 0]} barSize={20} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default CashFlowChart;
