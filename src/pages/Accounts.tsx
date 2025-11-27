import { useState } from 'react';
import AccountsHeader from '../components/accounts/AccountsHeader';
import AccountCard from '../components/accounts/AccountCard';
import AddAccountModal from '../components/accounts/AddAccountModal';
import CloseAccountModal from '../components/accounts/CloseAccountModal';

const Accounts = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);

    const accounts = [
        { name: 'Collocation', balance: '1234,56€', iban: 'FR76 1234 4321  0987...' },
        { name: 'Abonnements', balance: '1234,56€', iban: 'FR76 1234 4321  0987...' },
        { name: 'Courses', balance: '1234,56€', iban: 'FR76 1234 4321  0987...' },
        { name: 'Compte principal', balance: '1234,56€', iban: 'FR76 1234 4321  0987...' },
    ];

    return (
        <div className="self-stretch self-stretch px-4 md:px-6 py-12 inline-flex flex-col justify-start items-start gap-12 bg-slate-50 min-h-screen relative">
            <AccountsHeader onAddAccount={() => setIsModalOpen(true)} />
            {isModalOpen && <AddAccountModal onClose={() => setIsModalOpen(false)} />}
            {isCloseModalOpen && <CloseAccountModal onClose={() => setIsCloseModalOpen(false)} />}
            <div className="self-stretch flex-1 inline-flex justify-start items-start gap-6">
                <div className="self-stretch flex-1 inline-flex flex-row flex-wrap justify-start items-start gap-6">
                    {accounts.map((account, index) => (
                        <AccountCard key={index} {...account} onCloseAccount={() => setIsCloseModalOpen(true)} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Accounts;
