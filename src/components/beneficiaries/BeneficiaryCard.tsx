import { useState, useEffect } from 'react';

interface BeneficiaryCardProps {
    id: number;
    name: string;
    iban?: string;
    account_number?: string;
    onDelete?: () => void;
}

const BeneficiaryCard = ({ id, name, iban, account_number, onDelete }: BeneficiaryCardProps) => {
    return (
        <div className="self-stretch p-6 bg-white rounded-2xl inline-flex flex-col justify-start items-start gap-4 overflow-hidden border border-gray-100 shadow-sm">
            <div className="self-stretch inline-flex justify-start items-start gap-4">
                <div className="w-full justify-start text-emerald-950 text-lg font-normal font-['Inter'] leading-7">{name}</div>
            </div>
            <div className="self-stretch inline-flex justify-start items-center gap-2.5">
                <div className="justify-start text-emerald-950 text-base font-semibold font-['Inter'] leading-6"> </div>
                <div className="justify-start text-neutral-400 text-base font-normal font-['Inter'] leading-6">
                    {iban || account_number}
                </div>
            </div>
            <div className="inline-flex justify-start items-start gap-4">
                <div
                    onClick={onDelete}
                    className="w-32 px-3 py-2 rounded-md outline outline-2 outline-offset-[-2px] outline-emerald-950 flex justify-center items-center gap-2 overflow-hidden cursor-pointer hover:bg-red-50 hover:outline-red-900 hover:text-red-900 transition-colors"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-4 h-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.14-2.006-2.14H9.796c-1.096 0-2.006.96-2.006 2.14v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                    </svg>
                    <div className="justify-start text-emerald-950 text-sm font-bold font-['Inter'] leading-6 group-hover:text-red-900">Supprimer</div>
                </div>
            </div>
        </div>
    );
};

export default BeneficiaryCard;
