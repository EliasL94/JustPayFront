import ProfileHeader from '../components/profile/ProfileHeader';
import ChangePasswordForm from '../components/profile/ChangePasswordForm';
import ChangeEmailForm from '../components/profile/ChangeEmailForm';

const Profile = () => {
    return (
        <div className="w-full h-full inline-flex justify-start items-start gap-6 bg-slate-50 min-h-screen">
            <div className="self-stretch px-6 py-12 inline-flex flex-col justify-start items-start gap-12 w-full">
                <ProfileHeader />
                <div className="inline-flex justify-start items-start gap-6 flex-wrap">
                    <ChangePasswordForm />
                    <ChangeEmailForm />
                </div>
            </div>
        </div>
    );
};

export default Profile;
