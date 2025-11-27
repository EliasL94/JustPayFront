interface AccountCardProps {
    id: string | number;
    name: string;
    balance: string;
    iban?: string;
    account_number?: string;
    onCloseAccount: () => void;
}

const AccountCard = ({ id, name, balance, iban, account_number, onCloseAccount }: AccountCardProps) => {
    return (
        <div className="w-full p-6 bg-white rounded-2xl flex flex-col justify-start items-start gap-4 shadow-sm border border-gray-100">
            <div className="w-full flex justify-start items-start gap-4">
                <div className="w-full text-[#002222] text-lg font-normal font-['Inter'] leading-7 break-words">{name}</div>
            </div>
            <div className="w-full flex justify-between items-center">
                <div className="text-[#002222] text-base font-semibold font-['Inter'] leading-6 break-words">{balance}</div>
                <div className="text-[#8C9C9C] text-base font-normal font-['Inter'] leading-6 break-words">{iban || account_number}</div>
            </div>
            <div className="flex justify-start items-start gap-4">
                <button className="px-3 py-2 rounded-md border-2 border-[#002222] flex justify-center items-center gap-2 overflow-hidden hover:bg-gray-50 transition-colors">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.99992 3.33334C1.63173 3.33334 1.33325 3.63182 1.33325 4.00001C1.33325 4.3682 1.63173 4.66668 1.99992 4.66668H2.00659C2.37478 4.66668 2.67325 4.3682 2.67325 4.00001C2.67325 3.63182 2.37478 3.33334 2.00659 3.33334H1.99992Z" fill="#2D3648" />
                        <path d="M5.33325 3.33334C4.96506 3.33334 4.66658 3.63182 4.66658 4.00001C4.66658 4.3682 4.96506 4.66668 5.33325 4.66668H13.9999C14.3681 4.66668 14.6666 4.3682 14.6666 4.00001C14.6666 3.63182 14.3681 3.33334 13.9999 3.33334H5.33325Z" fill="#2D3648" />
                        <path d="M5.33325 7.33334C4.96506 7.33334 4.66658 7.63182 4.66658 8.00001C4.66658 8.3682 4.96506 8.66668 5.33325 8.66668H13.9999C14.3681 8.66668 14.6666 8.3682 14.6666 8.00001C14.6666 7.63182 14.3681 7.33334 13.9999 7.33334H5.33325Z" fill="#2D3648" />
                        <path d="M4.66658 12C4.66658 11.6318 4.96506 11.3333 5.33325 11.3333H13.9999C14.3681 11.3333 14.6666 11.6318 14.6666 12C14.6666 12.3682 14.3681 12.6667 13.9999 12.6667H5.33325C4.96506 12.6667 4.66658 12.3682 4.66658 12Z" fill="#2D3648" />
                        <path d="M1.33325 8.00001C1.33325 7.63182 1.63173 7.33334 1.99992 7.33334H2.00659C2.37478 7.33334 2.67325 7.63182 2.67325 8.00001C2.67325 8.3682 2.37478 8.66668 2.00659 8.66668H1.99992C1.63173 8.66668 1.33325 8.3682 1.33325 8.00001Z" fill="#2D3648" />
                        <path d="M1.99992 11.3333C1.63173 11.3333 1.33325 11.6318 1.33325 12C1.33325 12.3682 1.63173 12.6667 1.99992 12.6667H2.00659C2.37478 12.6667 2.67325 12.3682 2.67325 12C2.67325 11.6318 2.37478 11.3333 2.00659 11.3333H1.99992Z" fill="#2D3648" />
                    </svg>
                    <div className="text-[#002222] text-sm font-bold font-['Inter'] leading-6">Transactions</div>
                </button>
                <button onClick={onCloseAccount} className="px-3 py-2 rounded-md border-2 border-[#002222] flex justify-center items-center gap-2 overflow-hidden hover:bg-gray-50 transition-colors">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.66658 6.66667C7.03478 6.66667 7.33325 6.96515 7.33325 7.33334V11.3333C7.33325 11.7015 7.03478 12 6.66658 12C6.2984 12 5.99992 11.7015 5.99992 11.3333V7.33334C5.99992 6.96515 6.2984 6.66667 6.66658 6.66667Z" fill="#2D3648" />
                        <path d="M9.99992 11.3333V7.33334C9.99992 6.96515 9.70144 6.66667 9.33325 6.66667C8.96506 6.66667 8.66658 6.96515 8.66658 7.33334V11.3333C8.66658 11.7015 8.96506 12 9.33325 12C9.70144 12 9.99992 11.7015 9.99992 11.3333Z" fill="#2D3648" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M4.66658 3.33334V2.66667C4.66658 2.13624 4.8773 1.62753 5.25237 1.25246C5.62744 0.877385 6.13615 0.666672 6.66658 0.666672H9.33325C9.86368 0.666672 10.3724 0.877385 10.7475 1.25246C11.1225 1.62753 11.3333 2.13624 11.3333 2.66667V3.33334H13.9999C14.3681 3.33334 14.6666 3.63182 14.6666 4.00001C14.6666 4.3682 14.3681 4.66667 13.9999 4.66667H13.3333V13.3333C13.3333 13.8638 13.1225 14.3725 12.7475 14.7476C12.3724 15.1226 11.8637 15.3333 11.3333 15.3333H4.66658C4.13615 15.3333 3.62744 15.1226 3.25237 14.7476C2.8773 14.3725 2.66659 13.8638 2.66659 13.3333V4.66667H1.99992C1.63173 4.66667 1.33325 4.3682 1.33325 4.00001C1.33325 3.63182 1.63173 3.33334 1.99992 3.33334H4.66658ZM6.19518 2.19527C6.32021 2.07024 6.48977 2.00001 6.66658 2.00001H9.33325C9.51006 2.00001 9.67963 2.07024 9.80466 2.19527C9.92968 2.32029 9.99992 2.48986 9.99992 2.66667V3.33334H5.99992V2.66667C5.99992 2.48986 6.07016 2.32029 6.19518 2.19527ZM3.99992 4.66667V13.3333C3.99992 13.5101 4.07016 13.6797 4.19518 13.8047C4.3202 13.9298 4.48977 14 4.66658 14H11.3333C11.5101 14 11.6796 13.9298 11.8047 13.8047C11.9297 13.6797 11.9999 13.5101 11.9999 13.3333V4.66667H3.99992Z" fill="#2D3648" />
                    </svg>
                    <div className="text-[#002222] text-sm font-bold font-['Inter'] leading-6">Cloturer</div>
                </button>
            </div>
        </div>
    );
};

export default AccountCard;
