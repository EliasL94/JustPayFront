import { useState } from 'react';
import TransferStepper from '../components/transfer/TransferStepper';
import TransferTypeSelection from '../components/transfer/TransferTypeSelection';
import InternalTransferForm from '../components/transfer/InternalTransferForm';
import ExternalTransferForm from '../components/transfer/ExternalTransferForm';

const Transfer = () => {
    const [transferType, setTransferType] = useState<'selection' | 'internal' | 'external'>('selection');

    const handleTypeSelect = (type: 'internal' | 'external') => {
        setTransferType(type);
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
                    <InternalTransferForm onBack={() => setTransferType('selection')} />
                )}
                {transferType === 'external' && (
                    <ExternalTransferForm onBack={() => setTransferType('selection')} />
                )}
            </div>
        </div>
    );
};

export default Transfer;
