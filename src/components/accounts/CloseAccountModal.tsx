interface CloseAccountModalProps {
    onClose: () => void;
}

const CloseAccountModal = ({ onClose }: CloseAccountModalProps) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="w-[634px] p-6 bg-white rounded-2xl inline-flex flex-col justify-start items-start gap-6 overflow-hidden shadow-xl">
                <div className="justify-start text-emerald-950 text-4xl font-bold font-['Inter'] leading-[48px] tracking-tight">Cloturer un compte</div>
                <div className="self-stretch justify-start text-emerald-950 text-base font-semibold font-['Inter'] leading-6">Vous êtes sur le point de clôturer votre compte. Le solde de votre compte sera transféré sur votre compte principal.</div>
                <div className="inline-flex justify-start items-start gap-2.5">
                    <div onClick={onClose} data-icon-left="false" data-icon-right="false" data-label="true" data-size="Large" data-style="Outline" className="px-6 py-4 rounded-md outline outline-2 outline-offset-[-2px] outline-emerald-950 flex justify-center items-center gap-2 overflow-hidden cursor-pointer hover:bg-emerald-50 transition-colors">
                        <div className="justify-start text-emerald-950 text-lg font-bold font-['Inter'] leading-6">Annuler</div>
                    </div>
                    <div onClick={onClose} data-icon-left="false" data-icon-right="false" data-label="true" data-size="Large" data-style="Solid" className="px-6 py-4 bg-orange-400 rounded-md flex justify-center items-center gap-2 overflow-hidden cursor-pointer hover:bg-orange-500 transition-colors">
                        <div className="justify-start text-emerald-950 text-lg font-bold font-['Inter'] leading-6">Cloturer</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CloseAccountModal;
