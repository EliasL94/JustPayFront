import { useNavigate } from 'react-router-dom';
import cadie from '../../assets/SVG_Dashboard/Icon-1.svg';

interface RecentTransactionsProps {
    transactions?: any[];
    accounts?: any[];
    beneficiaries?: any[];
}

const RecentTransactions = ({ transactions = [], accounts = [], beneficiaries = [] }: RecentTransactionsProps) => {
    const navigate = useNavigate();

    const getTransactionName = (tx: any) => {
        if (tx.beneficiary && tx.beneficiary !== 'Inconnu') return tx.beneficiary;

        let otherAccountNumber = '';
        if (tx.amount > 0) {
            otherAccountNumber = tx.beneficiary_account_number;
        } else {
            otherAccountNumber = tx.account_number;
        }

        if (!otherAccountNumber) return tx.label || tx.description || 'Inconnu';

        const beneficiary = beneficiaries.find(b => b.account_number === otherAccountNumber);
        if (beneficiary) return beneficiary.name;

        const account = accounts.find(a => a.account_number === otherAccountNumber);
        if (account) {
            return account.name || (account.type === 'primary' ? 'Compte Principal' : 'Compte Secondaire');
        }

        return tx.label || tx.description || 'Inconnu';
    };

    return (
        <div className="w-[914px] px-6 py-4 bg-white rounded-2xl inline-flex flex-col justify-start items-start gap-8 overflow-hidden">
            <div className="self-stretch inline-flex justify-between items-center">
                <div className="justify-start text-emerald-950 text-2xl font-bold font-['Inter'] leading-8">Transactions récentes</div>
                <div
                    onClick={() => navigate('/transactions')}
                    data-icon-left="false" data-icon-right="false" data-label="true" data-size="Large" data-style="Solid"
                    className="px-4 py-3 bg-teal-300 rounded flex justify-center items-center gap-1.5 overflow-hidden cursor-pointer hover:bg-teal-400 transition-colors"
                >
                    <div className="justify-start text-teal-950 text-sm font-bold font-['Inter'] leading-4">Toutes les transactions</div>
                </div>
            </div>
            <div className="self-stretch flex flex-col justify-start items-start gap-6">
                {transactions.length === 0 ? (
                    <div className="text-gray-500">Aucune transaction récente.</div>
                ) : (
                    transactions.slice(0, 5).map((transaction, index) => (
                        <div key={index} className="self-stretch h-auto min-h-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="flex-1 flex justify-start items-start gap-6">
                                <div className="w-12 h-12 p-2.5 bg-neutral-400 rounded-[47px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden shrink-0">
                                    <img src={cadie} alt="Transaction" className="w-6 h-6" />
                                </div>
                                <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
                                    <div className="self-stretch justify-start text-emerald-950 text-lg font-normal font-['Inter'] leading-7">{getTransactionName(transaction)}</div>
                                    <div className="self-stretch justify-start text-neutral-400 text-base font-normal font-['Inter'] leading-6">{transaction.type || 'Paiement'}</div>
                                </div>
                            </div>
                            <div className={`justify-start text-xl font-normal font-['Inter'] leading-9 whitespace-nowrap ${transaction.amount > 0 ? 'text-red-500' : 'text-teal-300'}`}>
                                {transaction.amount > 0 ? '-' : '+'}{Math.abs(transaction.amount)} €
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default RecentTransactions;
