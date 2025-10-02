'use client';

import React, { useState } from 'react';
import { useMetaPixel } from './MetaPixel';

export default function MetaPixelTester() {
  const metaPixel = useMetaPixel();
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const runSingleTest = () => {
    const success = metaPixel.trackTestEvent('TEST65812');
    if (success) {
      addResult('✅ Single test event sent successfully');
    } else {
      addResult('❌ Failed to send test event');
    }
  };

  const runFullTestSuite = () => {
    const success = metaPixel.runTestSuite('TEST65812');
    if (success) {
      addResult('✅ Full test suite completed successfully');
    } else {
      addResult('❌ Failed to run test suite');
    }
  };

  const testLead = () => {
    metaPixel.trackLead({
      content_name: 'Test Lead from Tester',
      content_category: 'Testing',
      value: 1,
      currency: 'USD',
      email: 'test@example.com',
      destination: 'Test Destination',
      source: 'Meta Pixel Tester'
    });
    addResult('✅ Test lead event sent');
  };

  const testFormSubmission = () => {
    metaPixel.trackFormSubmission({
      form_name: 'Test Form',
      form_type: 'Testing',
      content_name: 'Test Form Submission',
      value: 1,
      currency: 'USD'
    });
    addResult('✅ Test form submission event sent');
  };

  const clearResults = () => {
    setTestResults([]);
  };

  // Only show in development or when specifically enabled
  if (typeof window !== 'undefined' && !window.location.search.includes('test-pixel')) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg mb-2"
      >
        {isVisible ? 'Hide' : 'Show'} Meta Pixel Tester
      </button>
      
      {isVisible && (
        <div className="bg-white border border-gray-300 rounded-lg shadow-xl p-4 w-80 max-h-96 overflow-y-auto">
          <h3 className="font-bold text-lg mb-3 text-gray-800">Meta Pixel Tester</h3>
          <p className="text-sm text-gray-600 mb-3">
            Test Code: <code className="bg-gray-100 px-1 rounded">TEST65812</code>
          </p>
          
          <div className="space-y-2 mb-4">
            <button
              onClick={runSingleTest}
              className="w-full bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm"
            >
              Send Test Event
            </button>
            
            <button
              onClick={runFullTestSuite}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded text-sm"
            >
              Run Full Test Suite
            </button>
            
            <button
              onClick={testLead}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 rounded text-sm"
            >
              Test Lead Event
            </button>
            
            <button
              onClick={testFormSubmission}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded text-sm"
            >
              Test Form Submission
            </button>
          </div>
          
          <div className="border-t pt-3">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold text-sm text-gray-700">Test Results:</h4>
              <button
                onClick={clearResults}
                className="text-xs text-red-600 hover:text-red-800"
              >
                Clear
              </button>
            </div>
            
            <div className="bg-gray-50 rounded p-2 max-h-32 overflow-y-auto">
              {testResults.length === 0 ? (
                <p className="text-xs text-gray-500">No tests run yet</p>
              ) : (
                testResults.map((result, index) => (
                  <div key={index} className="text-xs text-gray-700 mb-1">
                    {result}
                  </div>
                ))
              )}
            </div>
          </div>
          
          <div className="mt-3 text-xs text-gray-500">
            <p>• Check browser console for detailed logs</p>
            <p>• Monitor Events Manager for real-time data</p>
            <p>• Use Meta Pixel Helper extension</p>
          </div>
        </div>
      )}
    </div>
  );
}
