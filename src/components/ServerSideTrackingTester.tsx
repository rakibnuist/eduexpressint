'use client';

import React, { useState } from 'react';
import { useServerSideTracking } from './ServerSideTracking';

export default function ServerSideTrackingTester() {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [stapeUrl, setStapeUrl] = useState('');
  const [isConfigured, setIsConfigured] = useState(false);

  const serverSideTracking = useServerSideTracking();

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testServerSideTracking = () => {
    const success = serverSideTracking.testServerSideTracking('SERVER_TEST_001');
    if (success) {
      addResult('✅ Server-side tracking test completed successfully');
      addResult('📊 Check your GTM Debug Console and Meta Events Manager');
    } else {
      addResult('❌ Server-side tracking test failed');
    }
  };

  const testLeadTracking = () => {
    serverSideTracking.trackServerSideLead({
      email: 'test.lead@eduexpress.com',
      phone: '+1-555-TEST-001',
      firstName: 'Test',
      lastName: 'Student',
      destination: 'United Kingdom',
      studyLevel: 'Masters',
      programType: 'Computer Science',
      source: 'Server-Side Tester',
      content_name: 'Test Lead Generation',
      value: 1,
      currency: 'USD'
    });
    addResult('✅ Server-side lead tracking event sent');
  };

  const testFormSubmission = () => {
    serverSideTracking.trackServerSideFormSubmission({
      email: 'test.form@eduexpress.com',
      phone: '+1-555-FORM-001',
      formName: 'Server-Side Test Form',
      formType: 'Lead Generation Test',
      contentName: 'Test Form Submission',
      value: 1,
      currency: 'USD'
    });
    addResult('✅ Server-side form submission event sent');
  };

  const testConversion = () => {
    serverSideTracking.trackServerSideConversion({
      event_name: 'Purchase',
      value: 100,
      currency: 'USD',
      content_name: 'Test Conversion',
      email: 'test.conversion@eduexpress.com',
      phone: '+1-555-CONV-001',
      transaction_id: `test_${Date.now()}`
    });
    addResult('✅ Server-side conversion event sent');
  };

  const testPageView = () => {
    serverSideTracking.trackServerSidePageView({
      page_title: 'Server-Side Test Page',
      page_location: window.location.href,
      content_category: 'Testing',
      user_data: {
        test_user: true,
        timestamp: new Date().toISOString()
      }
    });
    addResult('✅ Server-side page view event sent');
  };

  const clearResults = () => {
    setTestResults([]);
  };

  const checkDataLayer = () => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      const recentEvents = window.dataLayer.slice(-10);
      addResult(`📊 Recent dataLayer events: ${recentEvents.length}`);
      recentEvents.forEach((event, index) => {
        if (event.event) {
          addResult(`  ${index + 1}. ${event.event} - ${event.event_name || 'N/A'}`);
        }
      });
    } else {
      addResult('❌ dataLayer not found or empty');
    }
  };

  // Only show when specifically enabled or in development
  if (typeof window !== 'undefined' && !window.location.search.includes('test-server-side') && process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="fixed bottom-20 right-4 z-50">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-lg mb-2"
      >
        {isVisible ? 'Hide' : 'Show'} Server-Side Tester
      </button>
      
      {isVisible && (
        <div className="bg-white border border-gray-300 rounded-lg shadow-xl p-4 w-96 max-h-96 overflow-y-auto">
          <h3 className="font-bold text-lg mb-3 text-gray-800">Server-Side Tracking Tester</h3>
          
          {!isConfigured && (
            <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 rounded-lg">
              <h4 className="font-semibold text-sm text-yellow-800 mb-2">Setup Required</h4>
              <p className="text-xs text-yellow-700 mb-2">
                To use server-side tracking, you need to configure your Stape URL:
              </p>
              <input
                type="url"
                value={stapeUrl}
                onChange={(e) => setStapeUrl(e.target.value)}
                placeholder="https://your-container.stape.io"
                className="w-full px-2 py-1 text-xs border border-yellow-300 rounded mb-2"
              />
              <button
                onClick={() => setIsConfigured(true)}
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-2 py-1 rounded text-xs"
              >
                Configure
              </button>
            </div>
          )}

          <div className="space-y-2 mb-4">
            <button
              onClick={testServerSideTracking}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded text-sm"
            >
              Run Full Server-Side Test
            </button>
            
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={testLeadTracking}
                className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs"
              >
                Test Lead
              </button>
              
              <button
                onClick={testFormSubmission}
                className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs"
              >
                Test Form
              </button>
              
              <button
                onClick={testConversion}
                className="bg-orange-600 hover:bg-orange-700 text-white px-2 py-1 rounded text-xs"
              >
                Test Conversion
              </button>
              
              <button
                onClick={testPageView}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-1 rounded text-xs"
              >
                Test PageView
              </button>
            </div>

            <button
              onClick={checkDataLayer}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-xs"
            >
              Check DataLayer
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
            <p><strong>Verification Steps:</strong></p>
            <p>1. Check browser console for dataLayer events</p>
            <p>2. Use GTM Preview mode to see server-side events</p>
            <p>3. Monitor Meta Events Manager for conversions</p>
            <p>4. Verify Stape container receives events</p>
          </div>

          {isConfigured && stapeUrl && (
            <div className="mt-3 p-2 bg-green-100 border border-green-400 rounded">
              <p className="text-xs text-green-700">
                <strong>Configured:</strong> {stapeUrl}
              </p>
              <p className="text-xs text-green-600">
                Events will be sent to your server-side container
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
