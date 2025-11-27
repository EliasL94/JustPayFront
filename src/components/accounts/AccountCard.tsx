import IconTransactions from '../../assets/SVG_Header/icon-menu.svg'; // Using menu icon as placeholder for transactions list
import IconClose from '../../assets/SVG_Dashboard/icon-plus.svg'; // Using plus icon rotated or just plus for now as close is not found

interface AccountCardProps {
    name: string;
    balance: string;
    iban: string;
    onCloseAccount: () => void;
}

const AccountCard = ({ name, balance, iban, onCloseAccount }: AccountCardProps) => {
    return (
        <div className="self-stretch p-6 bg-white rounded-2xl inline-flex flex-col justify-start items-start gap-4 overflow-hidden">
            <div className="self-stretch inline-flex justify-start items-start gap-4">
                <div className="w-96 justify-start text-emerald-950 text-lg font-normal font-['Inter'] leading-7">{name}</div>
            </div>
            <div className="self-stretch inline-flex justify-between items-center">
                <div className="justify-start text-emerald-950 text-base font-semibold font-['Inter'] leading-6">{balance}</div>
                <div className="justify-start text-neutral-400 text-base font-normal font-['Inter'] leading-6">{iban}</div>
            </div>
            <div className="w-40 inline-flex justify-start items-start gap-4">
                <div data-icon-left="true" data-icon-right="false" data-label="true" data-size="Small" data-style="Outline" className="px-3 py-2 rounded-md outline outline-2 outline-offset-[-2px] outline-emerald-950 flex justify-center items-center gap-2 overflow-hidden cursor-pointer hover:bg-emerald-50 transition-colors">
                    <div className="w-3.5 h-4 relative flex justify-center items-center">
                        <img src={IconTransactions} alt="Transactions" className="w-3.5 h-3.5" />
                    </div>
                    <div className="justify-start text-emerald-950 text-sm font-bold font-['Inter'] leading-6">Transactions</div>
                </div>
                <div onClick={onCloseAccount} data-icon-left="true" data-icon-right="false" data-label="true" data-size="Small" data-style="Outline" className="px-3 py-2 rounded-md outline outline-2 outline-offset-[-2px] outline-emerald-950 flex justify-center items-center gap-2 overflow-hidden cursor-pointer hover:bg-emerald-50 transition-colors">
                    <div className="w-3.5 h-4 relative flex justify-center items-center">
                        {/* Rotated plus for close/delete if needed, or just use it as is for now */}
                        <img src={IconClose} alt="Cloturer" className="w-3.5 h-3.5 rotate-45" />
                    </div>
                    <div className="justify-start text-emerald-950 text-sm font-bold font-['Inter'] leading-6">Cloturer</div>
                </div>
            </div>
        </div>
    );
};

export default AccountCard;
