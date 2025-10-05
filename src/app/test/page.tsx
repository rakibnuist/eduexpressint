import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Test Page - EduExpress International',
  description: 'Test page for EduExpress International website functionality',
  robots: {
    index: false,
    follow: false,
  },
};

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Test Page
          </h1>
          <p className="text-lg text-gray-600">
            This is a test page for EduExpress International
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            System Status
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-green-800 mb-2">
                ✅ Website Status
              </h3>
              <p className="text-green-600">
                EduExpress International website is running successfully
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-blue-800 mb-2">
                🔧 Test Environment
              </h3>
              <p className="text-blue-600">
                This page is used for testing website functionality
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Available Test Endpoints
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
                <span className="font-mono text-sm">/api/test-db</span>
                <span className="text-sm text-gray-600">Database connection test</span>
              </div>
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
                <span className="font-mono text-sm">/api/health</span>
                <span className="text-sm text-gray-600">System health check</span>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <a 
              href="/" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
