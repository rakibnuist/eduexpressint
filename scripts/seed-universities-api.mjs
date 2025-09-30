// Script to seed universities using the API
const sampleUniversities = [
  {
    name: "University of Oxford",
    description: "One of the oldest and most prestigious universities in the world, located in Oxford, England.",
    shortDescription: "Prestigious research university in Oxford, England",
    country: "UK",
    destination: "uk",
    city: "Oxford",
    type: "Public",
    ranking: {
      global: 1,
      national: 1
    },
    isActive: true,
    isFeatured: true,
    priority: 10,
    tags: ["prestigious", "research", "ivy-league", "uk"],
    website: "https://www.ox.ac.uk",
    founded: 1096
  },
  {
    name: "University of Cambridge",
    description: "A collegiate research university in Cambridge, United Kingdom, founded in 1209.",
    shortDescription: "Historic research university in Cambridge, England",
    country: "UK",
    destination: "uk",
    city: "Cambridge",
    type: "Public",
    ranking: {
      global: 3,
      national: 2
    },
    isActive: true,
    isFeatured: true,
    priority: 9,
    tags: ["prestigious", "research", "ivy-league", "uk"],
    website: "https://www.cam.ac.uk",
    founded: 1209
  },
  {
    name: "Harvard University",
    description: "A private Ivy League research university in Cambridge, Massachusetts, established in 1636.",
    shortDescription: "Ivy League university in Cambridge, Massachusetts",
    country: "USA",
    destination: "usa",
    city: "Cambridge",
    type: "Private",
    ranking: {
      global: 2,
      national: 1
    },
    isActive: true,
    isFeatured: true,
    priority: 10,
    tags: ["ivy-league", "prestigious", "research", "usa"],
    website: "https://www.harvard.edu",
    founded: 1636
  },
  {
    name: "University of Amsterdam",
    description: "A public research university located in Amsterdam, Netherlands, founded in 1632.",
    shortDescription: "Leading research university in Amsterdam, Netherlands",
    country: "Netherlands",
    destination: "netherlands",
    city: "Amsterdam",
    type: "Public",
    ranking: {
      global: 55,
      national: 1
    },
    isActive: true,
    isFeatured: false,
    priority: 5,
    tags: ["research", "netherlands", "european"],
    website: "https://www.uva.nl",
    founded: 1632
  },
  {
    name: "Seoul National University",
    description: "A national research university located in Seoul, South Korea, established in 1946.",
    shortDescription: "Premier national university in Seoul, South Korea",
    country: "South Korea",
    destination: "south-korea",
    city: "Seoul",
    type: "Public",
    ranking: {
      global: 36,
      national: 1
    },
    isActive: true,
    isFeatured: false,
    priority: 6,
    tags: ["research", "south-korea", "asian"],
    website: "https://www.snu.ac.kr",
    founded: 1946
  }
];

async function seedUniversities() {
  try {
    console.log('🌱 Starting to seed universities...\n');
    
    let addedCount = 0;
    let skippedCount = 0;
    
    for (const universityData of sampleUniversities) {
      try {
        console.log(`Adding: ${universityData.name}...`);
        
        const response = await fetch('http://localhost:3000/api/universities', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(universityData),
        });
        
        const result = await response.json();
        
        if (result.success) {
          console.log(`✅ Successfully added: ${universityData.name}`);
          addedCount++;
        } else {
          console.log(`⚠️  ${universityData.name}: ${result.error}`);
          skippedCount++;
        }
        
        // Small delay to avoid overwhelming the server
        await new Promise(resolve => setTimeout(resolve, 500));
        
      } catch (error) {
        console.error(`❌ Failed to add ${universityData.name}:`, error.message);
        skippedCount++;
      }
    }
    
    console.log(`\n🎉 Seeding completed!`);
    console.log(`✅ Added: ${addedCount} universities`);
    console.log(`⚠️  Skipped: ${skippedCount} universities`);
    
    // Test the sync functionality
    console.log(`\n🔄 Testing sync functionality...`);
    
    try {
      const syncResponse = await fetch('http://localhost:3000/api/admin/universities/sync');
      const syncData = await syncResponse.json();
      
      if (syncData.success) {
        console.log('✅ Sync API working!');
        console.log('📊 Statistics:', syncData.data.statistics);
      } else {
        console.log('❌ Sync API failed:', syncData.error);
      }
    } catch (error) {
      console.error('❌ Sync test failed:', error.message);
    }
    
  } catch (error) {
    console.error('Error during seeding:', error);
  }
}

// Check if server is running
async function checkServer() {
  try {
    const response = await fetch('http://localhost:3000/api/universities?limit=1');
    return response.ok;
  } catch (error) {
    return false;
  }
}

// Main execution
async function main() {
  console.log('🔍 Checking if server is running...');
  
  const serverRunning = await checkServer();
  if (!serverRunning) {
    console.log('❌ Server is not running. Please start the development server first:');
    console.log('   npm run dev');
    process.exit(1);
  }
  
  console.log('✅ Server is running, proceeding with seeding...\n');
  await seedUniversities();
}

main();
