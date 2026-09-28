import {
  Project,
  VolunteerSubmission,
  BlogPost,
  ContactMessage,
  ManifestoPillar,
  GalleryItem,
  CampaignSettings,
  BiographyData
} from '../types';

export const INITIAL_SETTINGS: CampaignSettings = {
  candidateName: 'Rt. Hon. Adewale Egbedun',
  candidateTitle: 'Speaker, Osun State House of Assembly & Member Representing Odo-Otin State Constituency',
  partyName: 'Accord Party',
  partyAcronym: 'ACCORD',
  slogan: 'Continuity, Progress, Development',
  campaignOfficeAddress: 'Plot 4, Ikirun-Offa Expressway, Beside Odo-Otin Local Government Secretariat, Okuku, Osun State',
  phoneHotline: '+234 803 456 7890',
  emailAddress: 'campaign@adewaleegbedun.ng',
  whatsappNumber: '+234 812 345 6789',
  adminPasswordHash: 'Bullet2812$',
  electionDate: '2027-02-27',
  targetVotes: 48500,
  registeredVolunteersGoal: 2500,
  completedProjectsCount: 42,
  communitiesCount: 16
};

export const INITIAL_MANIFESTO_PILLARS: ManifestoPillar[] = [
  {
    id: 'pillar-1',
    number: '01',
    title: 'Education Revitalization & Digital Literacy',
    tagline: 'Modern learning environments, free STEM kits, and scholarships for every child',
    iconName: 'GraduationCap',
    summary: 'Transform primary and secondary schools across all 16 Odo-Otin communities with modernized classrooms, digital labs, and direct student bursaries.',
    budgetEstimate: '₦450,000,000',
    timeline: '2027 – 2029',
    targets: [
      'Equip 16 public secondary schools with solar-powered e-learning computer centers',
      'Provide 1,000 annual tertiary education bursaries to Odo-Otin indigenes',
      'Distribute free textbooks and notebooks to 15,000 public primary school pupils',
      'Host the annual Odo-Otin Science & Innovation Fair with university scholarship prizes'
    ],
    keyDeliverables: [
      'Modern Science Laboratories in Okuku, Inisa, and Oyan Grammar Schools',
      'Teachers Continuing Professional Development Incentive Fund',
      'Free WAEC and UTME/JAMB Registration Sponsorship for 1,200 indigent students annually'
    ]
  },
  {
    id: 'pillar-2',
    number: '02',
    title: 'Accessible Grassroots Healthcare',
    tagline: '24/7 Primary Healthcare Centers, solar cold chains, and free maternal care',
    iconName: 'HeartPulse',
    summary: 'Ensure no constituent travels more than 15 minutes to receive emergency medical care, maternal delivery, or essential prescription medication.',
    budgetEstimate: '₦380,000,000',
    timeline: '2027 – 2030',
    targets: [
      'Upgrade 10 Primary Healthcare Centers to fully equipped 24-hour mini-hospitals',
      'Procure 3 dedicated rural mobile ambulances stationed across Okuku, Inisa, and Oyan',
      'Provide 100% free maternal and neonatal care packages for expectant mothers',
      'Quarterly free medical outreach covering hypertension, diabetes, and cataract surgeries'
    ],
    keyDeliverables: [
      'Solar-powered vaccine refrigerators in remote rural wards (Ijabe, Ekosin, Iyeku)',
      'Subsidized health insurance enrollment under the Osun Health Insurance Scheme (OHIS)',
      'Quarterly doctors-on-wheels team reaching farming settlements and hamlets'
    ]
  },
  {
    id: 'pillar-3',
    number: '03',
    title: 'Rural Infrastructure & Road Connectivity',
    tagline: 'Connecting farm gates to urban markets with all-weather roads and solar lights',
    iconName: 'Building2',
    summary: 'Expand tarred rural feeder roads, construct drainage systems to combat erosion, and illuminate commercial centers with solar street lighting.',
    budgetEstimate: '₦720,000,000',
    timeline: '2027 – 2031',
    targets: [
      'Pave 35km of critical agricultural feeder roads connecting farm settlements to town centers',
      'Install 800 commercial-grade solar streetlights across major market arteries and junctions',
      'Construct 14 culverts and concrete drainage channels in flood-prone communities (Inisa, Igbaye)',
      'Renovate community civic centers in Agbeye, Ila-Odo, and Oba Ojomu'
    ],
    keyDeliverables: [
      'Okuku - Ijabe - Ila-Odo link road rehabilitation completion',
      'Oyan to Asi Asaba bypass grading and stone-base asphalt overlay',
      'Solar lighting around all central palaces, mosques, and churches'
    ]
  },
  {
    id: 'pillar-4',
    number: '04',
    title: 'Youth Empowerment & Tech Hubs',
    tagline: 'Coding academies, artisanal toolkits, sports development, and capital grants',
    iconName: 'Cpu',
    summary: 'Equip the next generation of Odo-Otin youths with high-demand digital skills, business startup capital, and artisanal vocational mastery.',
    budgetEstimate: '₦260,000,000',
    timeline: '2027 – 2029',
    targets: [
      'Establish the Odo-Otin Innovation Hub with free high-speed internet and coding bootcamps',
      'Disburse ₦150,000 business startup equipment to 500 vocational graduates annually',
      'Organize the annual Speaker Egbedun Unity Cup to scout football talent for national teams',
      'Partner with international tech academies for certified remote software engineering courses'
    ],
    keyDeliverables: [
      'Digital freelancing center in Okuku with workstations and continuous power supply',
      'Start-up kits for mechanics, fashion designers, solar technicians, and welders',
      'Youth-in-Governance fellowship mentoring young political leaders'
    ]
  },
  {
    id: 'pillar-5',
    number: '05',
    title: 'Women’s Economic Inclusion & Market Support',
    tagline: 'Zero-interest micro-credit, modern market stalls, and sanitary water infrastructure',
    iconName: 'ShoppingBag',
    summary: 'Promote women-led micro-enterprises and market traders through cooperative revolving credit, stall modernizations, and water boreholes.',
    budgetEstimate: '₦290,000,000',
    timeline: '2027 – 2030',
    targets: [
      'Expand the "Egbedun Women Traders Support Scheme" to 2,500 active market women',
      'Provide zero-interest revolving loans of up to ₦100,000 per cooperative member',
      'Modernize central markets in Inisa, Okuku, Oyan, and Igbaye with clean lock-up shops',
      'Drill motorized borehole water points in every daily and five-day market'
    ],
    keyDeliverables: [
      'Establishment of the Odo-Otin Women Cooperative Federation',
      'Daycare and crèche corners in major rural trading hubs to support working mothers',
      'Financial literacy and bookkeeping workshops conducted in Yoruba and English'
    ]
  },
  {
    id: 'pillar-6',
    number: '06',
    title: 'Agricultural Modernization & Food Security',
    tagline: 'Subsidized tractor services, solar irrigation, and guaranteed off-take warehouses',
    iconName: 'Wheat',
    summary: 'Revitalize agriculture in Odo-Otin as an economic powerhouse through machinery leasing, subsidized high-yield seedlings, and solar irrigation systems.',
    budgetEstimate: '₦510,000,000',
    timeline: '2027 – 2031',
    targets: [
      'Procure 6 community tractors operated at 60% subsidized lease rates for local farmers',
      'Construct 20 solar-powered deep boreholes for dry-season vegetable and maize irrigation',
      'Distribute improved cocoa, oil palm, and cassava cuttings to 3,000 registered farmers',
      'Establish agro-processing processing sheds (cassava/garri processing mills) in rural wards'
    ],
    keyDeliverables: [
      'Grain preservation silos in Faji, Opete, and Okua',
      'Farmer cooperative inputs distribution depot in Oyan',
      'Guaranteed buyback linkages connecting farmers directly to food aggregators in Lagos and Ibadan'
    ]
  },
  {
    id: 'pillar-7',
    number: '07',
    title: 'Grassroots Security & Community Peace',
    tagline: 'Equipping hunters, vigilante networks, and Amotekun with solar patrol vehicles',
    iconName: 'ShieldCheck',
    summary: 'Maintain Odo-Otin as the safest, most peaceful constituency in Osun State through structured security collaboration and technology.',
    budgetEstimate: '₦220,000,000',
    timeline: '2027 – 2029',
    targets: [
      'Procure 12 patrol motorcycles and tactical communication radios for local vigilante groups',
      'Provide monthly stipends and insurance coverage for community hunters and security squads',
      'Install smart solar street cameras at critical border checkpoints between Osun and Kwara',
      'Bi-monthly inter-community security dialogue forums involving traditional rulers and police'
    ],
    keyDeliverables: [
      'Security post rehabilitation in Ijabe, Ila-Odo, and Ore border corridors',
      'Rapid response communication network linked to the Osun State Security Command',
      'Conflict-resolution mediation panels for peaceful farmer-herder coexistence'
    ]
  },
  {
    id: 'pillar-8',
    number: '08',
    title: 'Traditional Institutions & Cultural Pride',
    tagline: 'Honoring Royal Fathers, preserving Yoruba heritage, and celebrating local festivals',
    iconName: 'Crown',
    summary: 'Accord the highest institutional respect to the revered traditional rulers (Obas and Baales) of Odo-Otin and project our rich Yoruba heritage.',
    budgetEstimate: '₦180,000,000',
    timeline: '2027 – 2031',
    targets: [
      'Continuous partnership with the Olokuku of Okuku and all Council of Obas in Odo-Otin',
      'Annual sponsorship of traditional festivals (Oyan Day, Okuku Day, Inisa Cultural Festival)',
      'Renovation of palace council chambers to standard dignity',
      'Documentation and digitizing of Odo-Otin indigenous folklore and heroic history'
    ],
    keyDeliverables: [
      'Traditional Rulers Welfare & Consultation Advisory Board',
      'Odo-Otin Cultural Heritage Carnival and Youth Arts Exhibition',
      'Restoration of historic royal groves and community monument landmarks'
    ]
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-01',
    title: 'Reconstruction of Okuku - Ijabe Inter-Town Link Road',
    category: 'Roads & Infrastructure',
    community: 'Okuku',
    status: 'Completed',
    year: 2024,
    budget: '₦185,000,000',
    beneficiaries: '35,000+ residents & commuters',
    description: 'Complete asphalt overlay, reinforced concrete gutters, and road markings connecting Okuku LGA headquarters to Ijabe agrarian community.',
    detailedScope: '8.4 kilometers of double-coat surface dressing with standard line drains on both sides. Reduced travel time between Okuku and Ijabe from 45 minutes of mud road to 12 minutes.',
    beforeImageUrl: '/src/assets/images/infrastructure_project_commissioning_1790568798405.jpg',
    afterImageUrl: '/src/assets/images/infrastructure_project_commissioning_1790568798405.jpg',
    featured: true,
    completionDate: 'November 2024',
    contractorOrPartner: 'Osun State Road Maintenance Agency & Constituency Project Fund',
    testimonials: [
      {
        name: 'Chief Oladimeji Adeyemi',
        role: 'Community Elder & Farmer',
        community: 'Ijabe',
        comment: 'Before Rt. Hon. Egbedun stepped in, our yam and plantain produce would rot during heavy rains. Now trucks drive directly to our farms without hassle!'
      }
    ]
  },
  {
    id: 'proj-02',
    title: 'Ultra-Modern Maternity & Child Health Center',
    category: 'Healthcare & Wellness',
    community: 'Inisa',
    status: 'Completed',
    year: 2024,
    budget: '₦95,000,000',
    beneficiaries: '18,000+ women and children',
    description: 'A 20-bed comprehensive maternity clinic equipped with ultrasound, delivery suites, solar power backups, and a dedicated staff quarter.',
    detailedScope: 'Built from ground up to replace the dilapidated clinic. Features a 10kVA solar inverter system, clean motorized water borehole, incubator units, and emergency delivery gear.',
    beforeImageUrl: '/src/assets/images/empowerment_program_event_1790568809065.jpg',
    afterImageUrl: '/src/assets/images/empowerment_program_event_1790568809065.jpg',
    featured: true,
    completionDate: 'August 2024',
    contractorOrPartner: 'Constituency Health Intervention & Ministry of Health',
    testimonials: [
      {
        name: 'Mrs. Folake Ogunwale',
        role: 'Market Leader (Iyaloja)',
        community: 'Inisa',
        comment: 'Our young daughters no longer have to travel all the way to Osogbo or Ikirun in the dead of the night to deliver babies. Speaker Egbedun answered our prayers.'
      }
    ]
  },
  {
    id: 'proj-03',
    title: 'Solar-Powered Irrigation Boreholes & Agro Depot',
    category: 'Agriculture & Markets',
    community: 'Oyan',
    status: 'Completed',
    year: 2025,
    budget: '₦72,000,000',
    beneficiaries: '1,400+ vegetable and grain farmers',
    description: 'Drilling of 4 high-capacity deep solar boreholes connected to overhead 20,000-liter storage tanks and 1.5km drip irrigation distribution pipes.',
    detailedScope: 'Enables year-round dry season farming for pepper, tomato, and maize farmers in Oyan, boosting farmer household incomes by over 120%.',
    afterImageUrl: '/src/assets/images/infrastructure_project_commissioning_1790568798405.jpg',
    featured: true,
    completionDate: 'March 2025',
    contractorOrPartner: 'Osun Agricultural Development Project (OSADEP)',
    testimonials: [
      {
        name: 'Alhaji Rasheed Babatunde',
        role: 'Chairman, Oyan Farmers Association',
        community: 'Oyan',
        comment: 'Water was our biggest nightmare during November to March. With these solar boreholes, our members harvest three cycles every single year.'
      }
    ]
  },
  {
    id: 'proj-04',
    title: 'Egbedun Mega Youth Vocational & Tech Center',
    category: 'Youth & Women Empowerment',
    community: 'Okuku',
    status: 'Completed',
    year: 2024,
    budget: '₦110,000,000',
    beneficiaries: '1,200 trained youths per year',
    description: 'Fully furnished ICT and vocational academy with 60 high-speed computers, solar arrays, auto-mechanic diagnostic tools, and fashion design suites.',
    detailedScope: 'Delivered in partnership with certified technical trainers. Includes free tuition, daily transport stipend, and graduation starter packs containing sewing machines, laptop grants, and toolkit boxes.',
    afterImageUrl: '/src/assets/images/empowerment_program_event_1790568809065.jpg',
    featured: true,
    completionDate: 'December 2024',
    contractorOrPartner: 'National Directorate of Employment & Rt. Hon. Egbedun Foundation',
    testimonials: [
      {
        name: 'Kehinde Oyewole',
        role: 'Graduate Software Developer',
        community: 'Okuku',
        comment: 'I learned web design and python at the Egbedun Tech Hub for free. Today I earn in foreign currency right here from Okuku while supporting my parents.'
      }
    ]
  },
  {
    id: 'proj-05',
    title: 'Renovation of Igbaye Community Grammar School',
    category: 'Education & Schools',
    community: 'Igbaye',
    status: 'Completed',
    year: 2023,
    budget: '₦68,000,000',
    beneficiaries: '850 high school students',
    description: 'Complete rehabilitation of 3 blocks of 12 classrooms, installation of new aluminum roofing, metal security doors, students’ desks, and teacher offices.',
    detailedScope: 'Also included construction of modern VIP water-closet toilet facilities and a 5,000-liter solar borehole providing clean drinking water to students.',
    afterImageUrl: '/src/assets/images/infrastructure_project_commissioning_1790568798405.jpg',
    featured: false,
    completionDate: 'September 2023',
    contractorOrPartner: 'Osun SUBEB Intervention Project'
  },
  {
    id: 'proj-06',
    title: '500 Units Solar Streetlight Installation Project',
    category: 'Rural Electrification & Solar',
    community: 'Agbeye',
    status: 'Completed',
    year: 2025,
    budget: '₦84,000,000',
    beneficiaries: 'Entire Agbeye, Ekosin & Iyeku corridor',
    description: 'Deployment of standalone lithium-battery solar streetlights covering market squares, royal palaces, dark intersections, and transit parks.',
    detailedScope: 'Dramatically reduced nighttime petty crimes, empowered night market vendors to trade until 10:00 PM, and illuminated worship centers.',
    afterImageUrl: '/src/assets/images/infrastructure_project_commissioning_1790568798405.jpg',
    featured: false,
    completionDate: 'June 2025'
  },
  {
    id: 'proj-07',
    title: 'Ila-Odo Rural Water Supply & Industrial Borehole Scheme',
    category: 'Water & Sanitation',
    community: 'Ila-Odo',
    status: 'Completed',
    year: 2024,
    budget: '₦42,000,000',
    beneficiaries: '7,000+ residents',
    description: 'Industrial motorized borehole with 6 water distribution collection points across Ila-Odo community to permanently solve dry season water scarcity.',
    detailedScope: 'Equipped with filtration and chlorination chambers to guarantee potable, bacteria-free drinking water.',
    afterImageUrl: '/src/assets/images/infrastructure_project_commissioning_1790568798405.jpg',
    featured: false,
    completionDate: 'May 2024'
  },
  {
    id: 'proj-08',
    title: 'Construction of Faji - Opete Agricultural Access Bridge',
    category: 'Roads & Infrastructure',
    community: 'Faji',
    status: 'Ongoing',
    year: 2026,
    budget: '₦98,000,000',
    beneficiaries: '12,000+ farming families',
    description: 'Twin-cell reinforced concrete bridge spanning the seasonal river that used to isolate Faji and Opete during heavy downpours.',
    detailedScope: 'Currently at 78% completion with bridge deck casting concluded. Approach road earthworks underway for timely delivery before election.',
    afterImageUrl: '/src/assets/images/infrastructure_project_commissioning_1790568798405.jpg',
    featured: true,
    completionDate: 'Target: November 2026'
  },
  {
    id: 'proj-09',
    title: 'Ekosin Primary Healthcare Modernization',
    category: 'Healthcare & Wellness',
    community: 'Ekosin',
    status: 'Ongoing',
    year: 2026,
    budget: '₦55,000,000',
    beneficiaries: '4,500 residents',
    description: 'Upgrading the primary health facility with medical laboratory equipment, solar cold-chain for child immunization, and an emergency triage room.',
    detailedScope: 'Structural renovation completed; medical equipment shipment scheduled for installation.',
    afterImageUrl: '/src/assets/images/empowerment_program_event_1790568809065.jpg',
    featured: false,
    completionDate: 'Target: December 2026'
  },
  {
    id: 'proj-10',
    title: 'Oba Ojomu Market Stalls Rehabilitation & Solar Electrification',
    category: 'Agriculture & Markets',
    community: 'Oba Ojomu',
    status: 'Completed',
    year: 2025,
    budget: '₦46,000,000',
    beneficiaries: '450 local traders',
    description: 'Rebuilding of 40 open sheds into secure lockup shops with fire-retardant roofing, concrete floors, and all-night solar security bulbs.',
    detailedScope: 'Commissioned amidst celebration with local market chiefs and council representatives.',
    afterImageUrl: '/src/assets/images/infrastructure_project_commissioning_1790568798405.jpg',
    featured: false,
    completionDate: 'October 2025'
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-01',
    title: 'Speaker Egbedun Declares 2027 Re-election Bid: "Our Journey of Grassroots Transformation Continues"',
    slug: 'speaker-egbedun-declares-2027-reelection-bid',
    category: 'Press Releases',
    excerpt: 'Before an electric gathering of community leaders, royal fathers, youths, and party loyalists in Okuku, Rt. Hon. Adewale Egbedun formally announced his re-election campaign on the platform of Accord Party.',
    content: `
      <p class="mb-4">It was a jubilant atmosphere in Okuku, the traditional headquarters of Odo-Otin Local Government, as thousands of constituents, market women, artisans, traditional chiefs, and youth representatives congregated to witness Rt. Hon. Adewale Egbedun declare his intention to seek re-election into the Osun State House of Assembly in February 2027.</p>
      
      <p class="mb-4">Addressing the mammoth crowd, the Speaker affirmed that the mandate given to him in his first term has been utilized with unblemished integrity, verifiable projects in every town, and progressive legislative governance that positioned Osun State on the path of sustained development.</p>
      
      <blockquote class="p-4 border-l-4 border-amber-400 bg-amber-50 my-4 italic text-stone-700">
        "Leadership is a sacred trust between a representative and his people. Over the past four years, we did not run an absentee mandate. From Okuku to Inisa, Oyan to Igbaye, Ijabe to Oba Ojomu, our fingerprints of development are visible in roads, clean water, hospitals, schools, and youth empowerment. In 2027, we are asking for continuity to consolidate these strides."
      </blockquote>

      <p class="mb-4">The declaration was highlighted by endorsements from youth councils, market women associations, and key political stakeholders across all eleven wards in Odo-Otin Constituency.</p>
    `,
    author: 'Adewale Egbedun Media Office',
    authorRole: 'Chief Press Secretary',
    date: '2026-08-15',
    readTime: '4 min read',
    featuredImage: '/src/assets/images/campaign_rally_odon_otin_1790568787984.jpg',
    tags: ['Re-election', 'Accord Party', 'Odo-Otin', 'Okuku', 'Declaration'],
    published: true,
    views: 3420,
    comments: [
      {
        id: 'c1',
        name: 'Adeyinka Balogun',
        email: 'adeyinka@yahoo.com',
        comment: 'You have done exceptionally well, Mr. Speaker. Inisa stands firmly behind you for continuity in 2027!',
        createdAt: '2026-08-16',
        approved: true
      },
      {
        id: 'c2',
        name: 'Mariam Alabi',
        email: 'mariam.a@gmail.com',
        comment: 'Thank you for remembering our rural health center in Ekosin. 100% Accord Party in February 2027!',
        createdAt: '2026-08-18',
        approved: true
      }
    ]
  },
  {
    id: 'post-02',
    title: 'Legislative Breakthrough: Osun Assembly Passes Landmark Rural Infrastructure & Farmers Support Bill',
    slug: 'osun-assembly-passes-rural-infrastructure-farmers-bill',
    category: 'Legislative Updates',
    excerpt: 'Under the dynamic leadership of Speaker Egbedun, the 8th Osun State House of Assembly successfully enacted legislation dedicating 15% of annual capital votes to rural agricultural feeder roads.',
    content: `
      <p class="mb-4">The Osun State House of Assembly has officially passed the landmark Rural Agricultural Feeder Infrastructure Protection and Smallholder Farmers Empowerment Bill. The bill, sponsored through bipartisan consensus led by Speaker Adewale Egbedun, establishes a statutory framework for continuous rural road rehabilitation.</p>

      <p class="mb-4">Highlighting the economic necessity of the bill, Speaker Egbedun explained that post-harvest losses among agrarian communities in Odo-Otin, Ila, and Ifelodun constituencies would reduce by at least 40% when all-weather rural roads are legally prioritized.</p>
      
      <p class="mb-4">Civil society organizations and agricultural cooperatives across Southwest Nigeria have commended the Osun Assembly for prioritizing bills that directly enhance the bread-and-butter realities of ordinary citizens.</p>
    `,
    author: 'Adewale Egbedun Media Office',
    authorRole: 'Legislative Affairs Directorate',
    date: '2026-06-22',
    readTime: '3 min read',
    featuredImage: '/src/assets/images/infrastructure_project_commissioning_1790568798405.jpg',
    tags: ['Legislation', 'Osun Assembly', 'Agriculture', 'Roads'],
    published: true,
    views: 2150,
    comments: []
  },
  {
    id: 'post-03',
    title: '2026 Mega Empowerment: 1,500 Odo-Otin Youths & Women Receive Free Tools, Grinding Engines, and Grants',
    slug: '2026-mega-empowerment-1500-constituents-empowered',
    category: 'Project Updates',
    excerpt: 'In keeping with his sacred pledge to uplift household economies, Rt. Hon. Egbedun presented life-changing equipment including deep freezers, sewing machines, hair dryers, and farm sprayers.',
    content: `
      <p class="mb-4">Constituents across all 16 communities of Odo-Otin experienced tears of joy as Rt. Hon. Adewale Egbedun held the largest single-day economic empowerment program in the history of the local government area.</p>

      <p class="mb-4">Beneficiaries were selected transparently across party lines through community town hall committees. Over 400 deep freezers, 350 heavy-duty industrial sewing machines, 200 motorized farm chemical sprayers, and ₦50,000 seed grants were handed over to accredited constituents.</p>
    `,
    author: 'Constituency Outreach Directorate',
    authorRole: 'Head of Welfare Programs',
    date: '2026-04-10',
    readTime: '5 min read',
    featuredImage: '/src/assets/images/empowerment_program_event_1790568809065.jpg',
    tags: ['Empowerment', 'Youth', 'Women', 'Poverty Alleviation'],
    published: true,
    views: 4890,
    comments: []
  }
];

export const INITIAL_VOLUNTEERS: VolunteerSubmission[] = [
  {
    id: 'vol-101',
    fullName: 'Oluwaseun Babajide',
    phone: '+234 803 111 2233',
    email: 'seun.babajide@gmail.com',
    whatsapp: '+234 803 111 2233',
    ageRange: '25-34',
    gender: 'Male',
    community: 'Okuku',
    ward: 'Ward 01 (Okuku Central)',
    pollingUnit: 'PU 003, Baptist Day School',
    activities: ['Social media advocacy', 'Youth mobilization', 'Event organization'],
    availability: 'Weekends',
    skills: ['Digital marketing', 'Graphics design', 'Public speaking'],
    whySupport: 'Speaker Egbedun has made Okuku proud as Assembly Speaker. He is accessible and listens to the youths.',
    priorExperience: true,
    referredBy: 'Odo-Otin Youth Council',
    consentContact: true,
    consentUpdates: true,
    registeredAt: '2026-09-01T10:30:00Z',
    status: 'active',
    notes: 'Very passionate young man. Assigned to lead digital campaign in Ward 01.'
  },
  {
    id: 'vol-102',
    fullName: 'Adetoun Sarah Adeleke',
    phone: '+234 814 998 7766',
    email: 'sarah.adeleke@yahoo.com',
    whatsapp: '+234 814 998 7766',
    ageRange: '35-49',
    gender: 'Female',
    community: 'Inisa',
    ward: 'Ward 04 (Inisa South)',
    pollingUnit: 'PU 007, Central Market Junction',
    activities: ['Women group coordination', 'Door-to-door campaign', 'Voter registration drive'],
    availability: 'Weekdays',
    skills: ['Writing', 'Transportation (own vehicle)'],
    whySupport: 'The new maternity center in Inisa saved my sister and her twins during emergency labor. He deserves our full loyalty.',
    priorExperience: true,
    consentContact: true,
    consentUpdates: true,
    registeredAt: '2026-09-05T14:15:00Z',
    status: 'active',
    notes: 'Influential among Inisa market cooperatives. Key coordinator.'
  },
  {
    id: 'vol-103',
    fullName: 'Kamorudeen Oloyede',
    phone: '+234 802 555 4321',
    email: 'kamoru.oloyede@gmail.com',
    ageRange: '18-24',
    gender: 'Male',
    community: 'Oyan',
    ward: 'Ward 06 (Oyan Rural)',
    activities: ['Polling unit agent', 'Door-to-door campaign'],
    availability: 'Full-time until election',
    skills: ['Public speaking'],
    whySupport: 'He is the only politician who came back after winning to build irrigation for our farmers in Oyan.',
    priorExperience: false,
    consentContact: true,
    consentUpdates: true,
    registeredAt: '2026-09-12T09:40:00Z',
    status: 'new'
  }
];

export const INITIAL_CONTACT_MESSAGES: ContactMessage[] = [
  {
    id: 'msg-01',
    fullName: 'Pastor Michael Abiodun',
    email: 'pastormichael@christianfellowship.org',
    phone: '+234 803 777 8899',
    community: 'Igbaye',
    subject: 'Appreciation for School Rehabilitation & Request for Prayer Breakfast',
    message: 'Greetings in the name of our Lord. We write on behalf of the Christian Association in Igbaye to thank Rt. Hon. Egbedun for the school overhaul. We would be honored to host him for a constituency prayer breakfast next month.',
    submittedAt: '2026-09-18T16:20:00Z',
    read: true,
    replied: true
  },
  {
    id: 'msg-02',
    fullName: 'Folashade Adegoke',
    email: 'fola.adegoke@outlook.com',
    phone: '+234 818 222 3344',
    community: 'Ekusa',
    subject: 'Request for Women Empowerment Training in Ekusa',
    message: 'Good day campaign team. We have over 70 women in Ekusa who are eager to participate in the tailoring and soap-making training. How can we get them enrolled in the next batch before the election?',
    submittedAt: '2026-09-24T11:05:00Z',
    read: false,
    replied: false
  }
];

export const INITIAL_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-01',
    title: 'Rt. Hon. Adewale Egbedun Presiding over Plenary Session',
    category: 'State House Sessions',
    location: 'Osun State House of Assembly Chamber, Osogbo',
    date: 'July 2026',
    imageUrl: '/src/assets/images/hon_adewale_egbedun_portrait_1790568774499.jpg',
    caption: 'Dignified leadership at the helm of the Osun State legislature during the passage of key people-centered development bills.'
  },
  {
    id: 'gal-02',
    title: 'Historic Town Hall with Odo-Otin Stakeholders',
    category: 'Community Engagement',
    location: 'Okuku Town Hall, Odo-Otin',
    date: 'August 2026',
    imageUrl: '/src/assets/images/campaign_rally_odon_otin_1790568787984.jpg',
    caption: 'Interacting directly with thousands of constituents, market leaders, and community elders to review needs and progress.'
  },
  {
    id: 'gal-03',
    title: 'Commissioning of the Okuku - Ijabe Asphalt Link Road',
    category: 'Project Commissioning',
    location: 'Ijabe Community, Odo-Otin',
    date: 'November 2024',
    imageUrl: '/src/assets/images/infrastructure_project_commissioning_1790568798405.jpg',
    caption: 'Cutting the ribbon for the newly tarred road infrastructure, accompanied by royal fathers and happy farmers.'
  },
  {
    id: 'gal-04',
    title: 'Youth & Women Empowerment Presentation Ceremony',
    category: 'Official Duties as Speaker',
    location: 'Inisa Community Pavilion',
    date: 'December 2024',
    imageUrl: '/src/assets/images/empowerment_program_event_1790568809065.jpg',
    caption: 'Handing over business starter equipment, sewing machines, and tech toolkits to young beneficiaries.'
  },
  {
    id: 'gal-05',
    title: 'Constituency Engagement with Royal Council of Obas',
    category: 'Constituency Meetings',
    location: 'Palace of the Olokuku of Okuku',
    date: 'May 2025',
    imageUrl: '/src/assets/images/campaign_rally_odon_otin_1790568787984.jpg',
    caption: 'Receiving royal blessings and policy counsel from the Council of Traditional Rulers across Odo-Otin.'
  },
  {
    id: 'gal-06',
    title: 'Celebration with Odo-Otin Constituents during Cultural Day',
    category: 'Festive Celebrations',
    location: 'Oyan Cultural Grounds',
    date: 'January 2026',
    imageUrl: '/src/assets/images/campaign_rally_odon_otin_1790568787984.jpg',
    caption: 'Celebrating Yoruba tradition, music, and community harmony with youth leaders and cultural troupes.'
  }
];

export const INITIAL_BIOGRAPHY: BiographyData = {
  fullName: 'Rt. Hon. Adewale Egbedun',
  officialTitle: 'Speaker, Osun State House of Assembly',
  subTitle: 'Member Representing Odo-Otin State Constituency',
  officeHeld: 'Speaker, Osun State House of Assembly',
  constituencyName: 'Odo-Otin State Constituency (16 Communities)',
  politicalPlatform: 'Accord Party (Oneness & Progress)',
  portraitUrl: '/src/assets/images/hon_adewale_egbedun_portrait_1790568774499.jpg',
  hometown: 'Odo-Otin Local Government Area, Osun State',
  education: 'Public Administration, Business Strategy & Policy Analysis',
  legislativeFocus: 'Rural Economy, Primary Health, Youth ICT, Public Transparency',
  faithAndFamily: 'Devoted family man, community benefactor, and champion of peaceful coexistence',
  earlyLifeTitle: 'Early Life, Heritage & Omoluabi Ethics',
  earlyLifeParagraph1:
    'Rt. Hon. Adewale Egbedun was born in the serene heartland of Odo-Otin Local Government Area, a cradle of historic agrarian industry and Yoruba scholarship. Raised in a close-knit household that prized moral discipline, academic excellence, and selflessness, young Adewale learned early in life that genuine leadership begins with listening to the hopes and struggles of everyday people.',
  earlyLifeParagraph2:
    'His educational journey across prominent Nigerian institutions instilled in him a sharp analytical mind and a deep understanding of macroeconomic development, public budgeting, and civic empowerment.',
  speakershipTitle: 'Ascent to the Speakership: Transformative Assembly Leadership',
  speakershipParagraph1:
    'Upon taking his seat in the Osun State House of Assembly in 2023 representing Odo-Otin, his peers unanimously recognized his extraordinary balance of youthful vigor, calm temperament, and profound institutional respect by electing him Speaker of the 8th Osun Assembly.',
  speakershipParagraph2:
    'Under his stewardship, the Osun State Legislature has distinguished itself through unprecedented efficiency. Rather than indulging in political rancor, Speaker Egbedun steered the House towards enacting people-centered laws, including the landmark Rural Infrastructure Expansion Bill, Social Health Insurance Funding framework, and youth digital employment incentives.',
  constituentsBondTitle: 'Unbreakable Bond with Odo-Otin Constituents',
  constituentsBondParagraph1:
    'Despite the demanding schedule of presiding over state legislative business, Rt. Hon. Egbedun remains an omnipresent leader in his home constituency. He holds regular consultative assemblies across all 16 communities—from Okuku to Inisa, Oyan, Igbaye, Ijabe, Ila-Odo, Agbeye, Ekosin, Iyeku, Faji, Opete, Okua, Ekusa, Asi Asaba, Ore, and Oba Ojomu.',
  constituentsBondQuote:
    'A legislator does not own the mandate; the people own the mandate. Our duty is to return home with verifiable roads, solar water boreholes, school books, and healthcare facilities that make our mothers smile and our youth proud.',
  milestones: [
    {
      year: '1982',
      title: 'Humble Roots in Odo-Otin',
      desc: 'Born into an esteemed, hardworking family in Odo-Otin Local Government Area. Imbibed the core Yoruba cultural tenets of Omoluabi—integrity, respect, and communal responsibility.'
    },
    {
      year: '2004',
      title: 'Academic Foundations & Tertiary Education',
      desc: 'Earned degree qualifications with excellence, developing specialized expertise in public administration, grassroots economics, and organizational leadership.'
    },
    {
      year: '2015',
      title: 'Grassroots Community Mobilization',
      desc: 'Spearheaded numerous youth empowerment initiatives, community development associations, and farmers’ advocacy networks across Okuku, Inisa, and rural Odo-Otin wards.'
    },
    {
      year: '2023',
      title: 'Elected to Osun State House of Assembly',
      desc: 'Elected overwhelmingly by the good people of Odo-Otin State Constituency to represent their voice, aspirations, and legislative welfare at the Osun State House of Assembly.'
    },
    {
      year: '2023',
      title: 'Unanimous Election as Speaker of Osun Assembly',
      desc: 'In a testament to his unifying character, maturity, and vision, elected Speaker of the 8th Osun State House of Assembly, becoming one of Nigeria’s most vibrant and progressive legislative leaders.'
    },
    {
      year: '2024–2026',
      title: 'Transformative Stewardship & Constituency Delivery',
      desc: 'Presided over landmark people-first laws, initiated 42+ verifiable infrastructure projects in Odo-Otin, and championed state-wide harmony between the executive and legislative arms.'
    },
    {
      year: '2027',
      title: 'The Re-election Mandate for Continuity',
      desc: 'Offering himself on the platform of Accord Party to consolidate on unprecedented achievements and lead Odo-Otin into an era of sustained agro-industrial prosperity.'
    }
  ]
};

