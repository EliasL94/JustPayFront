import TransferStepper from '../components/transfer/TransferStepper';
import TransferTypeSelection from '../components/transfer/TransferTypeSelection';

const Transfer = () => {
    return (
        <div className="w-full h-full inline-flex justify-start items-start gap-6 bg-slate-50 min-h-screen">
            <div className="flex-1 self-stretch px-4 md:px-6 py-12 inline-flex flex-col justify-start items-center gap-12">
                <TransferStepper />
                <TransferTypeSelection />
            </div>
        </div>
    );
};

export default Transfer;
