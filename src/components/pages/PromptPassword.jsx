import { useEffect } from 'react';

const PromptPassword = () => {
    useEffect(() => {
        const { ApperUI } = window.ApperSDK;
        ApperUI.showPromptPassword('#authentication-prompt-password');
    }, []);

    return (
        <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
            <div className="flex-1 py-12 px-5 flex justify-center items-center">
                <div id="authentication-prompt-password" className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm mx-auto w-[400px] max-w-full p-10 rounded-2xl border border-white/10"></div>
            </div>
        </div>
    );
};

export default PromptPassword;