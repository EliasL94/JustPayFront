import DashboardHeader from '../components/dashboard/DashboardHeader';
import AccountCards from '../components/dashboard/AccountCards';
import CashFlowChart from '../components/dashboard/CashFlowChart';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import Shortcuts from '../components/dashboard/Shortcuts';

const Dashboard = () => {
    return (
        <div className="self-stretch self-stretch px-6 py-12 inline-flex flex-col justify-start items-start gap-12">
            <DashboardHeader />
            <AccountCards />
            <CashFlowChart />
            <div className="self-stretch inline-flex justify-start items-start gap-6">
                <RecentTransactions />
                <Shortcuts />
            </div>
        </div>
    );
};

export default Dashboard;
