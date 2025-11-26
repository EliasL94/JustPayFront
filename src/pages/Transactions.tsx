import TransactionsHeader from '../components/transactions/TransactionsHeader';
import TransactionsList from '../components/transactions/TransactionsList';
import TransactionsStats from '../components/transactions/TransactionsStats';

const Transactions = () => {
    return (
        <div className="w-full h-full inline-flex justify-start items-start gap-6 bg-slate-50 min-h-screen">
            <div className="self-stretch px-4 md:px-6 py-12 inline-flex flex-col justify-start items-start gap-12 w-full">
                <TransactionsHeader />
                <div className="self-stretch flex-1 flex flex-col lg:flex-row justify-start items-start gap-6">
                    <TransactionsList />
                    <TransactionsStats />
                </div>
            </div>
        </div>
    );
};

export default Transactions;
