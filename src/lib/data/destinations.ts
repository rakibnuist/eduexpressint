export type DestinationData = {
  slug: string;
  name: string;
  tagline?: string;
  heroImage?: string;
  summary?: string;
  highlights?: string[];
  keySellingPoints?: string[];
  stats?: {
    universities?: number;
    avgTuitionRange?: string;
    scholarshipNote?: string;
  };
  seo?: {
    title?: string;
    description?: string;
  };
  // Cyprus-specific fields
  specialFeatures?: string[];
  intakes?: string[];
  workPermit?: string;
  visaSuccessRate?: string;
  earningPotential?: string;
  costOfLiving?: string;
  programs?: any;
  englishRequirements?: any;
  documents?: any;
  costBreakdown?: any;
  applicationProcess?: any;
};

export const DESTINATIONS: DestinationData[] = [
  {
    slug: "uk",
    name: "United Kingdom",
    tagline: "World-class universities with rich history.",
    heroImage: "/brand/destinations/uk.jpg",
    summary:
      "Top-ranked institutions, diverse programs, and strong post-study prospects.",
    highlights: [
      "1-year taught Masters in many fields",
      "Graduate Route (post-study work) policy",
      "Scholarship options incl. Chevening & university awards"
    ],
    keySellingPoints: [
      "Top 10 Global Universities",
      "2-Year Post-Study Work Visa",
      "English Language Advantage"
    ],
    stats: { universities: 150, avgTuitionRange: "£10k–£22k/yr", scholarshipNote: "Merit & need-based scholarships available." },
    seo: {
      title: "Study in UK — EduExpress International",
      description:
        "Apply to leading universities in the UK with scholarships and expert counseling."
    }
  },
  {
    slug: "china",
    name: "China",
    tagline: "Fast-growing education hub with scholarships.",
    heroImage: "/brand/destinations/china.jpg",
    summary:
      "STEM, business, and medicine programs with generous scholarships.",
    highlights: [
      "CSC & provincial scholarships",
      "Rapidly growing research ecosystem",
      "Affordable living in most cities"
    ],
    keySellingPoints: [
      "Full Scholarship Programs",
      "Rapidly Growing Economy",
      "Affordable Living Costs"
    ],
    stats: { universities: 180, avgTuitionRange: "$2k–$5k/yr", scholarshipNote: "Full/partial scholarships possible." },
    seo: {
      title: "Study in China — EduExpress International",
      description:
        "Get matched to Chinese universities with CSC/provincial scholarships."
    }
  },
  {
    slug: "south-korea",
    name: "South Korea",
    tagline: "Technology-focused programs and culture.",
    heroImage: "/brand/destinations/south-korea.jpg",
    summary:
      "Top tech and design schools, modern campuses, and K-culture experience.",
    highlights: [
      "GKS & university scholarships",
      "Strong electronics/CS programs",
      "Excellent safety and transit"
    ],
    keySellingPoints: [
      "World-Class Tech Programs",
      "K-Culture Experience",
      "Safe & Modern Environment"
    ],
    stats: { universities: 60, avgTuitionRange: "$3k–$7k/yr" }
  },
  { slug: "hungary", name: "Hungary", tagline: "Affordable EU education.", heroImage: "/brand/destinations/hungary.jpg", summary: "Medicine and engineering popular with Stipendium Hungaricum.", highlights: ["EU degree value", "Scholarship quotas", "Lower living costs"], keySellingPoints: ["EU Degree Recognition", "Stipendium Hungaricum", "Affordable Living"] },
  {
    slug: "cyprus",
    name: "Cyprus",
    tagline: "Earn While You Study - Up to €18,000/year!",
    heroImage: "/brand/destinations/cyprus.jpg",
    summary: "Affordable European education with globally recognized degrees. Experience the perfect blend of quality education, cultural richness, and career opportunities in the heart of the Mediterranean.",
    highlights: [
      "Earn up to €18,000/year during studies",
      "Paid internships at luxury 5-star hotels",
      "100% visa success rate",
      "4+4 year work permit",
      "Double awarded degrees (Cyprus & UK)"
    ],
    keySellingPoints: [
      "Earn While Studying",
      "100% Visa Success",
      "EU Work Permit"
    ],
    stats: { 
      universities: 2, 
      avgTuitionRange: "€4,000–€8,500/yr", 
      scholarshipNote: "Up to 50% scholarships available from Year 2 onwards" 
    },
    seo: {
      title: "Study in Cyprus - Earn While You Study | EduExpress International",
      description: "Study in Cyprus with paid internships, 100% visa success rate, and earn up to €18,000/year. Affordable European education with globally recognized degrees."
    },
    // Additional Cyprus-specific data
    specialFeatures: [
      "Paid Internships at 5-star hotels",
      "Double Degree with Swiss Universities",
      "Erasmus+ EU Mobility Program",
      "American-style Education System",
      "Part-time Work Opportunities"
    ],
    intakes: ["January", "June", "October"],
    workPermit: "4+4 Year Work Permit",
    visaSuccessRate: "100%",
    earningPotential: "Up to €18,000/year",
    costOfLiving: "€300/month",
    programs: {
      uclanCyprus: {
        name: "UCLan Cyprus",
        bachelor: {
          business: [
            "BA (Hons) Advertising & Marketing Communications",
            "BA (Hons) English Language & Literature", 
            "BA (Hons) Hospitality & Tourism Management",
            "BA (Hons) Accounting and Finance",
            "BA (Hons) Business Administration"
          ],
          arts: [
            "BA (Hons) Graphic Design",
            "BA (Hons) Fashion Design",
            "BSc (Hons) Media Production",
            "BSc (Hons) Web Design & Development"
          ],
          sciences: [
            "BEng (Hons) Computer Engineering",
            "BSc (Hons) Mathematics & Statistics",
            "BEng (Hons) Electrical & Electronic Engineering",
            "BSc (Hons) Sport & Exercise Science",
            "BSc (Hons) Psychology",
            "BSc (Hons) Computing"
          ],
          law: [
            "Bachelor of Laws LLB (Hons)"
          ]
        },
        masters: [
          "MSc Human Resource Management",
          "MBA Master in Business Administration",
          "MA Hospitality, Tourism & Events Management",
          "MSc User Experience (UX) Design",
          "MA Graphic Design",
          "MSc Sport & Exercise Sciences",
          "MSc Forensic Psychology",
          "MSc Data Analytics",
          "MSc Computing",
          "Master of Laws LLM",
          "LLM in Financial and Corporate Law",
          "LLM International Commercial Dispute Resolution"
        ],
        fees: {
          bachelor: {
            business: "€6,500 (Year 1) → €4,000 (Years 2-4)",
            other: "€8,500 (Year 1) → Up to 50% scholarship from Year 2"
          },
          masters: {
            business: "€7,500 (Total for entire course)",
            other: "€8,925 (Total for entire course)"
          },
          foundation: "€5,500"
        }
      },
      mesoyiosCollege: {
        name: "Mesoyios College",
        bachelor: [
          "Bachelor in Hotel, Casino & Resort Management",
          "Bachelor in Business Administration with Hospitality Direction"
        ],
        foundation: "English Foundation Year",
        fees: {
          bachelor: "€5,440 (1st Year) → €4,760 (From 2nd Year)",
          foundation: "€5,440"
        }
      }
    },
    englishRequirements: {
      bachelor: {
        ielts: "5.0",
        toefl: "71",
        pte: "58",
        cefr: "B2"
      },
      foundation: {
        ielts: "4.0",
        toefl: "42", 
        pte: "43",
        cefr: "B1"
      }
    },
    documents: {
      admission: [
        "Passport (valid for 2+ years)",
        "Academic Certificates & Transcript (SSC & HSC)",
        "English Language Certificate (IELTS 4.0/5.0 or equivalent)",
        "White Background Photo",
        "One Recommendation Letter",
        "Personal Statement: Max 500 words",
        "Resume"
      ],
      blueprint: [
        "Academic documents (Attested by Education Board, Ministry of Education, and Foreign Ministry & Legalization From Cyprus Consulate)",
        "Police Clearance Certificate",
        "Medical Report (TB, Hepatitis B/C, Syphilis, HIV/AIDS)",
        "Birth Certificate",
        "NID (English Translation & Notary)"
      ],
      visa: [
        "Academic Certificates and Marksheets (Attested by Education Board, Education Ministry, Foreign Ministry, Notary, and Consulate Legalization)",
        "Police Clearance Certificate (Attested by Law Ministry, Foreign Ministry, Notary, and Consulate Legalization)",
        "Medical Certificate (Must include tests for tuberculosis, hepatitis B, C, syphilis, and HIV/AIDS)",
        "Passport (Must have minimum validity of 2+ years)",
        "Bank Statement (Minimum savings of 10 lakhs)",
        "Tuition Fee Payment Confirmation"
      ]
    },
    costBreakdown: {
      beforeVisa: {
        immigrationFee: "€300",
        tuitionDeposit: "€4,000",
        legalizationCost: "6,000-8,000 BDT",
        medicalCost: "6,000-8,000 BDT",
        dhlCost: "3,000 BDT",
        embassyFee: "€300"
      },
      afterVisa: {
        restTuition: "€2,500",
        airTicket: "1,30,000-1,80,000 BDT",
        cashToBring: "€2,000",
        immigrationFees: "€330",
        tieBooks: "€90"
      }
    },
    applicationProcess: [
      {
        step: 1,
        title: "Apply Online",
        description: "Complete application form with required documents. Wait 2-3 days for Offer Letter"
      },
      {
        step: 2,
        title: "Pay Fees", 
        description: "€300 Immigration + €4,000 Tuition Deposit. Offer letter valid for 2 weeks"
      },
      {
        step: 3,
        title: "Complete Documentation",
        description: "Medical tests & attestation (15-20 days). Prepare all required documents"
      },
      {
        step: 4,
        title: "Submit & Wait",
        description: "Send documents by DHL (2-7 days). Wait for Blue Paper (within 30 days)"
      },
      {
        step: 5,
        title: "Visa Application",
        description: "Submit to Embassy (1-1.5 months). Visa issued within 2-3 weeks"
      },
      {
        step: 6,
        title: "Travel & Enroll",
        description: "Bring €2,000 cash. Register and sign Enrolment Agreement"
      }
    ]
  },
  { slug: "georgia", name: "Georgia", tagline: "Popular for MBBS & business.", heroImage: "/brand/destinations/georgia.jpg", summary: "Affordable medical programs and growing private universities.", highlights: ["Lower fees", "English-medium MBBS", "Safe environment"], keySellingPoints: ["Affordable MBBS Programs", "English-Medium Education", "Safe Environment"] },
  { slug: "croatia", name: "Croatia", tagline: "EU degree with coastal lifestyle.", heroImage: "/brand/destinations/croatia.jpg", summary: "Tourism, maritime, and engineering programs.", highlights: ["EU recognition", "Affordable living", "English-taught options"], keySellingPoints: ["EU Degree Recognition", "Coastal Lifestyle", "Affordable Living"] },
  {
    slug: "netherlands",
    name: "Netherlands",
    tagline: "Innovation hub with English-taught programs.",
    heroImage: "/brand/destinations/netherlands.jpg",
    summary: "World-class universities, innovative programs, and excellent post-study opportunities.",
    highlights: [
      "English-taught programs",
      "Strong tech and business sectors",
      "EU work permit after graduation"
    ],
    keySellingPoints: [
      "English-Taught Programs",
      "Innovation Hub",
      "EU Work Opportunities"
    ],
    stats: { universities: 13, avgTuitionRange: "€2k–€15k/yr", scholarshipNote: "Holland Scholarship & university awards available." },
    seo: {
      title: "Study in Netherlands — EduExpress International",
      description: "Apply to top Dutch universities with English-taught programs and excellent career prospects."
    }
  },
  {
    slug: "finland",
    name: "Finland",
    tagline: "World's best education system.",
    heroImage: "/brand/hero-fallback.jpg",
    summary: "Free education, cutting-edge research, and high-quality life in the happiest country.",
    highlights: [
      "Free education for EU students",
      "World-class research facilities",
      "High quality of life"
    ],
    keySellingPoints: [
      "Free Education (EU)",
      "Best Education System",
      "High Quality of Life"
    ],
    stats: { universities: 13, avgTuitionRange: "€8k–€18k/yr", scholarshipNote: "Finnish Government scholarships available." },
    seo: {
      title: "Study in Finland — EduExpress International",
      description: "Experience the world's best education system in Finland with free education opportunities."
    }
  }
];

export const getDestinationSlugs = () => DESTINATIONS.map(d => d.slug);
export const findDestination = (slug: string) =>
  DESTINATIONS.find(d => d.slug === slug);
