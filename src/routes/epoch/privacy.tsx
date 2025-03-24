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
                    <h2 className="text-2xl font-semibold mb-3">Information Collection and Use</h2>
                    <p className="mb-4 opacity-90">
                        We may collect limited data to enhance your experience. However, personal data is never stored or shared beyond what is necessary for the app’s functionality.
                    </p>

                    <h2 className="text-2xl font-semibold mb-3">Third-Party Services</h2>
                    <p className="mb-4 opacity-90">
                        Our app may use third-party services, such as analytics or authentication providers, that collect data as per their respective policies.
                    </p>

                    <ul className="list-disc list-inside mb-4 opacity-90">
                        <li>
                            <a
                                href="https://www.google.com/policies/privacy/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                Google Play Services
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://firebase.google.com/policies/analytics"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                Google Analytics for Firebase
                            </a>
                        </li>
                    </ul>

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
