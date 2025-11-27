import { useState } from 'react';
import IconDownload from '../../assets/SVG_Dashboard/Icon-3.svg';
import IconChevronDown from '../../assets/SVG_Dashboard/icon-chevron-up.svg';
import jsPDF from 'jspdf';

const API_BASE_URL = 'http://127.0.0.1:8000';

const TransactionsHeader = () => {
    const [selectedMonth, setSelectedMonth] = useState('Janvier 2025');
    const [showMonthDropdown, setShowMonthDropdown] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);

    // Generate month options for the past 12 months
    const generateMonthOptions = () => {
        const months = [
            'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
            'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
        ];
        const options = [];
        const now = new Date();

        for (let i = 0; i < 12; i++) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthName = months[date.getMonth()];
            const year = date.getFullYear();
            options.push(`${monthName} ${year}`);
        }

        return options;
    };

    const monthOptions = generateMonthOptions();

    const handleDownloadStatement = async () => {
        setIsDownloading(true);
        const userId = localStorage.getItem('user_id');
        if (!userId) {
            alert('Utilisateur non connecté');
            setIsDownloading(false);
            return;
        }

        try {
            // Fetch all accounts
            let allAccounts: any[] = [];

            const primaryResponse = await fetch(`${API_BASE_URL}/bankaccount/accounts/primary/${userId}`);
            if (primaryResponse.ok) {
                const primaryData = await primaryResponse.json();
                if (primaryData) {
                    allAccounts.push(primaryData);
                }
            }

            const secondaryResponse = await fetch(`${API_BASE_URL}/bankaccount/accounts/secondary/${userId}`);
            if (secondaryResponse.ok) {
                const secondaryData = await secondaryResponse.json();
                if (Array.isArray(secondaryData)) {
                    allAccounts = [...allAccounts, ...secondaryData];
                } else if (secondaryData.accounts && Array.isArray(secondaryData.accounts)) {
                    allAccounts = [...allAccounts, ...secondaryData.accounts];
                }
            }

            // Fetch transactions for all accounts
            let allTransactions: any[] = [];
            for (const account of allAccounts) {
                if (account?.account_number) {
                    const txResponse = await fetch(`${API_BASE_URL}/payments/account/${account.account_number}`);
                    if (txResponse.ok) {
                        const txData = await txResponse.json();
                        if (Array.isArray(txData)) {
                            allTransactions = [...allTransactions, ...txData.map(tx => ({ ...tx, account_name: account.name }))];
                        }
                    }
                }
            }

            // Generate PDF
            const pdf = new jsPDF();

            // Header
            pdf.setFontSize(20);
            pdf.text('Relevé de Compte', 105, 20, { align: 'center' });

            pdf.setFontSize(12);
            pdf.text(`Période: ${selectedMonth}`, 105, 30, { align: 'center' });
            pdf.text(`Date d'édition: ${new Date().toLocaleDateString('fr-FR')}`, 105, 38, { align: 'center' });

            // Accounts summary
            let yPosition = 50;
            pdf.setFontSize(14);
            pdf.text('Comptes:', 20, yPosition);
            yPosition += 8;

            pdf.setFontSize(10);
            allAccounts.forEach(account => {
                pdf.text(`${account.name || 'Compte'}: ${account.balance}€`, 20, yPosition);
                yPosition += 6;
            });

            yPosition += 10;

            // Transactions
            pdf.setFontSize(14);
            pdf.text('Transactions:', 20, yPosition);
            yPosition += 8;

            pdf.setFontSize(10);

            if (allTransactions.length === 0) {
                pdf.text('Aucune transaction pour cette période', 20, yPosition);
            } else {
                allTransactions.forEach((tx, index) => {
                    if (yPosition > 270) {
                        pdf.addPage();
                        yPosition = 20;
                    }

                    const date = tx.date || tx.created_at || 'N/A';
                    const description = tx.description || tx.merchant || 'Transaction';
                    const amount = tx.amount > 0 ? `+${tx.amount}€` : `${tx.amount}€`;

                    pdf.text(`${date} - ${description}: ${amount}`, 20, yPosition);
                    yPosition += 6;
                });
            }

            // Download
            pdf.save(`releve-${selectedMonth.replace(' ', '-')}.pdf`);

        } catch (error) {
            console.error('Error generating statement:', error);
            alert('Erreur lors de la génération du relevé');
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="self-stretch inline-flex justify-between items-start">
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-2.5">
                <div className="justify-start text-emerald-950 text-4xl font-bold font-['Inter'] leading-[48px] tracking-tight">Vos transactions</div>
                <div className="justify-start text-neutral-400 text-lg font-normal font-['Inter'] leading-7">Gérer tout l'historique de vos transactions</div>
            </div>
            <div className="flex justify-start items-center gap-2.5">
                {/* Account Filter */}
                <div className="w-56 inline-flex flex-col justify-start items-start">
                    <div className="self-stretch flex flex-col justify-start items-start gap-2">
                        <div className="self-stretch bg-white rounded-md outline outline-2 outline-offset-[-2px] outline-slate-300 flex flex-col justify-start items-start overflow-hidden">
                            <div className="self-stretch pl-4 pr-3 py-3 inline-flex justify-start items-center gap-2 cursor-pointer">
                                <div className="flex-1 justify-start text-emerald-950 text-base font-normal font-['Inter'] leading-6">Tous mes comptes</div>
                                <div className="w-6 h-6 relative overflow-hidden flex justify-center items-center">
                                    <img src={IconChevronDown} alt="Down" className="w-3.5 h-2" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Date Filter */}
                <div className="w-48 inline-flex flex-col justify-start items-start relative">
                    <div className="self-stretch flex flex-col justify-start items-start gap-2">
                        <div className="self-stretch bg-white rounded-md outline outline-2 outline-offset-[-2px] outline-slate-300 flex flex-col justify-start items-start overflow-hidden">
                            <div
                                className="self-stretch pl-4 pr-3 py-3 inline-flex justify-start items-center gap-2 cursor-pointer"
                                onClick={() => setShowMonthDropdown(!showMonthDropdown)}
                            >
                                <div className="flex-1 justify-start text-emerald-950 text-base font-normal font-['Inter'] leading-6">{selectedMonth}</div>
                                <div className="w-6 h-6 relative overflow-hidden flex justify-center items-center">
                                    <img src={IconChevronDown} alt="Down" className="w-3.5 h-2" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dropdown */}
                    {showMonthDropdown && (
                        <div className="absolute top-full mt-1 w-full bg-white rounded-md shadow-lg z-10 max-h-60 overflow-y-auto border border-slate-300">
                            {monthOptions.map((month) => (
                                <div
                                    key={month}
                                    className="px-4 py-2 cursor-pointer hover:bg-slate-100 text-emerald-950 text-base font-normal font-['Inter']"
                                    onClick={() => {
                                        setSelectedMonth(month);
                                        setShowMonthDropdown(false);
                                    }}
                                >
                                    {month}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Download Button */}
                <div
                    className={`px-6 py-4 rounded-md outline outline-2 outline-offset-[-2px] outline-emerald-950 flex justify-center items-center gap-2 overflow-hidden cursor-pointer hover:bg-emerald-50 transition-colors ${isDownloading ? 'opacity-50' : ''}`}
                    onClick={handleDownloadStatement}
                >
                    <div className="justify-start text-emerald-950 text-lg font-bold font-['Inter'] leading-6">
                        {isDownloading ? 'Téléchargement...' : 'Télécharger un relevé'}
                    </div>
                    <div className="w-4 h-6 relative flex justify-center items-center">
                        <img src={IconDownload} alt="Download" className="w-5 h-5" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionsHeader;
