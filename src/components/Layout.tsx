import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import LargeSidebar from './sidebar/LargeSidebar';
import MiniSidebar from './sidebar/MiniSidebar';
import './Layout.css';

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="layout-container">
            <Header onMenuClick={() => setIsSidebarOpen(true)} />
            <LargeSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <MiniSidebar />
            <main className="layout-main md:ml-14">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
