import BeneficiariesHeader from '../components/beneficiaries/BeneficiariesHeader';
import BeneficiaryCard from '../components/beneficiaries/BeneficiaryCard';

const Beneficiaries = () => {
    // Mock data
    const beneficiaries = [
        { id: 1, name: 'Jean Louis David', iban: 'FR76 1234 4321 0987...' },
        { id: 2, name: 'Jean Louis David', iban: 'FR76 1234 4321 0987...' },
        { id: 3, name: 'Jean Louis David', iban: 'FR76 1234 4321 0987...' },
        { id: 4, name: 'Jean Louis David', iban: 'FR76 1234 4321 0987...' },
    ];

    return (
        <div className="w-full h-full inline-flex justify-start items-start gap-6 bg-slate-50 min-h-screen">
            <div className="flex-1 self-stretch px-6 py-12 inline-flex flex-col justify-start items-start gap-12">
                <BeneficiariesHeader />
                <div className="self-stretch flex-1 inline-flex justify-start items-start gap-6">
                    <div className="w-full max-w-[925px] rounded-2xl inline-flex flex-col justify-start items-start gap-4">
                        {beneficiaries.map((beneficiary) => (
                            <BeneficiaryCard
                                key={beneficiary.id}
                                name={beneficiary.name}
                                iban={beneficiary.iban}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Beneficiaries;
