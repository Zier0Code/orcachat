import React from 'react'

const Help = () => {
    return (
        <>
            <div className="container mx-auto p-4 overflow-y-auto max-h-[450px]">
                <h1 className="text-xl md:text-2xl font-bold mb-4 dark:text-white">Help & Support</h1>
                <p className="text-black dark:text-white/50 mb-8">
                    Welcome to the Help page. Here you can find answers to frequently asked questions and contact information for further support.
                </p>

                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 dark:text-white">Frequently Asked Questions</h2>
                    <div className="mb-4">
                        <button className="w-full text-left p-2 dark:bg-inherit dark:text-white bg-gray-100 rounded-lg focus:outline-none border-b-2">
                            <h3 className="text-xl font-medium">How do I use the chatbot?</h3>
                        </button>
                        <div className="p-4d text-black dark:text-white/50 pt-2">
                            <p>
                                To use the chatbot, simply type your question in the chat window and press enter. The chatbot will respond with the information you need.
                            </p>
                        </div>
                    </div>
                    <div className="mb-4">
                        <button className="w-full text-left p-2 dark:bg-inherit dark:text-white bg-gray-100 rounded-lg focus:outline-none border-b-2">
                            <h3 className="text-xl font-medium">What kind of questions can I ask?</h3>
                        </button>
                        <div className="p-4 text-black dark:text-white/50">
                            <p>
                                You can ask the chatbot any questions related to our services. If the chatbot cannot answer your question, you can put a feedbacl to the admin.
                            </p>
                        </div>
                    </div>
                    <div className="mb-4">
                        <button className="w-full text-left p-2 dark:bg-inherit dark:text-white bg-gray-100 rounded-lg focus:outline-none border-b-2">
                            <h3 className="text-xl font-medium">How do I contact support?</h3>
                        </button>
                        <div className="p-4 text-black dark:text-white/50">
                            <p>
                                If you need further assistance, you can contact our support team via email at support@example.com or call us at (123) 456-7890.
                            </p>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-4 dark:text-white text-black">Contact Us</h2>
                    <p className="text-black dark:text-white/50 mb-4">
                        If you have any other questions or need further assistance, please feel free to reach out to us.
                    </p>
                    <a href="mailto:momoxsana02@gmail.com" className="inline-block px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-500/60">
                        Email Support
                    </a>
                </div>
            </div>
        </>
    )
}

export default Help