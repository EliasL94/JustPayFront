import { useNavigate, useLocation } from 'react-router-dom';
import IconDashboard from '../../assets/SVG_Sidebar/home-02.svg';
import IconAccounts from '../../assets/SVG_Sidebar/bank-card-line.svg';
import IconTransactions from '../../assets/SVG_Sidebar/icon-list.svg';
import IconTransfers from '../../assets/SVG_Sidebar/icon-send.svg';
import IconBeneficiaries from '../../assets/SVG_Sidebar/icon-user-plus.svg';

const MiniSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { label: 'Dashboard', icon: IconDashboard, path: '/dashboard' },
        { label: 'Mes comptes', icon: IconAccounts, path: '/accounts' },
        { label: 'Transactions', icon: IconTransactions, path: '/transactions' },
        { label: 'Virements', icon: IconTransfers, path: '/transfer' },
        { label: 'Beneficiares', icon: IconBeneficiaries, path: '/beneficiaries' },
    ];

    return (
        <div data-propriété-1="Closed" className="w-14 h-full px-2 py-4 bg-white shadow-[0px_4px_6px_-2px_rgba(13,13,18,0.03)] shadow-[0px_12px_16px_-4px_rgba(13,13,18,0.08)] border-r border-emerald-50 inline-flex flex-col justify-start items-start gap-36 overflow-hidden fixed left-0 top-0 pt-20 z-30 hidden md:inline-flex">
            <div className="self-stretch flex flex-col justify-start items-start gap-4">
                <div className="self-stretch flex flex-col justify-start items-center gap-3">
                    <div className="self-stretch flex flex-col justify-start items-start gap-0.5">
                        {menuItems.map((item, index) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <div
                                    key={index}
                                    onClick={() => navigate(item.path)}
                                    className={`self-stretch px-3 py-2.5 rounded-md inline-flex justify-center items-center gap-3 cursor-pointer transition-colors ${isActive ? 'bg-teal-300' : 'hover:bg-emerald-50'}`}
                                >
                                    <div className="w-5 h-5 relative overflow-hidden flex justify-center items-center">
                                        <img src={item.icon} alt={item.label} className="w-4 h-4" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MiniSidebar;
