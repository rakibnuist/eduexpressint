#!/usr/bin/env node

/**
 * Comprehensive Tracking Test Script for EduExpress International
 * Tests META Conversion API, SEO, and overall tracking functionality
 */

// Using built-in Node.js fetch (Node 18+)

const BASE_URL = process.env.TEST_URL || 'http://localhost:3001';
const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN || 'EAAWM1phofcoBPkJxnqa4PR2ZBciZBn0N0D6kiP5LgepMFPIso5DePvYfRIexplJP5Mb0qThJmyWc0ryIJkgOqpT45U9QfooVrrvpFijVAG89E9EOHsiGQGVaQuyQJ7XoUQuVDrgWdOtmfxJkg9FLH42XDgSRC37AFmaZCypVrUCSGmvHZCPaf7Xw7yPVLAZDZD';

console.log('🧪 EduExpress International - Tracking Test Suite');
console.log('=' .repeat(60));

// Test 1: META Conversion API - PageView Event
async function testPageViewEvent() {
  console.log('\n📊 Test 1: META Conversion API - PageView Event');
  console.log('-'.repeat(50));
  
  try {
    const response = await fetch(`${BASE_URL}/api/tracking/meta`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        events: [{
          event_name: 'PageView',
          event_time: Math.floor(Date.now() / 1000),
          event_source_url: 'https://eduexpressint.com',
          action_source: 'website',
          user_data: {
            email: 'test@eduexpressint.com',
            phone: '1234567890'
          },
          custom_data: {
            content_name: 'Homepage',
            content_category: 'Education',
            currency: 'USD'
          }
        }]
      })
    });

    const result = await response.json();
    
    if (response.ok && result.success) {
      console.log('✅ PageView Event: SUCCESS');
      console.log(`   Events Received: ${result.events_received}`);
      console.log(`   Meta Response: ${JSON.stringify(result.meta_response)}`);
    } else {
      console.log('❌ PageView Event: FAILED');
      console.log(`   Error: ${JSON.stringify(result)}`);
    }
  } catch (error) {
    console.log('❌ PageView Event: ERROR');
    console.log(`   Error: ${error.message}`);
  }
}

// Test 2: META Conversion API - Lead Event
async function testLeadEvent() {
  console.log('\n📊 Test 2: META Conversion API - Lead Event');
  console.log('-'.repeat(50));
  
  try {
    const response = await fetch(`${BASE_URL}/api/tracking/meta`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        events: [{
          event_name: 'Lead',
          event_time: Math.floor(Date.now() / 1000),
          event_source_url: 'https://eduexpressint.com/contact',
          action_source: 'website',
          user_data: {
            email: 'student@example.com',
            phone: '1234567890',
            firstName: 'John',
            lastName: 'Doe'
          },
          custom_data: {
            content_name: 'Contact Form Lead',
            content_category: 'Education',
            value: 50,
            currency: 'USD',
            country_of_interest: 'UK',
            program_type: 'Bachelor',
            major: 'Computer Science'
          }
        }]
      })
    });

    const result = await response.json();
    
    if (response.ok && result.success) {
      console.log('✅ Lead Event: SUCCESS');
      console.log(`   Events Received: ${result.events_received}`);
      console.log(`   Meta Response: ${JSON.stringify(result.meta_response)}`);
    } else {
      console.log('❌ Lead Event: FAILED');
      console.log(`   Error: ${JSON.stringify(result)}`);
    }
  } catch (error) {
    console.log('❌ Lead Event: ERROR');
    console.log(`   Error: ${error.message}`);
  }
}

// Test 3: META Conversion API - CompleteRegistration Event
async function testCompleteRegistrationEvent() {
  console.log('\n📊 Test 3: META Conversion API - CompleteRegistration Event');
  console.log('-'.repeat(50));
  
  try {
    const response = await fetch(`${BASE_URL}/api/tracking/meta`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        events: [{
          event_name: 'CompleteRegistration',
          event_time: Math.floor(Date.now() / 1000),
          event_source_url: 'https://eduexpressint.com/universities',
          action_source: 'website',
          user_data: {
            email: 'student@example.com',
            phone: '1234567890'
          },
          custom_data: {
            content_name: 'University Registration',
            content_category: 'Education',
            value: 100,
            currency: 'USD',
            university_name: 'University of Cambridge',
            country_of_interest: 'UK'
          }
        }]
      })
    });

    const result = await response.json();
    
    if (response.ok && result.success) {
      console.log('✅ CompleteRegistration Event: SUCCESS');
      console.log(`   Events Received: ${result.events_received}`);
      console.log(`   Meta Response: ${JSON.stringify(result.meta_response)}`);
    } else {
      console.log('❌ CompleteRegistration Event: FAILED');
      console.log(`   Error: ${JSON.stringify(result)}`);
    }
  } catch (error) {
    console.log('❌ CompleteRegistration Event: ERROR');
    console.log(`   Error: ${error.message}`);
  }
}

// Test 4: SEO Meta Tags Check
async function testSEOMetaTags() {
  console.log('\n🔍 Test 4: SEO Meta Tags Check');
  console.log('-'.repeat(50));
  
  try {
    const response = await fetch(`${BASE_URL}`);
    const html = await response.text();
    
    const requiredTags = [
      'title',
      'meta name="description"',
      'meta property="og:title"',
      'meta property="og:description"',
      'meta property="og:image"',
      'meta name="twitter:card"',
      'link rel="canonical"',
      'script type="application/ld+json"'
    ];
    
    let passedTests = 0;
    
    requiredTags.forEach(tag => {
      if (html.includes(tag)) {
        console.log(`✅ ${tag}: FOUND`);
        passedTests++;
      } else {
        console.log(`❌ ${tag}: MISSING`);
      }
    });
    
    console.log(`\n📊 SEO Score: ${passedTests}/${requiredTags.length} (${Math.round(passedTests/requiredTags.length*100)}%)`);
    
  } catch (error) {
    console.log('❌ SEO Meta Tags Check: ERROR');
    console.log(`   Error: ${error.message}`);
  }
}

// Test 5: Sitemap Check
async function testSitemap() {
  console.log('\n🗺️  Test 5: Sitemap Check');
  console.log('-'.repeat(50));
  
  try {
    const response = await fetch(`${BASE_URL}/sitemap.xml`);
    
    if (response.ok) {
      const sitemap = await response.text();
      const urlCount = (sitemap.match(/<url>/g) || []).length;
      console.log(`✅ Sitemap: FOUND (${urlCount} URLs)`);
      
      // Check for important pages
      const importantPages = [
        'https://eduexpressint.com',
        'https://eduexpressint.com/about',
        'https://eduexpressint.com/contact',
        'https://eduexpressint.com/universities'
      ];
      
      importantPages.forEach(page => {
        if (sitemap.includes(page)) {
          console.log(`✅ ${page}: INCLUDED`);
        } else {
          console.log(`❌ ${page}: MISSING`);
        }
      });
    } else {
      console.log('❌ Sitemap: NOT FOUND');
    }
  } catch (error) {
    console.log('❌ Sitemap Check: ERROR');
    console.log(`   Error: ${error.message}`);
  }
}

// Test 6: Robots.txt Check
async function testRobotsTxt() {
  console.log('\n🤖 Test 6: Robots.txt Check');
  console.log('-'.repeat(50));
  
  try {
    const response = await fetch(`${BASE_URL}/robots.txt`);
    
    if (response.ok) {
      const robots = await response.text();
      console.log('✅ Robots.txt: FOUND');
      console.log('   Content:');
      console.log(robots.split('\n').map(line => `   ${line}`).join('\n'));
    } else {
      console.log('❌ Robots.txt: NOT FOUND');
    }
  } catch (error) {
    console.log('❌ Robots.txt Check: ERROR');
    console.log(`   Error: ${error.message}`);
  }
}

// Test 7: Page Load Performance
async function testPageLoadPerformance() {
  console.log('\n⚡ Test 7: Page Load Performance');
  console.log('-'.repeat(50));
  
  try {
    const startTime = Date.now();
    const response = await fetch(`${BASE_URL}`);
    const endTime = Date.now();
    
    const loadTime = endTime - startTime;
    
    if (loadTime < 1000) {
      console.log(`✅ Page Load Time: ${loadTime}ms (EXCELLENT)`);
    } else if (loadTime < 2000) {
      console.log(`⚠️  Page Load Time: ${loadTime}ms (GOOD)`);
    } else {
      console.log(`❌ Page Load Time: ${loadTime}ms (SLOW)`);
    }
    
    console.log(`   Status: ${response.status}`);
    console.log(`   Content-Type: ${response.headers.get('content-type')}`);
    
  } catch (error) {
    console.log('❌ Page Load Performance: ERROR');
    console.log(`   Error: ${error.message}`);
  }
}

// Run all tests
async function runAllTests() {
  console.log(`\n🚀 Starting tests against: ${BASE_URL}`);
  console.log(`🔑 Using META Access Token: ${META_ACCESS_TOKEN.substring(0, 20)}...`);
  
  await testPageViewEvent();
  await testLeadEvent();
  await testCompleteRegistrationEvent();
  await testSEOMetaTags();
  await testSitemap();
  await testRobotsTxt();
  await testPageLoadPerformance();
  
  console.log('\n' + '='.repeat(60));
  console.log('🎉 All tests completed!');
  console.log('='.repeat(60));
}

// Run the tests
runAllTests().catch(console.error);
