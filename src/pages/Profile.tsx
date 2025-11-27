import { useState, useEffect } from 'react';
import ProfileHeader from '../components/profile/ProfileHeader';
import ChangePasswordForm from '../components/profile/ChangePasswordForm';
import ChangeEmailForm from '../components/profile/ChangeEmailForm';

const Profile = () => {
    const [userDetails, setUserDetails] = useState<any>(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const response = await fetch('http://127.0.0.1:8000/auth/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setUserDetails(data);
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, []);

    return (
        <div className="w-full h-full inline-flex justify-start items-start gap-6 bg-slate-50 min-h-screen">
            <div className="self-stretch px-4 md:px-6 py-12 inline-flex flex-col justify-start items-start gap-12 w-full">
                <ProfileHeader />
                <div className="w-full inline-flex justify-start items-start gap-6 flex-wrap">
                    <ChangePasswordForm />
                    <ChangeEmailForm currentEmail={userDetails?.email} />
                </div>
            </div>
        </div>
    );
};

export default Profile;
