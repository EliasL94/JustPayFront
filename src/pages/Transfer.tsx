import jsPDF from 'jspdf';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TransferStepper from '../components/transfer/TransferStepper';
import TransferTypeSelection from '../components/transfer/TransferTypeSelection';
import InternalTransferForm from '../components/transfer/InternalTransferForm';
import ExternalTransferForm from '../components/transfer/ExternalTransferForm';
import InternalTransferSuccess from '../components/transfer/InternalTransferSuccess';

const Transfer = () => {
    const location = useLocation();
    const [transferType, setTransferType] = useState<'selection' | 'internal' | 'external' | 'internal_success'>(
        (location.state?.initialType as 'selection' | 'internal' | 'external' | 'internal_success') || 'selection'
    );
    const [successData, setSuccessData] = useState<{ amount: string; recipient: string } | null>(null);
    const [accounts, setAccounts] = useState<any[]>([]);
    const [beneficiaries, setBeneficiaries] = useState<any[]>([]);

    useEffect(() => {
        if (location.state?.initialType && location.state.initialType !== transferType) {
            setTransferType(location.state.initialType);
        }
    }, [location.state, transferType]);

    useEffect(() => {
        const fetchData = async () => {
            const userId = localStorage.getItem('user_id');
            if (!userId) return;

            try {
                // Fetch Accounts
                const primaryRes = await fetch(`http://127.0.0.1:8000/bankaccount/accounts/primary/${userId}`);
                const secondaryRes = await fetch(`http://127.0.0.1:8000/bankaccount/accounts/secondary/${userId}`);

                let allAccounts: any[] = [];

                if (primaryRes.ok) {
                    const primaryData = await primaryRes.json();
                    if (primaryData) allAccounts.push({ ...primaryData, type: 'primary' });
                }

                if (secondaryRes.ok) {
                    const secondaryData = await secondaryRes.json();
                    let secondaryList = [];
                    if (Array.isArray(secondaryData)) secondaryList = secondaryData;
                    else if (secondaryData.accounts) secondaryList = secondaryData.accounts;

                    allAccounts = [...allAccounts, ...secondaryList.map((acc: any) => ({ ...acc, type: 'secondary' }))];
                }
                setAccounts(allAccounts);

                // Fetch Beneficiaries
                const benRes = await fetch(`http://127.0.0.1:8000/beneficiaries/user/${userId}`);
                if (benRes.ok) {
                    const benData = await benRes.json();
                    setBeneficiaries(Array.isArray(benData) ? benData : []);
                }

            } catch (error) {
                console.error("Error fetching transfer data:", error);
            }
        };

        fetchData();
    }, []);

    const handleTypeSelect = (type: 'internal' | 'external') => {
        setTransferType(type);
    };

    const handleInternalSuccess = (amount: string, recipient: string) => {
        setSuccessData({ amount, recipient });
        setTransferType('internal_success');
    };

    const handleDownloadReceipt = () => {
        if (!successData) return;

        const doc = new jsPDF();

        // Title
        doc.setFontSize(22);
        doc.text('Reçu de Virement', 105, 20, { align: 'center' });

        // Date
        doc.setFontSize(12);
        doc.text(`Date: ${new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}`, 105, 30, { align: 'center' });

        // Details
        doc.setFontSize(14);
        doc.text('Détails de la transaction:', 20, 50);

        doc.setFontSize(12);
        doc.text(`Montant envoyé: ${successData.amount} €`, 20, 60);
        doc.text(`Bénéficiaire: ${successData.recipient}`, 20, 70);
        doc.text(`Statut: Succès`, 20, 80);

        // Footer
        doc.setFontSize(10);
        doc.text('Ce document est un justificatif de transaction généré automatiquement.', 105, 100, { align: 'center' });

        doc.save('recu-virement.pdf');
    };

    return (
        <div className="w-full h-full inline-flex justify-start items-start gap-6 bg-slate-50 min-h-screen">
            <div className="flex-1 self-stretch px-4 md:px-6 py-12 inline-flex flex-col justify-start items-center gap-12">
                {transferType === 'selection' && (
                    <>
                        <TransferStepper />
                        <TransferTypeSelection onSelect={handleTypeSelect} />
                    </>
                )}
                {transferType === 'internal' && (
                    <InternalTransferForm
                        onBack={() => setTransferType('selection')}
                        onSuccess={handleInternalSuccess}
                        accounts={accounts}
                    />
                )}
                {transferType === 'external' && (
                    <ExternalTransferForm
                        onBack={() => setTransferType('selection')}
                        accounts={accounts}
                        beneficiaries={beneficiaries}
                        onSuccess={handleInternalSuccess}
                    />
                )}
                {transferType === 'internal_success' && successData && (
                    <InternalTransferSuccess
                        amount={successData.amount}
                        recipientName={successData.recipient}
                        onNewTransfer={() => setTransferType('selection')}
                        onDownloadReceipt={handleDownloadReceipt}
                    />
                )}
            </div>
        </div>
    );
};

export default Transfer;
