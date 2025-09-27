'use client';

import { useState } from 'react';
import { trackLead, trackFormSubmission, trackViewContent, trackSearch } from '@/components/TrackLead';
import { useMetaPixel } from '@/components/MetaPixel';

export default function MetaPixelTest() {
  const [testResults, setTestResults] = useState<string[]>([]);
  const metaPixel = useMetaPixel();

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testLeadTracking = async () => {
    try {
      await trackLead('Test Lead Generated', {
        email: 'test@example.com',
        phone: '+1234567890',
        destination: 'United Kingdom',
        university: 'Test University',
        program: 'Computer Science',
        source: 'Test',
        value: 1,
        currency: 'USD'
      });
      addResult('✅ Lead tracking test completed');
    } catch (error) {
      addResult(`❌ Lead tracking test failed: ${error}`);
    }
  };

  const testFormSubmission = async () => {
    try {
      await trackFormSubmission('Test Form', {
        form_type: 'Lead Generation',
        lead_data: { name: 'Test User', email: 'test@example.com' }
      });
      addResult('✅ Form submission tracking test completed');
    } catch (error) {
      addResult(`❌ Form submission tracking test failed: ${error}`);
    }
  };

  const testViewContent = async () => {
    try {
      await trackViewContent('Test University Page', {
        content_category: 'Education',
        content_ids: ['university_123'],
        value: 0
      });
      addResult('✅ View content tracking test completed');
    } catch (error) {
      addResult(`❌ View content tracking test failed: ${error}`);
    }
  };

  const testSearch = async () => {
    try {
      await trackSearch('computer science', 'Education');
      addResult('✅ Search tracking test completed');
    } catch (error) {
      addResult(`❌ Search tracking test failed: ${error}`);
    }
  };

  const testCustomEvent = async () => {
    try {
      await metaPixel.trackCustomEvent('TestCustomEvent', {
        test_data: 'This is a test custom event',
        timestamp: new Date().toISOString()
      });
      addResult('✅ Custom event tracking test completed');
    } catch (error) {
      addResult(`❌ Custom event tracking test failed: ${error}`);
    }
  };

  const testPageView = async () => {
    try {
      await metaPixel.pageView();
      addResult('✅ Page view tracking test completed');
    } catch (error) {
      addResult(`❌ Page view tracking test failed: ${error}`);
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Meta Pixel Integration Test</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Test Controls</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <button
            onClick={testLeadTracking}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Test Lead Tracking
          </button>
          <button
            onClick={testFormSubmission}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Test Form Submission
          </button>
          <button
            onClick={testViewContent}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Test View Content
          </button>
          <button
            onClick={testSearch}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            Test Search
          </button>
          <button
            onClick={testCustomEvent}
            className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
          >
            Test Custom Event
          </button>
          <button
            onClick={testPageView}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Test Page View
          </button>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-700">Test Results</h3>
          <button
            onClick={clearResults}
            className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors text-sm"
          >
            Clear Results
          </button>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
        {testResults.length === 0 ? (
          <p className="text-gray-500 italic">No test results yet. Click a test button above to start testing.</p>
        ) : (
          <div className="space-y-2">
            {testResults.map((result, index) => (
              <div key={index} className="text-sm font-mono bg-white p-2 rounded border">
                {result}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">Instructions:</h4>
        <ol className="text-sm text-blue-800 space-y-1">
          <li>1. Open your browser's Developer Tools (F12)</li>
          <li>2. Go to the Console tab</li>
          <li>3. Click the test buttons above</li>
          <li>4. Check the console for Meta Pixel tracking messages</li>
          <li>5. Verify events appear in Facebook Events Manager (if pixel ID is configured)</li>
        </ol>
      </div>

      <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
        <h4 className="font-semibold text-yellow-900 mb-2">Note:</h4>
        <p className="text-sm text-yellow-800">
          Make sure to set your <code className="bg-yellow-200 px-1 rounded">NEXT_PUBLIC_META_PIXEL_ID</code> environment variable 
          for the tracking to work properly. Without a valid pixel ID, events will only be logged to the console.
        </p>
      </div>
    </div>
  );
}
