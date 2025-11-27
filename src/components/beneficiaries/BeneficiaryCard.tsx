interface BeneficiaryCardProps {
    name: string;
    iban: string;
    onEdit?: () => void;
    onDelete?: () => void;
}

const BeneficiaryCard = ({ name, iban, onEdit, onDelete }: BeneficiaryCardProps) => {
    return (
        <div className="self-stretch p-6 bg-white rounded-2xl inline-flex flex-col justify-start items-start gap-4 overflow-hidden border border-gray-100 shadow-sm">
            <div className="self-stretch inline-flex justify-start items-start gap-4">
                <div className="w-96 justify-start text-emerald-950 text-lg font-normal font-['Inter'] leading-7">{name}</div>
            </div>
            <div className="self-stretch inline-flex justify-start items-center gap-2.5">
                <div className="justify-start text-emerald-950 text-base font-semibold font-['Inter'] leading-6"> </div>
                <div className="justify-start text-neutral-400 text-base font-normal font-['Inter'] leading-6">{iban}</div>
            </div>
            <div className="w-40 inline-flex justify-start items-start gap-4">
                <div
                    onClick={onEdit}
                    className="px-3 py-2 rounded-md outline outline-2 outline-offset-[-2px] outline-emerald-950 flex justify-center items-center gap-2 overflow-hidden cursor-pointer hover:bg-emerald-50 transition-colors"
                >
                    {/* Placeholder icon for Edit */}
                    <div className="w-3.5 h-4 relative bg-gray-200 rounded-sm"></div>
                    <div className="justify-start text-emerald-950 text-sm font-bold font-['Inter'] leading-6">Modifier</div>
                </div>
                <div
                    onClick={onDelete}
                    className="px-3 py-2 rounded-md outline outline-2 outline-offset-[-2px] outline-emerald-950 flex justify-center items-center gap-2 overflow-hidden cursor-pointer hover:bg-red-50 hover:outline-red-900 hover:text-red-900 transition-colors"
                >
                    {/* Placeholder icon for Delete */}
                    <div className="w-3.5 h-4 relative bg-gray-200 rounded-sm"></div>
                    <div className="justify-start text-emerald-950 text-sm font-bold font-['Inter'] leading-6 group-hover:text-red-900">Supprimer</div>
                </div>
            </div>
        </div>
    );
};

export default BeneficiaryCard;
