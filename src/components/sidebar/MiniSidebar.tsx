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

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        navigate('/login');
    };

    return (
        <div data-propriété-1="Closed" className="w-14 h-full px-2 py-4 bg-white shadow-[0px_4px_6px_-2px_rgba(13,13,18,0.03)] shadow-[0px_12px_16px_-4px_rgba(13,13,18,0.08)] border-r border-emerald-50 inline-flex flex-col justify-between items-start overflow-hidden fixed left-0 top-0 pt-20 z-30 hidden md:inline-flex">
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
                                    title={item.label}
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
            <div className="self-stretch flex flex-col justify-start items-center gap-3 mb-4">
                <div
                    onClick={handleLogout}
                    className="self-stretch px-3 py-2.5 rounded-md inline-flex justify-center items-center gap-3 cursor-pointer hover:bg-red-50 transition-colors"
                    title="Se déconnecter"
                >
                    <div className="w-5 h-5 relative overflow-hidden flex justify-center items-center">
                        {/* Using IconTransfers rotated as a logout placeholder */}
                        <img src={IconTransfers} alt="Se déconnecter" className="w-4 h-4 rotate-180 text-red-500" style={{ filter: 'invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)' }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MiniSidebar;
