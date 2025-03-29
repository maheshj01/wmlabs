import React from "react";

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen gradient text-white flex flex-col items-center justify-center px-6 py-12">
            <div className="max-w-3xl text-center">
                <h1 className="text-4xl font-bold mb-6 animate-fade-in">Privacy Policy</h1>
                <p className="text-lg mb-4 opacity-80 animate-fade-in delay-200">
                    Your privacy is important to us. This policy explains how we collect, use, and protect your data while using our services.
                </p>

                <div className="bg-white bg-opacity-10 p-6 rounded-lg text-left animate-fade-in delay-400">
                    <h2 className="text-2xl font-semibold mb-3">User Responsibility</h2>
                    <p className="mb-4 opacity-90">
                        Users are responsible for managing their Gemini API key and its usage within the extension. We do not store, process, or have access to your API key.
                    </p>

                    <h2 className="text-2xl font-semibold mb-3">Information Collection and Use</h2>
                    <p className="mb-4 opacity-90">
                        We do not collect or store any user data on our servers. All data required for the extension's functionality is stored locally within your browser's Chrome local storage.
                    </p>

                    <h2 className="text-2xl font-semibold mb-3">Third-Party Services</h2>
                    <p className="mb-4 opacity-90">
                        Our app may use third-party services in the future, such as analytics or authentication providers, that collect data as per their respective policies.
                    </p>

                    <h2 className="text-2xl font-semibold mb-3">Security</h2>
                    <p className="mb-4 opacity-90">
                        We take reasonable measures to protect your data, but no digital platform is 100% secure. Always be cautious when sharing personal information online.
                    </p>

                    <h2 className="text-2xl font-semibold mb-3">Children’s Privacy</h2>
                    <p className="mb-4 opacity-90">
                        Our services are not directed at children under 13. We do not knowingly collect personal data from minors.
                    </p>

                    <h2 className="text-2xl font-semibold mb-3">Changes to This Policy</h2>
                    <p className="mb-4 opacity-90">
                        We may update this Privacy Policy as needed. Please check this page periodically for any changes.
                    </p>
                    <p>This policy is effective as of Mar 29, 2025</p>

                    <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
                    <span>
                        If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at &nbsp;
                        <a href={`mailto:${process.env.REACT_APP_CONTACT_EMAIL}`} className="text-black hover:underline">
                            {process.env.REACT_APP_CONTACT_EMAIL}
                        </a>
                    </span>
                </div>

                <div className="mt-6 text-sm opacity-80 hover:opacity-100 transition-opacity">
                    <a href="/" className="hover:underline">
                        Back to Home
                    </a>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
