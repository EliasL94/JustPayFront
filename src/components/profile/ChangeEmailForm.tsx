interface ChangeEmailFormProps {
    currentEmail?: string;
}

const ChangeEmailForm = ({ currentEmail }: ChangeEmailFormProps) => {
    return (
        <div className="w-80 p-6 bg-white inline-flex flex-col justify-start items-start gap-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="justify-start text-black text-xl font-bold font-['Inter'] leading-7">Changer d’email</div>

            {/* Email */}
            <div className="self-stretch flex flex-col justify-end items-start gap-1.5">
                <div className="self-stretch inline-flex justify-start items-start gap-2">
                    <div className="flex-1 justify-start text-gray-700 text-xs font-semibold font-['Inter'] leading-3">Email</div>
                </div>
                <input
                    type="email"
                    defaultValue={currentEmail}
                    placeholder={currentEmail || "votre@email.com"}
                    className="self-stretch h-10 px-3 bg-white rounded-[5.03px] outline outline-[1.68px] outline-offset-[-1.68px] outline-slate-300 focus:outline-emerald-500"
                />
            </div>

            <div className="inline-flex justify-start items-center gap-5 pt-2">
                <button className="w-28 px-4 py-3 bg-teal-300 rounded flex justify-center items-center gap-1.5 overflow-hidden hover:bg-teal-400 transition-colors">
                    <div className="justify-start text-emerald-950 text-sm font-bold font-['Inter'] leading-4">Modifier</div>
                </button>
            </div>
        </div>
    );
};

export default ChangeEmailForm;
