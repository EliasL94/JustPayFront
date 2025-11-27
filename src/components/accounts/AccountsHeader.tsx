interface AccountsHeaderProps {
    onAddAccount: () => void;
    totalAssets: string;
}

const AccountsHeader = ({ onAddAccount, totalAssets }: AccountsHeaderProps) => {
    return (
        <div className="self-stretch flex justify-between items-start">
            <div className="flex flex-col justify-start items-start gap-2">
                <div className="text-[#002222] text-[32px] font-bold font-['Inter'] leading-[48px]">Mes comptes</div>
                <div className="text-[#8C9C9C] text-lg font-normal font-['Inter'] leading-7">
                    Total des actifs: <span className="text-[#002222] font-bold">{totalAssets}</span>
                </div>
            </div>
            <button
                onClick={onAddAccount}
                className="px-4 py-3 bg-white rounded-md border-2 border-[#002222] flex justify-center items-center gap-2 overflow-hidden hover:bg-gray-50 transition-colors"
            >
                <div className="text-[#002222] text-sm font-bold font-['Inter'] leading-6">Ajouter un compte</div>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 4.16666V15.8333" stroke="#002222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4.16675 10H15.8334" stroke="#002222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
        </div>
    );
};

export default AccountsHeader;
