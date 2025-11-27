import TransactionsHeader from '../components/transactions/TransactionsHeader';
import TransactionsList from '../components/transactions/TransactionsList';
import TransactionsStats from '../components/transactions/TransactionsStats';

const Transactions = () => {
    return (
        <div className="w-full h-full bg-slate-50 min-h-screen px-4 md:px-6 py-12">
            <div className="flex flex-col gap-12">
                <TransactionsHeader />
                <div className="flex justify-start items-start gap-6">
                    <TransactionsList />
                    <TransactionsStats />
                </div>
            </div>
        </div>
    );
};

export default Transactions;
