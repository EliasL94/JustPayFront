import { useState, useEffect } from 'react';

const API_BASE_URL = 'http://127.0.0.1:8000';

const TransactionsList = () => {
    const [transactions, setTransactions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            const userId = localStorage.getItem('user_id');
            if (!userId) {
                setLoading(false);
                return;
            }

            try {
                let allTransactions: any[] = [];

                // Fetch primary account
                const primaryResponse = await fetch(`${API_BASE_URL}/bankaccount/accounts/primary/${userId}`);
                if (primaryResponse.ok) {
                    const primaryData = await primaryResponse.json();
                    if (primaryData?.account_number) {
                        const txResponse = await fetch(`${API_BASE_URL}/payments/account/${primaryData.account_number}`);
                        if (txResponse.ok) {
                            const txData = await txResponse.json();
                            if (Array.isArray(txData)) {
                                allTransactions = [...allTransactions, ...txData];
                            }
                        }
                    }
                }

                // Fetch secondary accounts
                const secondaryResponse = await fetch(`${API_BASE_URL}/bankaccount/accounts/secondary/${userId}`);
                if (secondaryResponse.ok) {
                    const secondaryData = await secondaryResponse.json();
                    let secondaryAccounts: any[] = [];

                    if (Array.isArray(secondaryData)) {
                        secondaryAccounts = secondaryData;
                    } else if (secondaryData.accounts && Array.isArray(secondaryData.accounts)) {
                        secondaryAccounts = secondaryData.accounts;
                    }

                    // Fetch transactions for each secondary account
                    for (const account of secondaryAccounts) {
                        if (account?.account_number) {
                            const txResponse = await fetch(`${API_BASE_URL}/payments/account/${account.account_number}`);
                            if (txResponse.ok) {
                                const txData = await txResponse.json();
                                if (Array.isArray(txData)) {
                                    allTransactions = [...allTransactions, ...txData];
                                }
                            }
                        }
                    }
                }

                setTransactions(allTransactions);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching transactions:', error);
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    // Group transactions by date
    const groupedTransactions = transactions.reduce((groups: any, transaction: any) => {
        const date = transaction.date || transaction.created_at || 'En cours';
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(transaction);
        return groups;
    }, {});

    return (
        <div style={{ width: '914px', paddingLeft: 24, paddingRight: 24, paddingTop: 16, paddingBottom: 16, background: 'white', overflow: 'hidden', borderRadius: 16, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 32, display: 'inline-flex' }}>
            {/* Tabs */}
            <div style={{ alignSelf: 'stretch', borderBottom: '2px #CBD2E0 solid', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 24, display: 'inline-flex' }}>
                <div style={{ alignSelf: 'stretch', paddingTop: 12, paddingBottom: 12, borderBottom: '2px #002222 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex' }}>
                    <div style={{ width: 16, height: 16, position: 'relative', overflow: 'hidden' }}>
                        <div style={{ width: 13.33, height: 13.33, left: 1.33, top: 1.33, position: 'absolute', background: '#002222' }} />
                    </div>
                    <div style={{ textAlign: 'center', color: '#002222', fontSize: 16, fontFamily: 'Inter', fontWeight: '700', lineHeight: '24px', wordWrap: 'break-word' }}>Transactions</div>
                </div>
                <div style={{ alignSelf: 'stretch', paddingTop: 12, paddingBottom: 12, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.33325 1.33325C2.80282 1.33325 2.29411 1.54397 1.91904 1.91904C1.54397 2.29411 1.33325 2.80282 1.33325 3.33325V5.33325C1.33325 5.70144 1.63173 5.99992 1.99992 5.99992C2.36811 5.99992 2.66659 5.70144 2.66659 5.33325V3.33325C2.66659 3.15644 2.73682 2.98687 2.86185 2.86185C2.98687 2.73682 3.15644 2.66659 3.33325 2.66659H5.33325C5.70144 2.66659 5.99992 2.36811 5.99992 1.99992C5.99992 1.63173 5.70144 1.33325 5.33325 1.33325H3.33325Z" fill="#8C9C9C" />
                        <path d="M10.6666 1.33325C10.2984 1.33325 9.99992 1.63173 9.99992 1.99992C9.99992 2.36811 10.2984 2.66659 10.6666 2.66659H12.6666C12.8434 2.66659 13.013 2.73682 13.138 2.86185C13.263 2.98687 13.3333 3.15644 13.3333 3.33325V5.33325C13.3333 5.70144 13.6317 5.99992 13.9999 5.99992C14.3681 5.99992 14.6666 5.70144 14.6666 5.33325V3.33325C14.6666 2.80282 14.4559 2.29411 14.0808 1.91904C13.7057 1.54397 13.197 1.33325 12.6666 1.33325H10.6666Z" fill="#8C9C9C" />
                        <path d="M2.66659 10.6666C2.66659 10.2984 2.36811 9.99992 1.99992 9.99992C1.63173 9.99992 1.33325 10.2984 1.33325 10.6666V12.6666C1.33325 13.197 1.54397 13.7057 1.91904 14.0808C2.29411 14.4559 2.80282 14.6666 3.33325 14.6666H5.33325C5.70144 14.6666 5.99992 14.3681 5.99992 13.9999C5.99992 13.6317 5.70144 13.3333 5.33325 13.3333H3.33325C3.15644 13.3333 2.98687 13.263 2.86185 13.138C2.73682 13.013 2.66659 12.8434 2.66659 12.6666V10.6666Z" fill="#8C9C9C" />
                        <path d="M14.6666 10.6666C14.6666 10.2984 14.3681 9.99992 13.9999 9.99992C13.6317 9.99992 13.3333 10.2984 13.3333 10.6666V12.6666C13.3333 12.8434 13.263 13.013 13.138 13.138C13.013 13.263 12.8434 13.3333 12.6666 13.3333H10.6666C10.2984 13.3333 9.99992 13.6317 9.99992 13.9999C9.99992 14.3681 10.2984 14.6666 10.6666 14.6666H12.6666C13.197 14.6666 13.7057 14.4559 14.0808 14.0808C14.4559 13.7057 14.6666 13.197 14.6666 12.6666V10.6666Z" fill="#8C9C9C" />
                    </svg>
                    <div style={{ textAlign: 'center', color: '#8C9C9C', fontSize: 16, fontFamily: 'Inter', fontWeight: '700', lineHeight: '24px', wordWrap: 'break-word' }}>Recettes</div>
                </div>
                <div style={{ alignSelf: 'stretch', paddingTop: 12, paddingBottom: 12, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.33325 1.33325C2.80282 1.33325 2.29411 1.54397 1.91904 1.91904C1.54397 2.29411 1.33325 2.80282 1.33325 3.33325V5.33325C1.33325 5.70144 1.63173 5.99992 1.99992 5.99992C2.36811 5.99992 2.66659 5.70144 2.66659 5.33325V3.33325C2.66659 3.15644 2.73682 2.98687 2.86185 2.86185C2.98687 2.73682 3.15644 2.66659 3.33325 2.66659H5.33325C5.70144 2.66659 5.99992 2.36811 5.99992 1.99992C5.99992 1.63173 5.70144 1.33325 5.33325 1.33325H3.33325Z" fill="#8C9C9C" />
                        <path d="M10.6666 1.33325C10.2984 1.33325 9.99992 1.63173 9.99992 1.99992C9.99992 2.36811 10.2984 2.66659 10.6666 2.66659H12.6666C12.8434 2.66659 13.013 2.73682 13.138 2.86185C13.263 2.98687 13.3333 3.15644 13.3333 3.33325V5.33325C13.3333 5.70144 13.6317 5.99992 13.9999 5.99992C14.3681 5.99992 14.6666 5.70144 14.6666 5.33325V3.33325C14.6666 2.80282 14.4559 2.29411 14.0808 1.91904C13.7057 1.54397 13.197 1.33325 12.6666 1.33325H10.6666Z" fill="#8C9C9C" />
                        <path d="M2.66659 10.6666C2.66659 10.2984 2.36811 9.99992 1.99992 9.99992C1.63173 9.99992 1.33325 10.2984 1.33325 10.6666V12.6666C1.33325 13.197 1.54397 13.7057 1.91904 14.0808C2.29411 14.4559 2.80282 14.6666 3.33325 14.6666H5.33325C5.70144 14.6666 5.99992 14.3681 5.99992 13.9999C5.99992 13.6317 5.70144 13.3333 5.33325 13.3333H3.33325C3.15644 13.3333 2.98687 13.263 2.86185 13.138C2.73682 13.013 2.66659 12.8434 2.66659 12.6666V10.6666Z" fill="#8C9C9C" />
                        <path d="M14.6666 10.6666C14.6666 10.2984 14.3681 9.99992 13.9999 9.99992C13.6317 9.99992 13.3333 10.2984 13.3333 10.6666V12.6666C13.3333 12.8434 13.263 13.013 13.138 13.138C13.013 13.263 12.8434 13.3333 12.6666 13.3333H10.6666C10.2984 13.3333 9.99992 13.6317 9.99992 13.9999C9.99992 14.3681 10.2984 14.6666 10.6666 14.6666H12.6666C13.197 14.6666 13.7057 14.4559 14.0808 14.0808C14.4559 13.7057 14.6666 13.197 14.6666 12.6666V10.6666Z" fill="#8C9C9C" />
                    </svg>
                    <div style={{ textAlign: 'center', color: '#8C9C9C', fontSize: 16, fontFamily: 'Inter', fontWeight: '700', lineHeight: '24px', wordWrap: 'break-word' }}>Dépenses</div>
                </div>
            </div>

            {loading ? (
                <div style={{ alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 24, display: 'flex', padding: '40px 0' }}>
                    <div style={{ color: '#8C9C9C', fontSize: 18, fontFamily: 'Inter', fontWeight: '400', lineHeight: '27px' }}>Chargement...</div>
                </div>
            ) : transactions.length === 0 ? (
                <div style={{ alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 24, display: 'flex', padding: '40px 0' }}>
                    <div style={{ color: '#8C9C9C', fontSize: 18, fontFamily: 'Inter', fontWeight: '400', lineHeight: '27px' }}>Pas encore de transaction</div>
                </div>
            ) : (
                <>
                    {Object.entries(groupedTransactions).map(([date, txs]: [string, any]) => (
                        <div key={date} style={{ alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 24, display: 'flex' }}>
                            <div style={{ color: '#8C9C9C', fontSize: 18, fontFamily: 'Inter', fontWeight: '400', lineHeight: '27px', wordWrap: 'break-word' }}>{date}</div>
                            <div style={{ alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 24, display: 'flex' }}>
                                {(txs as any[]).map((tx, index) => (
                                    <div key={index} style={{ alignSelf: 'stretch', height: 50, justifyContent: 'space-between', alignItems: 'flex-start', display: 'inline-flex' }}>
                                        <div style={{ flex: '1 1 0', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 24, display: 'flex' }}>
                                            <div style={{ width: 50, height: 50, padding: 10, background: '#8C9C9C', overflow: 'hidden', borderRadius: 47, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex' }}>
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
                                            <div style={{ flex: '1 1 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex' }}>
                                                <div style={{ alignSelf: 'stretch', height: 20, color: '#002222', fontSize: 18, fontFamily: 'Inter', fontWeight: '400', lineHeight: '27px', wordWrap: 'break-word' }}>
                                                    {tx.description || tx.merchant || 'Transaction'}
                                                </div>
                                                <div style={{ alignSelf: 'stretch', height: 18, color: '#8C9C9C', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', lineHeight: '24px', wordWrap: 'break-word' }}>
                                                    {tx.payment_method || tx.type || 'Paiement'}
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ color: tx.amount > 0 ? '#58C5C3' : '#EB7C3F', fontSize: 22, fontFamily: 'Inter', fontWeight: '400', lineHeight: '35.20px', wordWrap: 'break-word' }}>
                                            {tx.amount > 0 ? '+' : ''}{tx.amount} €
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Pagination */}
                    <div style={{ justifyContent: 'flex-start', alignItems: 'flex-start', gap: 12, display: 'inline-flex' }}>
                        <div style={{ alignSelf: 'stretch', paddingLeft: 20, paddingRight: 20, background: '#E4F6F5', borderRadius: 5, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'flex', cursor: 'pointer' }}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.875 10H3.125" stroke="#58C5C3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8.75 4.375L3.125 10L8.75 15.625" stroke="#58C5C3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div style={{ justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex' }}>
                            <div style={{ paddingTop: 12, paddingBottom: 12, background: '#58C5C3', borderRadius: 5, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'flex', cursor: 'pointer' }}>
                                <div style={{ width: 44, textAlign: 'center', color: 'white', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', lineHeight: '20px', wordWrap: 'break-word' }}>01</div>
                            </div>
                        </div>
                        <div style={{ alignSelf: 'stretch', paddingLeft: 20, paddingRight: 20, background: '#E4F6F5', borderRadius: 5, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'flex', cursor: 'pointer' }}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.125 10H16.875" stroke="#58C5C3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M11.25 4.375L16.875 10L11.25 15.625" stroke="#58C5C3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default TransactionsList;
