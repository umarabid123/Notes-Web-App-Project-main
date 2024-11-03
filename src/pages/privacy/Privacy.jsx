import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">
        Effective Date: [Insert Date]  
        [Your App Name] ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy outlines our practices regarding the collection, use, and disclosure of information that you may provide through our application. By using the app, you agree to the collection and use of information in accordance with this policy.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-4">1. Information We Collect</h2>
      <p className="mb-4">
        We collect the following types of information:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li><strong>Personal Information:</strong> When you create an account or use our app, you may be asked to provide personal information such as your name, email address, and profile picture.</li>
        <li><strong>Notes and Content:</strong> Any notes, images, or other content you create and store within the app will be collected and stored.</li>
        <li><strong>Usage Data:</strong> We may collect information about how the app is accessed and used, including your device's Internet Protocol address (e.g., IP address), browser type, pages visited, and other diagnostic data.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-4">2. How We Use Your Information</h2>
      <p className="mb-4">
        We may use the information we collect for various purposes, including:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>To provide and maintain our app.</li>
        <li>To notify you about changes to our app.</li>
        <li>To allow you to participate in interactive features of our app when you choose to do so.</li>
        <li>To provide customer support.</li>
        <li>To gather analysis or valuable information to improve our app.</li>
        <li>To monitor the usage of our app.</li>
        <li>To detect, prevent, and address technical issues.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-4">3. Data Security</h2>
      <p className="mb-4">
        We take reasonable measures to protect your information from unauthorized access, use, or disclosure. However, no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-4">4. Changes to This Privacy Policy</h2>
      <p className="mb-4">
        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-4">5. Contact Us</h2>
      <p className="mb-4">
        If you have any questions about this Privacy Policy, please contact us at: [Your Contact Information]
      </p>
    </div>
  );
};

export default PrivacyPolicy;
