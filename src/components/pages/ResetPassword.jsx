import { useEffect } from 'react';

const ResetPassword = () => {
    useEffect(() => {
        const { ApperUI } = window.ApperSDK;
        ApperUI.showResetPassword('#authentication-reset-password');
    }, []);

    return (
        <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
            <div className="flex-1 py-12 px-5 flex justify-center items-center">
                <div id="authentication-reset-password" className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm mx-auto w-[400px] max-w-full p-10 rounded-2xl border border-white/10"></div>
            </div>
        </div>
    );
};

export default ResetPassword;