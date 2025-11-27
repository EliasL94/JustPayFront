import IconPlus from '../../assets/SVG_Dashboard/icon-plus.svg';

interface BeneficiariesHeaderProps {
    onAddBeneficiary?: () => void;
    totalAssets: string;
}

const BeneficiariesHeader = ({ onAddBeneficiary, totalAssets }: BeneficiariesHeaderProps) => {
    return (
        <div className="self-stretch inline-flex justify-between items-start">
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-2.5">
                <div className="justify-start text-emerald-950 text-4xl font-bold font-['Inter'] leading-[48px] tracking-tight [text-shadow:_0px_4px_4px_rgb(0_0_0_/_0.25)]">Mes beneficiaires</div>
                <div className="justify-start">
                    <span className="text-neutral-400 text-lg font-normal font-['Inter'] leading-7">Total des actifs: </span>
                    <span className="text-neutral-400 text-lg font-bold font-['Inter'] leading-7">{totalAssets}</span>
                </div>
            </div>
            <div className="flex justify-start items-center gap-2.5">
                <div
                    onClick={onAddBeneficiary}
                    className="px-6 py-4 rounded-md outline outline-2 outline-offset-[-2px] outline-emerald-950 flex justify-center items-center gap-2 overflow-hidden cursor-pointer hover:bg-emerald-50 transition-colors"
                >
                    <div className="justify-start text-emerald-950 text-lg font-bold font-['Inter'] leading-6">Ajouter un beneficiaire</div>
                    <div className="w-4 h-6 relative flex justify-center items-center">
                        <img src={IconPlus} alt="Add" className="w-4 h-4" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BeneficiariesHeader;
