import { useNavigate } from 'react-router-dom';

interface RecentTransactionsProps {
    transactions?: any[];
    accounts?: any[];
    beneficiaries?: any[];
}

const RecentTransactions = ({ transactions = [], accounts = [], beneficiaries = [] }: RecentTransactionsProps) => {
    const navigate = useNavigate();

    // Fonction pour déterminer le nom à afficher pour une transaction (bénéficiaire ou compte)
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

    // Regroupement des 5 dernières transactions par date
    const groupedTransactions = transactions.slice(0, 5).reduce((groups: any, transaction: any) => {
        const date = transaction.date || transaction.created_at || 'En cours';
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(transaction);
        return groups;
    }, {});

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
                    Object.entries(groupedTransactions).map(([date, txs]: [string, any]) => (
                        <div key={date} className="self-stretch flex flex-col justify-start items-start gap-6">
                            <div className="text-gray-400 text-lg font-normal font-['Inter'] leading-7">
                                {new Date(date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Europe/Paris' })}
                            </div>
                            <div className="self-stretch flex flex-col justify-start items-start gap-6">
                                {(txs as any[]).map((tx, index) => (
                                    <div key={index} className="self-stretch flex justify-between items-start">
                                        <div className="flex-1 flex justify-start items-start gap-6">
                                            <div className="w-[50px] h-[50px] p-2.5 bg-gray-400 rounded-[47px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                                                {tx.amount > 0 ? (
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M9.41421 16L17.7071 7.70711C18.0976 7.31658 18.0976 6.68342 17.7071 6.29289C17.3166 5.90237 16.6834 5.90237 16.2929 6.29289L8 14.5858V7C8 6.44772 7.55228 6 7 6C6.44772 6 6 6.44772 6 7V17C6 17.5523 6.44772 18 7 18H17C17.5523 18 18 17.5523 18 17C18 16.4477 17.5523 16 17 16H9.41421Z" fill="white" />
                                                    </svg>
                                                ) : (
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g clipPath="url(#clip0)">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M1 0C0.447715 0 0 0.447715 0 1C0 1.55228 0.447715 2 1 2H4.18032L5.01195 6.15508C5.01638 6.18353 5.02201 6.21159 5.02879 6.2392L6.69916 14.5848C6.83647 15.2751 7.21225 15.8959 7.76048 16.3373C8.3062 16.7766 8.98837 17.011 9.68864 17H19.3914C20.0916 17.011 20.7738 16.7766 21.3195 16.3373C21.868 15.8958 22.2437 15.2754 22.3808 14.5848L22.3823 14.5773L23.9823 6.18733C24.0381 5.89458 23.9605 5.59218 23.7705 5.36256C23.5805 5.13293 23.298 5 23 5H6.82043L5.98055 0.803743C5.88701 0.336385 5.47663 0 5 0H1ZM7.22073 7H21.7913L20.4185 14.1984C20.3723 14.4273 20.2474 14.6328 20.0654 14.7793C19.8826 14.9265 19.6538 15.0047 19.4192 15.0002L19.4 15H9.68L9.66084 15.0002C9.42619 15.0047 9.19743 14.9265 9.01461 14.7793C8.83179 14.6322 8.70656 14.4254 8.66084 14.1952L7.22073 7Z" fill="white" />
                                                            <path d="M7 21C7 19.8954 7.89543 19 9 19C10.1046 19 11 19.8954 11 21C11 22.1046 10.1046 23 9 23C7.89543 23 7 22.1046 7 21Z" fill="white" />
                                                            <path d="M18 21C18 19.8954 18.8954 19 20 19C21.1046 19 22 19.8954 22 21C22 22.1046 21.1046 23 20 23C18.8954 23 18 22.1046 18 21Z" fill="white" />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0">
                                                                <rect width="24" height="24" fill="white" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                )}
                                            </div>
                                            <div className="flex-1 flex flex-col justify-start items-start gap-2">
                                                <div className="self-stretch text-emerald-950 text-lg font-normal font-['Inter'] leading-7">
                                                    {tx.amount > 0 ? `Virement à ${getTransactionName(tx)}` : `Virement de ${getTransactionName(tx)}`}
                                                </div>
                                                <div className="self-stretch text-gray-400 text-base font-normal font-['Inter'] leading-6">
                                                    {new Date(tx.date || tx.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Paris' })} • {tx.payment_method || tx.type || 'Paiement'}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`text-2xl font-normal font-['Inter'] leading-9 whitespace-nowrap ${tx.amount > 0 ? 'text-red-500' : 'text-teal-400'}`}>
                                            {tx.amount > 0 ? '-' : '+'}{Math.abs(Number(tx.amount)).toFixed(2)} €
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default RecentTransactions;
