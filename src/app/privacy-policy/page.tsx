import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Privacy Policy | EduExpress International",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-gray-50 pt-24 pb-16">
      {/* Floating Elements */}
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none prose-p:text-gray-600 prose-headings:text-gray-800">
            <p className="text-sm text-gray-500">Last Updated: September 21, 2025</p>

            <h2>Introduction</h2>
            <p>
              EduExpress International ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or engage with us for lead generation campaigns through platforms like Google and Facebook Ads.
            </p>

            <h2>Information We Collect</h2>
            <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
            <ul>
              <li>
                <strong>Personal Data:</strong> Personally identifiable information, such as your name, email address, date of birth, and intended major, that you voluntarily give to us when you fill out our "Apply Now" form or other contact forms.
              </li>
              <li>
                <strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.
              </li>
              <li>
                <strong>Data From Social Networks:</strong> User information from social networking sites, such as Facebook, including your name, your social network username, location, gender, birth date, email address, profile picture, and public data for contacts, if you connect your account to such social networks.
              </li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
            <ul>
              <li>Respond to your inquiries and provide you with information about our services.</li>
              <li>Process your application and forward it to partner universities.</li>
              <li>Send you marketing and promotional communications, in line with your preferences.</li>
              <li>Analyze website usage and trends to improve our services and user experience.</li>
              <li>Target and measure the effectiveness of our advertising campaigns on platforms like Google and Facebook.</li>
            </ul>

            <h2>Disclosure of Your Information</h2>
            <p>
              We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
            </p>
            <ul>
                <li><strong>With Partner Institutions:</strong> We share your application details with the universities and educational institutions you are applying to.</li>
                <li><strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law.</li>
                <li><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including data analysis, email delivery, hosting services, and marketing assistance.</li>
            </ul>

            <h2>Tracking Technologies (Ad Pixels)</h2>
            <p>
              We use tracking technologies like cookies and pixels (from Google, Facebook, etc.) on the Site to help customize the user experience and measure the effectiveness of our advertising campaigns. When you submit a form, these pixels may be triggered to record a "Lead" or "Conversion" event. This helps us understand the performance of our ads and provide you with more relevant content.
            </p>

            <h2>Security of Your Information</h2>
            <p>
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have questions or comments about this Privacy Policy, please contact us at:
              <br />
              <strong>EduExpress International</strong>
              <br />
              Email: info@eduexpressint.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

