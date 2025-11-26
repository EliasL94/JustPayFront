import MenuIcon from '../assets/SVG_Header/icon-menu.svg';
import BrandIcon from '../assets/SVG_Header/Icon.svg';
import SearchIcon from '../assets/SVG_Header/Icon-1.svg';
import ProfileIcon from '../assets/SVG_Header/jira_ops.svg';

const Header = () => {
    return (
        <div className="w-full px-6 py-4 bg-white border-b border-emerald-50 inline-flex justify-between items-center overflow-hidden">
            <div className="flex justify-start items-center gap-4">
                <div data-icon-left="true" data-icon-only="True" data-icon-right="true" data-size="XSmall" data-states="Default" data-type="Secondary" className="w-8 h-8 px-4 py-2 bg-white rounded-full shadow-[0px_1px_2px_0px_rgba(13,13,18,0.06)] outline outline-1 outline-offset-[-1px] outline-emerald-50 flex justify-center items-center gap-2">
                    <img src={MenuIcon} alt="Menu" className="w-4 h-4 object-contain" />
                </div>
                <div className="flex justify-start items-center gap-1.5">
                    <img src={ProfileIcon} alt="Profile" className="w-12 h-12 object-contain" />
                    <div className="justify-start text-emerald-950 text-2xl font-semibold font-['PolySans_Qonto'] uppercase leading-10">Finvo</div>
                </div>
            </div>
            <div className="flex justify-start items-center gap-4">
                <div data-icon="true" data-label="false" data-value="true" data-optional="false" className="w-72 inline-flex flex-col justify-end items-start gap-2">
                    <div className="self-stretch h-12 relative bg-white rounded-md outline outline-2 outline-offset-[-2px] outline-slate-300 flex items-center px-3">
                        <div className="flex-1 text-emerald-950 text-base font-normal font-['Inter'] leading-6">Rechercher une transaction</div>
                        <img src={SearchIcon} alt="Search" className="w-6 h-6 object-contain" />
                    </div>
                </div>
                <div className="w-12 h-12 p-2.5 bg-emerald-50 rounded-[47px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                    <img src={BrandIcon} alt="Brand" className="w-6 h-6 object-contain" />
                </div>
            </div>
        </div>
    );
};

export default Header;
