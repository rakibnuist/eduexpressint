'use client';

import React, { useState } from 'react';
import { useStapeTracking } from './StapeTracking';

export default function StapeTester() {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [stapeConfig, setStapeConfig] = useState<any>(null);

  const stapeTracking = useStapeTracking();

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const checkStapeConfig = () => {
    const config = stapeTracking.getConfig();
    setStapeConfig(config);
    
    if (config.is_configured) {
      addResult('✅ Stape configuration found');
      addResult(`📡 Stape URL: ${config.stape_url}`);
      addResult(`🏷️ Server GTM ID: ${config.server_gtm_id}`);
      addResult(`💰 Cost: ${config.cost}`);
    } else {
      addResult('❌ Stape not configured');
      addResult('ℹ️ Add NEXT_PUBLIC_STAPE_URL to environment');
    }
  };

  const testStapeConnection = () => {
    const success = stapeTracking.testStapeConnection();
    if (success) {
      addResult('✅ Stape test event sent');
      addResult('📊 Check GTM Preview and Meta Events Manager');
      addResult('🔍 Look for test_event_code: TEST65812');
    } else {
      addResult('❌ Stape connection test failed');
    }
  };

  const testStapeLead = () => {
    stapeTracking.trackLeadViaStape({
      email: 'test.stape@eduexpress.com',
      phone: '+1-555-STAPE-LEAD',
      firstName: 'Stape',
      lastName: 'Test',
      destination: 'United Kingdom',
      studyLevel: 'Masters',
      programType: 'Computer Science',
      source: 'Stape Test',
      content_name: 'Stape Lead Test',
      value: 1,
      currency: 'USD'
    });
    addResult('✅ Stape lead event sent');
    addResult('🎯 Event: Website → Stape → GTM → Meta');
  };

  const testStapePageView = () => {
    stapeTracking.trackPageViewViaStape({
      page_type: 'test',
      section: 'stape_testing',
      destination: 'United Kingdom',
    });
    addResult('✅ Stape page view sent');
    addResult('👁️ Event: Website → Stape → GTM → Meta');
  };

  const testStapeForm = () => {
    stapeTracking.trackFormSubmissionViaStape({
      email: 'test.form@eduexpress.com',
      phone: '+1-555-STAPE-FORM',
      form_name: 'Stape Test Form',
      form_type: 'Lead Generation',
    });
    addResult('✅ Stape form submission sent');
    addResult('📝 Event: Website → Stape → GTM → Meta');
  };

  const runFullStapeTest = () => {
    addResult('🚀 Starting Stape → GTM → Meta test suite...');
    checkStapeConfig();
    testStapeConnection();
    testStapeLead();
    testStapePageView();
    testStapeForm();
    addResult('🎉 Stape test suite completed!');
    addResult('📊 Check Meta Events Manager for server-side events');
  };

  const clearResults = () => {
    setTestResults([]);
    setStapeConfig(null);
  };

  // Only show when specifically enabled
  if (typeof window !== 'undefined' && !window.location.search.includes('test-stape')) {
    return null;
  }

  return (
    <div className="fixed bottom-44 right-4 z-50">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg shadow-lg mb-2 flex items-center gap-2"
      >
        <span className="text-lg">🚀</span>
        {isVisible ? 'Hide' : 'Show'} Stape Tester
      </button>
      
      {isVisible && (
        <div className="bg-white border border-gray-300 rounded-lg shadow-xl p-4 w-96 max-h-96 overflow-y-auto">
          <h3 className="font-bold text-lg mb-3 text-gray-800 flex items-center gap-2">
            <span className="text-xl">🚀</span>
            Stape → GTM → Meta Tester
          </h3>
          
          {!stapeConfig && (
            <div className="mb-4 p-3 bg-blue-100 border border-blue-400 rounded-lg">
              <h4 className="font-semibold text-sm text-blue-800 mb-2">🔧 Setup Required</h4>
              <div className="text-xs text-blue-700 space-y-1">
                <p><strong>1. Add to .env.local:</strong></p>
                <code className="block bg-blue-50 p-1 rounded text-xs">
                  NEXT_PUBLIC_STAPE_URL=https://your-container.stape.io
                </code>
                <p><strong>2. Configure Meta in GTM Server</strong></p>
                <p><strong>3. Test the connection</strong></p>
              </div>
            </div>
          )}

          {stapeConfig && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 rounded-lg">
              <h4 className="font-semibold text-sm text-green-800 mb-2">✅ Stape Configuration</h4>
              <div className="text-xs text-green-700 space-y-1">
                <p><strong>URL:</strong> {stapeConfig.stape_url}</p>
                <p><strong>GTM:</strong> {stapeConfig.server_gtm_id}</p>
                <p><strong>Cost:</strong> {stapeConfig.cost}</p>
                <p><strong>Status:</strong> {stapeConfig.is_configured ? 'Ready' : 'Not configured'}</p>
              </div>
            </div>
          )}

          <div className="space-y-2 mb-4">
            <button
              onClick={runFullStapeTest}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 rounded text-sm flex items-center justify-center gap-2"
            >
              <span>🚀</span> Run Stape Test Suite
            </button>
            
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={checkStapeConfig}
                className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs"
              >
                🔧 Check Config
              </button>
              
              <button
                onClick={testStapeConnection}
                className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs"
              >
                📡 Test Connection
              </button>
              
              <button
                onClick={testStapeLead}
                className="bg-purple-600 hover:bg-purple-700 text-white px-2 py-1 rounded text-xs"
              >
                🎯 Test Lead
              </button>
              
              <button
                onClick={testStapeForm}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-1 rounded text-xs"
              >
                📝 Test Form
              </button>
            </div>
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
            <p><strong>🔄 Flow:</strong> Website → Stape → GTM → Meta</p>
            <p><strong>📊 Verify:</strong> GTM Preview + Meta Events Manager</p>
            <p><strong>💰 Cost:</strong> FREE (10,000 requests/month)</p>
            <p><strong>🎯 Benefits:</strong> Server-side tracking + Ad blocker bypass</p>
          </div>
        </div>
      )}
    </div>
  );
}
