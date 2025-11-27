
// The snippet uses some hardcoded SVGs or divs. I will try to use the provided structure.

interface InternalTransferSuccessProps {
    amount: string;
    recipientName: string;
    onDownloadReceipt?: () => void;
    onNewTransfer?: () => void;
}

const InternalTransferSuccess = ({ amount, recipientName, onDownloadReceipt, onNewTransfer }: InternalTransferSuccessProps) => {
    return (
        <div className="self-stretch self-stretch px-6 py-12 inline-flex flex-col justify-start items-center gap-12">
            <div className="inline-flex justify-start items-center gap-4">
                <div className="flex justify-start items-center gap-6 flex-wrap content-center">
                    <div className="w-12 h-12 px-3.5 py-0.5 bg-teal-100 rounded-[48px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                        <div className="w-2 h-6 justify-start text-black text-lg font-bold font-['Inter'] leading-6">1</div>
                    </div>
                    <div className="justify-start text-gray-500 text-lg font-bold font-['Inter'] leading-6">Type de virement</div>
                    <div className="w-24 h-0 outline outline-1 outline-offset-[-0.50px] outline-neutral-400"></div>
                </div>
                <div className="w-72 flex justify-start items-center gap-6 flex-wrap content-center">
                    <div className="w-12 h-12 px-3.5 py-0.5 bg-teal-100 rounded-[48px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                        <div className="justify-start text-black text-lg font-bold font-['Inter'] leading-6">2</div>
                    </div>
                    <div className="justify-start text-gray-500 text-lg font-bold font-['Inter'] leading-6">Bénéficiaire</div>
                    <div className="w-24 h-0 outline outline-1 outline-offset-[-0.50px] outline-neutral-400"></div>
                </div>
                <div className="flex justify-start items-center gap-6 flex-wrap content-center">
                    <div className="w-12 h-12 px-3.5 py-0.5 bg-teal-300 rounded-[48px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                        <div className="justify-start text-black text-lg font-bold font-['Inter'] leading-6">3</div>
                    </div>
                    <div className="justify-start text-teal-300 text-lg font-bold font-['Inter'] leading-6">Confirmation</div>
                </div>
            </div>
            <div className="w-[500px] p-6 bg-white rounded-2xl flex flex-col justify-start items-start gap-12 overflow-hidden">
                <div className="self-stretch flex flex-col justify-start items-center gap-4">
                    <div className="inline-flex justify-start items-start gap-4">
                        <div className="w-12 h-12 p-2.5 bg-teal-300 rounded-[47px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.6666 5L7.49992 14.1667L3.33325 10" stroke="#002222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div className="justify-start text-emerald-950 text-4xl font-bold font-['Inter'] leading-[48px] tracking-tight">Virement envoyé !</div>
                    </div>
                    <div className="justify-start text-neutral-400 text-lg font-bold font-['Inter'] leading-6">{amount}€ ont été envoyé à {recipientName}</div>
                </div>
                <div className="self-stretch flex flex-col justify-start items-start gap-4">
                    <div
                        onClick={onDownloadReceipt}
                        className="self-stretch px-6 py-4 bg-teal-300 rounded-md inline-flex justify-center items-center gap-2 overflow-hidden cursor-pointer hover:bg-teal-400 transition-colors"
                    >
                        <div className="justify-start text-emerald-950 text-lg font-bold font-['Inter'] leading-6">Télécharger un reçu</div>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="#002222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M7 10L12 15L17 10" stroke="#002222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 15V3" stroke="#002222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div
                        onClick={onNewTransfer}
                        className="self-stretch px-6 py-4 rounded-md outline outline-2 outline-offset-[-2px] outline-emerald-950 inline-flex justify-center items-center gap-2 overflow-hidden cursor-pointer hover:bg-emerald-50 transition-colors"
                    >
                        <div className="justify-start text-emerald-950 text-lg font-bold font-['Inter'] leading-6">Nouveau virement</div>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5V19" stroke="#002222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M5 12H19" stroke="#002222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InternalTransferSuccess;
