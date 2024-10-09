import React from 'react';
import { bot_url } from '../api/configuration';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Privacy Policy</h1>
            <p className="mb-6 text-gray-700">
                Your privacy is important to us. It is ORCA's policy to respect your privacy regarding any information we may collect from you across our website, <Link to={bot_url} className="text-blue-500 hover:underline">ORCA Bot</Link>, and other sites we own and operate.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">1. Information We Collect</h2>
            <p className="mb-4 text-gray-700">
                We only collect information about you if we have a reason to do so — for example, to provide our services, to communicate with you, or to make our services better.
            </p>
            <ul className="list-disc list-inside mb-6 text-gray-700">
                <li>Personal identification information (Name, email address, phone number, etc.)</li>
                <li>Log data (IP address, browser type, etc.)</li>
                <li>Cookies and usage data</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">2. How We Use Information</h2>
            <p className="mb-4 text-gray-700">
                We use the information we collect in various ways, including to:
            </p>
            <ul className="list-disc list-inside mb-6 text-gray-700">
                <li>Provide, operate, and maintain our website</li>
                <li>Improve, personalize, and expand our website</li>
                <li>Understand and analyze how you use our website</li>
                <li>Develop new products, services, features, and functionality</li>
                <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
                <li>Process your transactions</li>
                <li>Send you emails</li>
                <li>Find and prevent fraud</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">3. Information Sharing</h2>
            <p className="mb-4 text-gray-700">
                We do not share your personal information with anyone except to comply with the law, develop our products, or protect our rights.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">4. Data Security</h2>
            <p className="mb-4 text-gray-700">
                We take reasonable measures to protect your personal information from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">5. Your Data Protection Rights</h2>
            <p className="mb-4 text-gray-700">
                Depending on your location, you may have the following rights regarding your personal data:
            </p>
            <ul className="list-disc list-inside mb-6 text-gray-700">
                <li>The right to access – You have the right to request copies of your personal data.</li>
                <li>The right to rectification – You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.</li>
                <li>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</li>
                <li>The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
                <li>The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.</li>
                <li>The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">6. Changes to This Privacy Policy</h2>
            <p className="mb-4 text-gray-700">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">7. Contact Us</h2>
            <p className="mb-4 text-gray-700">
                If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="mb-4 text-gray-700">
                <strong>Email:</strong> angeloavila030@gmail.com
            </p>
            <p className="mb-4 text-gray-700">
                <strong>Address:</strong> ORCA Chatbot STI - College Ortigas-Cainta
            </p>
        </div>
    );
};

export default PrivacyPolicy;