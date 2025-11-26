import DashboardHeader from '../components/dashboard/DashboardHeader';
import AccountCards from '../components/dashboard/AccountCards';
import CashFlowChart from '../components/dashboard/CashFlowChart';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import Shortcuts from '../components/dashboard/Shortcuts';

const Dashboard = () => {
    return (
        <div className="w-full px-4 md:px-6 py-12 flex flex-col justify-start items-start gap-12 bg-slate-50 min-h-screen">
            <DashboardHeader />
            <AccountCards />
            <CashFlowChart />
            <div className="w-full flex flex-col lg:flex-row justify-start items-start gap-6">
                <RecentTransactions />
                <Shortcuts />
            </div>
        </div>
    );
};

export default Dashboard;
