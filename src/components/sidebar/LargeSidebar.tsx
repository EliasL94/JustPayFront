import { useNavigate } from 'react-router-dom';
import IconDashboard from '../../assets/SVG_Sidebar/home-02.svg';
import IconAccounts from '../../assets/SVG_Sidebar/bank-card-line.svg';
import IconTransactions from '../../assets/SVG_Sidebar/icon-list.svg';
import IconTransfers from '../../assets/SVG_Sidebar/icon-send.svg';
import IconBeneficiaries from '../../assets/SVG_Sidebar/icon-user-plus.svg';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const LargeSidebar = ({ isOpen, onClose }: SidebarProps) => {
    const navigate = useNavigate();

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
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-40 flex">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/20" onClick={onClose}></div>

            {/* Sidebar Content */}
            <div className="relative w-64 h-full bg-white shadow-xl border-r border-emerald-50 flex flex-col justify-between items-start p-4 gap-4 z-50 animate-in slide-in-from-left duration-300">
                <div className="self-stretch flex flex-col justify-start items-start gap-3">
                    <div className="self-stretch flex flex-col justify-start items-start gap-0.5">
                        {menuItems.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => {
                                    navigate(item.path);
                                    onClose();
                                }}
                                className="self-stretch px-3 py-2 rounded-md inline-flex justify-start items-center gap-3 cursor-pointer hover:bg-emerald-50 transition-colors"
                            >
                                <div className="w-5 h-5 relative overflow-hidden flex justify-center items-center">
                                    <img src={item.icon} alt={item.label} className="w-4 h-4" />
                                </div>
                                <div className="justify-center text-emerald-950 text-sm font-semibold font-['Inter'] leading-5">{item.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="self-stretch flex flex-col justify-start items-start gap-3 mb-4">
                    <div
                        onClick={handleLogout}
                        className="self-stretch px-3 py-2 rounded-md inline-flex justify-start items-center gap-3 cursor-pointer hover:bg-red-50 transition-colors"
                    >
                        <div className="w-5 h-5 relative overflow-hidden flex justify-center items-center">
                            <img src={IconTransfers} alt="Se déconnecter" className="w-4 h-4 rotate-180" style={{ filter: 'invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)' }} />
                        </div>
                        <div className="justify-center text-red-600 text-sm font-semibold font-['Inter'] leading-5">Se déconnecter</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LargeSidebar;
