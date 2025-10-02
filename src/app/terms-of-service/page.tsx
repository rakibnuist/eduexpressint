import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | EduExpress International',
  description: 'Terms of Service for EduExpress International - Study Abroad Services',
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using EduExpress International's services, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Services Provided</h2>
              <p className="text-gray-700 mb-4">
                EduExpress International provides educational consulting services including but not limited to:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>University application assistance</li>
                <li>Visa processing support</li>
                <li>Scholarship guidance</li>
                <li>Career counseling</li>
                <li>Study abroad program recommendations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Client Responsibilities</h2>
              <p className="text-gray-700 mb-4">
                Clients are responsible for:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Providing accurate and complete information</li>
                <li>Meeting application deadlines</li>
                <li>Paying required fees and charges</li>
                <li>Following immigration and university requirements</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                EduExpress International shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Privacy Policy</h2>
              <p className="text-gray-700 mb-4">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>EduExpress International</strong><br />
                  House: 12/1, Ground Floor, Road: 4/A, Dhanmondi<br />
                  Dhaka - 1209, Bangladesh<br />
                  Email: info@eduexpressint.com<br />
                  Phone: +880 1983-333566
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
