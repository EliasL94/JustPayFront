const TransferStepper = () => {
    return (
        <div className="inline-flex justify-start items-center gap-4">
            <div className="flex justify-start items-center gap-6">
                <div className="w-12 h-12 px-3.5 py-0.5 bg-teal-300 rounded-[48px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                    <div className="w-2 h-6 justify-start text-black text-lg font-bold font-['Inter'] leading-6">1</div>
                </div>
                <div className="justify-start text-teal-300 text-lg font-bold font-['Inter'] leading-6">Type de virement</div>
            </div>
            <div className="w-24 h-0 outline outline-1 outline-offset-[-0.50px] outline-neutral-400"></div>
            <div className="flex justify-start items-center gap-6">
                <div className="w-12 h-12 px-3.5 py-0.5 bg-teal-100 rounded-[48px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                    <div className="justify-start text-black text-lg font-bold font-['Inter'] leading-6">2</div>
                </div>
                <div className="justify-start text-gray-500 text-lg font-bold font-['Inter'] leading-6">Bénéficiaire</div>
            </div>
            <div className="w-24 h-0 outline outline-1 outline-offset-[-0.50px] outline-neutral-400"></div>
            <div className="flex justify-start items-center gap-6">
                <div className="w-12 h-12 px-3.5 py-0.5 bg-teal-100 rounded-[48px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                    <div className="justify-start text-black text-lg font-bold font-['Inter'] leading-6">3</div>
                </div>
                <div className="justify-start text-gray-500 text-lg font-bold font-['Inter'] leading-6">Confirmation</div>
            </div>
        </div>
    );
};

export default TransferStepper;
