import React from 'react';
import { Link } from 'react-router-dom';
import { bot_url } from '../api/configuration';

const TermsCondition = () => {
    return (
        <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Terms and Conditions</h1>
            <p className="mb-6 text-gray-700">
                Welcome to ORCA Bot! These terms and conditions outline the rules and regulations for the use of our chatbot.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">1. Acceptance of Terms</h2>
            <p className="mb-4 text-gray-700">
                By accessing and using ORCA Bot, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">2. Use of the Chatbot</h2>
            <p className="mb-4 text-gray-700">
                The chatbot is provided for informational purposes only. It is not a substitute for professional advice of any kind. Do not share personal information such as your social security number, bank information, or credit card numbers when interacting with the bot.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">3. Privacy</h2>
            <p className="mb-4 text-gray-700">
                Your use of the chatbot is also governed by our Privacy Policy. Please review our Privacy Policy, which also governs the Site and informs users of our data collection practices.
            </p>
            <p className="mb-4 text-gray-700">
                <Link to="/privacy-policy" className="text-blue-500 hover:underline">Privacy Policy</Link>
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">4. User Responsibilities</h2>
            <p className="mb-4 text-gray-700">
                As a user of the chatbot, you agree to use the service responsibly and not to engage in any activity that could harm the chatbot or other users. You agree not to use the chatbot for any unlawful or prohibited purpose.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">5. Limitation of Liability</h2>
            <p className="mb-4 text-gray-700">
                In no event shall ORCA Bot, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your use or inability to use the chatbot; (ii) any unauthorized access to or use of our servers and/or any personal information stored therein.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">6. Changes to Terms</h2>
            <p className="mb-4 text-gray-700">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">7. Contact Us</h2>
            <p className="mb-4 text-gray-700">
                If you have any questions about these Terms, please contact us at:
            </p>
            <p className="mb-4 text-gray-700">
                <strong>Email:</strong> adminisatrative office email
            </p>
            <p className="mb-4 text-gray-700">
                <strong>Address:</strong> STI College - Ortigas Cainta, Rizal
            </p>
        </div>
    );
};

export default TermsCondition;