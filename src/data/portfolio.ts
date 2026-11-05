export interface SkillItem {
  name: string;
  tag?: string;
  url: string;
}

export interface SkillGroup {
  index: string;
  title: string;
  accent: "emerald" | "sky" | "cyan" | "teal" | "amber";
  colSpan?: boolean;
  items: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  current?: boolean;
  location: string;
  highlights: string[];
  metrics: { label: string; value: string }[];
  stack: string[];
}

export interface AppStoreLink {
  label: string;
  platform: "android" | "ios" | "web";
  url: string;
  packageOrDomain?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category:
    | "Fintech"
    | "E-Commerce"
    | "Multi-App Suite"
    | "Food & Delivery"
    | "Enterprise & EdTech"
    | "Web & POS";
  region: string;
  description: string;
  longDescription: string;
  links: AppStoreLink[];
  metrics: string[];
  features: string[];
  tech: string[];
  featured?: boolean;
}

export interface EngineeringNote {
  id: string;
  index: string;
  domain: string;
  title: string;
  readTime: string;
  summary: string;
  takeaways: string[];
  codeSnippet: string;
}

export const PROFILE = {
  name: "Umair Amjad",
  shortName: "Umair",
  role: "Senior Mobile Application Developer",
  tagline: "Flutter | Offline-First | Fintech Payments | Clean Architecture",
  email: "umairjanjua.ad@gmail.com",
  phone: "+92 308 6469325",
  whatsappUrl: "https://wa.me/923086469325",
  location: "Kamoke, Gujranwala, Pakistan",
  shortLocation: "Pakistan / Remote",
  linkedin: "https://www.linkedin.com/in/umair-amjad-53410b149",
  gitlab: "https://gitlab.com/Umair_Amjad",
  github: "https://github.com/umair-janjua",
  timezone: "Asia/Karachi",
  portfolioDocUrl:
    "https://docs.google.com/document/d/1u0RVghqzTwqjbFJBzcDt-MasFbWRjkCxY7AyyUqGo64/edit?usp=sharing",
  resumeUrl: "/downloads/Umair_Amjad_CV.pdf",
  summary:
    "Mobile Developer with 4+ years shipping production mobile & web apps across fintech, e-commerce, delivery ecosystems, and EdTech. Specialise in offline-first architecture, multi-gateway payment integration and Clean Architecture at team scale. 15+ mobile & web apps shipped across Google Play, App Store and Web—most recently a fintech product serving 20,000+ users at 99.4% crash-free sessions.",
  heroStats: [
    { label: "Location", value: "Pakistan / Remote" },
    { label: "Proof", value: "20+ Store & Web Builds" },
    {
      label: "Current Status",
      value: "Open to Senior Mobile roles, remote contracts & global clients",
      colSpan: true,
    },
    {
      label: "Mission",
      value: "Offline-first resilience. Sub-second sync. 99.4%+ crash-free apps.",
      colSpan: true,
    },
  ],
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    index: "01",
    title: "MOBILE & LANGUAGES",
    accent: "emerald",
    colSpan: true,
    items: [
      { name: "Flutter", url: "https://flutter.dev" },
      { name: "Dart", url: "https://dart.dev" },
      { name: "Kotlin", url: "https://kotlinlang.org" },
      { name: "Java", url: "https://dev.java" },
      { name: "React Native", url: "https://reactnative.dev" },
      { name: "TypeScript", url: "https://www.typescriptlang.org" },
      { name: "JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
      { name: "SQL", url: "https://www.sqlite.org" },
    ],
  },
  {
    index: "02",
    title: "ARCHITECTURE & STATE",
    accent: "sky",
    items: [
      { name: "Clean Architecture (MVVM)", url: "https://flutter.dev/docs/development/data-and-backend/state-mgmt" },
      { name: "Feature-First", url: "https://flutter.dev" },
      { name: "BLoC & Cubit", url: "https://bloclibrary.dev" },
      { name: "Riverpod", url: "https://riverpod.dev" },
      { name: "GetX", url: "https://pub.dev/packages/get" },
      { name: "Provider", url: "https://pub.dev/packages/provider" },
      { name: "Zustand & TanStack Query", url: "https://tanstack.com/query" },
      { name: "SOLID Principles", url: "https://dart.dev" },
    ],
  },
  {
    index: "03",
    title: "BACKEND, SYNC & PAYMENTS",
    accent: "cyan",
    items: [
      { name: "PowerSync (Offline-First)", url: "https://www.powersync.com" },
      { name: "Firebase (Firestore, FCM, Auth)", url: "https://firebase.google.com" },
      { name: "Supabase", url: "https://supabase.com" },
      { name: "REST & GraphQL", url: "https://graphql.org" },
      { name: "WebSockets", url: "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API" },
      { name: "Node.js & Cloud Functions", url: "https://nodejs.org" },
      { name: "Multi-Gateway Payments", url: "https://stripe.com" },
      { name: "OAuth 2.0 / JWT", url: "https://jwt.io" },
      { name: "Google Maps SDK & Geolocation", url: "https://developers.google.com/maps" },
    ],
  },
  {
    index: "04",
    title: "PLATFORM, CI/CD & DELIVERY",
    accent: "teal",
    items: [
      { name: "Fastlane CI/CD", url: "https://fastlane.tools" },
      { name: "App Store Connect", url: "https://appstoreconnect.apple.com" },
      { name: "Google Play Console", url: "https://play.google.com/console" },
      { name: "TestFlight", url: "https://developer.apple.com/testflight/" },
      { name: "Git / GitLab / GitHub", url: "https://gitlab.com/Umair_Amjad" },
      { name: "Figma", url: "https://www.figma.com" },
      { name: "Agile / Scrum", url: "https://www.scrum.org" },
    ],
  },
  {
    index: "05",
    title: "TESTING, PERFORMANCE & AI",
    accent: "amber",
    items: [
      { name: "Unit & Widget Testing", url: "https://docs.flutter.dev/testing" },
      { name: "Integration Testing", url: "https://docs.flutter.dev/testing/integration-tests" },
      { name: "Firebase Crashlytics", url: "https://firebase.google.com/products/crashlytics" },
      { name: "Hermes & MMKV Caching", url: "https://github.com/Tencent/MMKV" },
      { name: "TurboModules", url: "https://reactnative.dev" },
      { name: "Code Review & AI Tooling", url: "https://flutter.dev" },
    ],
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "bixo-soft",
    company: "Bixo Soft",
    role: "Senior Flutter Developer",
    period: "July 2024 – Present",
    current: true,
    location: "Pakistan · Hybrid / Remote",
    metrics: [
      { label: "Apps Shipped", value: "6 Prod Apps" },
      { label: "Payment Volume", value: "15,000+ tx/mo" },
      { label: "Deploy Time", value: "2h → 15m" },
      { label: "Stability", value: "99.4%+ Crash-Free" },
    ],
    highlights: [
      "Shipped six production Flutter apps across fintech, e-commerce and EdTech for iOS, Android and Web.",
      "Built an offline-first architecture with PowerSync, encrypted local storage, biometric authentication and role-based access control (RBAC), keeping core flows fully usable without connectivity.",
      "Integrated multi-gateway payment processing and real-time event streaming with sub-second sync latency, handling 15,000+ transactions per month.",
      "Set the Clean Architecture and state-management standard now followed by four developers on the mobile team, and review feature branches against it.",
      "Automated iOS and Android releases with Fastlane, cutting deploy time from 2 hours to 15 minutes across 30+ store submissions while holding crash-free sessions above 99.4%.",
    ],
    stack: [
      "Flutter",
      "Dart",
      "PowerSync",
      "Clean Architecture",
      "BLoC / Riverpod",
      "Multi-Gateway Payments",
      "Biometric RBAC",
      "Fastlane CI/CD",
    ],
  },
  {
    id: "gteksol",
    company: "Gteksol",
    role: "Flutter Developer",
    period: "May 2022 – July 2024",
    location: "Pakistan",
    metrics: [
      { label: "End-to-End Apps", value: "6 Full Builds" },
      { label: "Cold Start", value: "3.1s → 1.4s" },
      { label: "Memory Footprint", value: "-22% RAM" },
      { label: "Release Cycle", value: "14d → 3d" },
    ],
    highlights: [
      "Sole Flutter and React Native developer on six end-to-end projects, owning technical design, third-party integration and store releases across Android, iOS and Web.",
      "Built multi-app e-commerce and real-time systems on Firestore, Cloud Functions, WebSockets and Maps/Geolocation, powering live order tracking, in-app messaging and cross-device sync.",
      "Cut cold start from 3.1s to 1.4s using the Hermes engine, MMKV caching and TurboModules, and reduced memory footprint by 22%.",
      "Architected state and data layers with BLoC, Riverpod, Zustand and TanStack Query, standardising four codebases on one rendering pattern.",
      "Automated release pipelines with Fastlane and Firebase, shortening the release cycle from two weeks to three days.",
    ],
    stack: [
      "Flutter",
      "React Native",
      "Firestore",
      "Cloud Functions",
      "WebSockets",
      "Google Maps SDK",
      "Hermes & MMKV",
      "Fastlane",
    ],
  },
  {
    id: "alrehman-solutions",
    company: "Alrehman Solutions",
    role: "Android Developer (Internship)",
    period: "February 2021 – May 2021",
    location: "Pakistan",
    metrics: [
      { label: "Native Apps", value: "2 Android Apps" },
      { label: "Languages", value: "Kotlin & Java" },
      { label: "Methodology", value: "Agile / Scrum" },
    ],
    highlights: [
      "Built a native blog application and an employee tracking system in Java and Kotlin within an Agile engineering team.",
      "Diagnosed and resolved production defects and delivered measurable UI rendering and performance improvements across both Android codebases.",
    ],
    stack: ["Kotlin", "Java", "Android SDK", "REST APIs", "Agile / Scrum"],
  },
];

export const EDUCATION = {
  degree: "BS Computer Science",
  institution: "Government College University, Faisalabad",
  period: "2016 – 2020",
  focus: "Software Engineering, Data Structures, Mobile Computing & Databases",
};

export const SERVICES = [
  {
    index: "01",
    title: "Cross-Platform Mobile & Web",
    description:
      "Production Flutter & React Native apps for iOS, Android, Web & POS built on Clean Architecture and SOLID principles.",
  },
  {
    index: "02",
    title: "Offline-First & Sync Engines",
    description:
      "Resilient local-first flows with PowerSync, encrypted storage, biometric auth, and sub-second conflict-free sync.",
  },
  {
    index: "03",
    title: "Fintech & Multi-App Ecosystems",
    description:
      "Multi-gateway payments, group-pooling wallets, and synchronized Customer + Vendor + Rider + Admin ecosystems.",
  },
  {
    index: "04",
    title: "CI/CD & Performance Tuning",
    description:
      "Fastlane automated App Store & Play Store pipelines (15m deploys), cold-start optimization, and 99.4%+ crash-free QA.",
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "ohana-africa",
    title: "Ohana Africa",
    subtitle: "Online Money-Pooling & Fintech Platform",
    category: "Fintech",
    region: "Africa",
    featured: true,
    description:
      "Community money-pooling fintech for 20,000+ users with multi-gateway payments & PowerSync offline ledger.",
    longDescription:
      "Production fintech app enabling communities, associations, and families across Africa to create transparent savings pools, automate recurring contributions, and process multi-gateway mobile-money & card payouts at 99.4% crash-free reliability.",
    links: [
      {
        label: "Google Play",
        platform: "android",
        url: "https://play.google.com/store/apps/details?id=com.ohana.africa&hl=en",
        packageOrDomain: "com.ohana.africa",
      },
      {
        label: "App Store",
        platform: "ios",
        url: "https://apps.apple.com/us/app/ohana-africa/id6502834614",
        packageOrDomain: "id6502834614",
      },
    ],
    metrics: ["20,000+ Active Users", "15,000+ Monthly Tx", "99.4% Crash-Free"],
    features: [
      "Multi-gateway mobile money & card payment processing with sub-second real-time event sync",
      "Offline-first ledger & pool balances powered by PowerSync and encrypted local storage",
      "Biometric authentication & role-based group admin permissions (RBAC)",
      "Automated 15-minute release pipeline via Fastlane",
    ],
    tech: ["Flutter", "Dart", "PowerSync", "Clean Architecture", "BLoC", "Multi-Gateway Payments", "Fastlane"],
  },
  {
    id: "salveowell",
    title: "Salveowell",
    subtitle: "Health & Wellness E-Commerce App",
    category: "E-Commerce",
    region: "Philippines",
    featured: true,
    description:
      "Cross-platform health & wellness marketplace in the Philippines with member tiers, bundles & live tracking.",
    longDescription:
      "End-to-end cross-platform shopping app powering product discovery, member-tier pricing, bundle promotions, localized payment checkout, and push notification order updates on both Google Play and Apple App Store.",
    links: [
      {
        label: "Google Play",
        platform: "android",
        url: "https://play.google.com/store/apps/details?id=com.salveowell&hl=en",
        packageOrDomain: "com.salveowell",
      },
      {
        label: "App Store",
        platform: "ios",
        url: "https://apps.apple.com/ph/app/salveowell/id6445860307",
        packageOrDomain: "id6445860307",
      },
    ],
    metrics: ["iOS & Android Live", "Rewards & Checkout", "Real-Time Sync"],
    features: [
      "Multi-gateway Philippine payment integration, voucher wallets, and bundle pricing",
      "Real-time order tracking, FCM push alerts, and persistent cross-device cart sync",
      "Modular Clean Architecture shared across the Salveowell & SWAPP product line",
    ],
    tech: ["Flutter", "Dart", "Riverpod", "Firebase", "REST APIs", "FCM", "Clean Architecture"],
  },
  {
    id: "swapp-ecosystem",
    title: "SWAPP Members & SWAPP Academy",
    subtitle: "Distributor RBAC Portal & EdTech Suite",
    category: "Enterprise & EdTech",
    region: "Philippines / Global",
    featured: true,
    description:
      "4-app distributor RBAC business portal (Members) & video course EdTech platform (Academy) on iOS & Android.",
    longDescription:
      "Dual-app enterprise & EdTech suite: SWAPP Members delivers role-based commission dashboards, genealogy tracking, and rebate management, while SWAPP Academy streams structured onboarding courses and tracks learning milestones.",
    links: [
      {
        label: "SWAPP Members (Android)",
        platform: "android",
        url: "https://play.google.com/store/apps/details?id=com.swapp.members&hl=en",
        packageOrDomain: "com.swapp.members",
      },
      {
        label: "SWAPP Members (iOS)",
        platform: "ios",
        url: "https://apps.apple.com/pk/app/swapp-members/id6451248997",
        packageOrDomain: "id6451248997",
      },
      {
        label: "SWAPP Academy (Android)",
        platform: "android",
        url: "https://play.google.com/store/apps/details?id=com.swapp.academy&hl=en",
        packageOrDomain: "com.swapp.academy",
      },
      {
        label: "SWAPP Academy (iOS)",
        platform: "ios",
        url: "https://apps.apple.com/us/app/swapp-academy/id6742397211",
        packageOrDomain: "id6742397211",
      },
    ],
    metrics: ["4 Store Listings", "Role-Based Access (RBAC)", "Video EdTech"],
    features: [
      "Strict role-based access control (RBAC) for distributors, leaders, and members",
      "Real-time earnings, rebates, and team network dashboards in SWAPP Members",
      "Adaptive video course delivery and lesson completion tracking in SWAPP Academy",
    ],
    tech: ["Flutter", "Clean Architecture", "BLoC / Cubit", "OAuth / JWT", "RBAC", "Video Streaming"],
  },
  {
    id: "gcart-bazaar-suite",
    title: "GCart & GCart-Bazaar Ecosystem",
    subtitle: "6-App Marketplace, Grocery, Rider & Web Suite",
    category: "Multi-App Suite",
    region: "Pakistan",
    featured: true,
    description:
      "6-build commerce ecosystem connecting Customer, Vendor, Grocery & Rider Android apps with 2 Web portals.",
    longDescription:
      "End-to-end multi-role commerce platform connecting shoppers, store vendors, and delivery riders in real time. Includes dedicated Android apps for marketplace shopping, grocery delivery, vendor store management, and rider dispatch—paired with live Flutter/Web customer and vendor portals.",
    links: [
      {
        label: "Customer App (Play)",
        platform: "android",
        url: "https://play.google.com/store/apps/details?id=com.gcart_bazar_customer.gcart_bazar_customer",
        packageOrDomain: "com.gcart_bazar_customer",
      },
      {
        label: "Vendor App (Play)",
        platform: "android",
        url: "https://play.google.com/store/apps/details?id=com.gcart_bazaar_store_admin.gcart_bazaar_store_admin",
        packageOrDomain: "com.gcart_bazaar_store_admin",
      },
      {
        label: "Rider App (Play)",
        platform: "android",
        url: "https://play.google.com/store/apps/details?id=com.gcart_bazaar_rider.gcart_bazaar_rider",
        packageOrDomain: "com.gcart_bazaar_rider",
      },
      {
        label: "GCart Groceries (Play)",
        platform: "android",
        url: "https://play.google.com/store/apps/details?id=com.gcart.g_cart_customer",
        packageOrDomain: "com.gcart.g_cart_customer",
      },
      {
        label: "Bazaar Web Store",
        platform: "web",
        url: "https://bazaarapp.gcart.pk/",
        packageOrDomain: "bazaarapp.gcart.pk",
      },
      {
        label: "Vendor Web Portal",
        platform: "web",
        url: "https://gbvendor.gcart.pk/",
        packageOrDomain: "gbvendor.gcart.pk",
      },
    ],
    metrics: ["6 Live Apps (4 Play + 2 Web)", "Live Rider Tracking", "Real-Time Sync"],
    features: [
      "Synchronized real-time order lifecycle across Customer, Store Vendor, and Delivery Rider apps",
      "Google Maps SDK & geolocation courier tracking with instant FCM status push notifications",
      "Cross-platform deployment covering Google Play Store and live Web storefronts",
    ],
    tech: ["Flutter", "Dart", "Firebase", "Firestore", "WebSockets", "Google Maps SDK", "Flutter Web"],
  },
  {
    id: "lofu-delivery-suite",
    title: "Lofu Food Delivery Suite",
    subtitle: "LofuFood · LofuStore · LofuDriver (4 Store Builds)",
    category: "Food & Delivery",
    region: "United Kingdom / Global",
    featured: true,
    description:
      "On-demand UK food delivery suite across iOS & Android: LofuFood (Diner), LofuStore (Merchant) & LofuDriver.",
    longDescription:
      "Full-stack mobile food delivery platform featuring LofuFood (iOS & Android customer ordering app), LofuStore (restaurant order prep & menu management), and LofuDriver (live turn-by-turn courier dispatch and earnings).",
    links: [
      {
        label: "LofuFood (iOS)",
        platform: "ios",
        url: "https://apps.apple.com/gb/app/lofufood/id1639729446",
        packageOrDomain: "id1639729446",
      },
      {
        label: "LofuFood (Android)",
        platform: "android",
        url: "https://play.google.com/store/apps/details?id=com.hybridsol.lofufood",
        packageOrDomain: "com.hybridsol.lofufood",
      },
      {
        label: "LofuStore Merchant (Android)",
        platform: "android",
        url: "https://play.google.com/store/apps/details?id=com.hybridsol.lofustore",
        packageOrDomain: "com.hybridsol.lofustore",
      },
      {
        label: "LofuDriver Rider (Android)",
        platform: "android",
        url: "https://play.google.com/store/apps/details?id=com.hybridsol.lofudriver",
        packageOrDomain: "com.hybridsol.lofudriver",
      },
    ],
    metrics: ["iOS + 3 Android Apps", "Live Driver GPS", "Merchant Dispatch"],
    features: [
      "Real-time restaurant order acceptance, prep timers, and automated driver assignment",
      "Live map route tracking and delivery status streaming between customer and courier",
      "Unified state architecture and shared design system across all three role apps",
    ],
    tech: ["Flutter", "Google Maps SDK", "Firebase", "WebSockets", "BLoC / Provider", "REST APIs"],
  },
  {
    id: "gahhak",
    title: "Gahhak",
    subtitle: "Social E-Commerce & Group-Buying App",
    category: "E-Commerce",
    region: "Pakistan / US Store",
    featured: true,
    description:
      "Social commerce & group-buying marketplace with deal timers and deep-link invites on Play Store & App Store.",
    longDescription:
      "Interactive social shopping platform allowing buyers to unlock wholesale deals through group purchasing, share product pools, and track deliveries seamlessly across Android and iOS.",
    links: [
      {
        label: "Google Play",
        platform: "android",
        url: "https://play.google.com/store/apps/details?id=com.gahhakapplication.gahhak",
        packageOrDomain: "com.gahhakapplication.gahhak",
      },
      {
        label: "App Store",
        platform: "ios",
        url: "https://apps.apple.com/us/app/gahhak/id1553908011",
        packageOrDomain: "id1553908011",
      },
    ],
    metrics: ["iOS & Android Live", "Social Group Buying", "Deep-Link Sharing"],
    features: [
      "Dynamic group-buying deal timers, social invite deep-links, and instant checkout",
      "Optimized cold start and smooth catalog infinite-scroll with local caching",
      "Published and maintained across both Apple App Store and Google Play Console",
    ],
    tech: ["Flutter", "React Native", "REST APIs", "Firebase", "Deep Linking", "Push Notifications"],
  },
  {
    id: "boshna",
    title: "Boshna (بوشنا)",
    subtitle: "Saudi E-Commerce Marketplace",
    category: "E-Commerce",
    region: "Saudi Arabia",
    description:
      "Bilingual Arabic RTL / English shopping marketplace built for Saudi Arabia with localized KSA checkout.",
    longDescription:
      "Production e-commerce app built for the Saudi market (boshna.sa), featuring full Arabic RTL & English localization, smooth category filtering, promotional campaigns, and regional payment & shipping integrations.",
    links: [
      {
        label: "Google Play",
        platform: "android",
        url: "https://play.google.com/store/apps/details?id=com.boshna.sa",
        packageOrDomain: "com.boshna.sa",
      },
    ],
    metrics: ["Saudi Market (KSA)", "Full Arabic RTL", "Google Play Live"],
    features: [
      "First-class Arabic RTL layout support alongside English locale switching",
      "Localized KSA checkout, address geolocation, and order tracking flows",
      "Clean Architecture data layer with responsive caching for large product catalogs",
    ],
    tech: ["Flutter", "Dart", "RTL Localization", "Clean Architecture", "REST APIs", "Google Maps"],
  },
  {
    id: "fattafatt-sawaeboa",
    title: "FattaFatt & Sawaeboa",
    subtitle: "International On-Demand Delivery & Marketplace (iOS)",
    category: "Food & Delivery",
    region: "Caribbean & Canada",
    description:
      "International iOS App Store releases: FattaFatt quick-commerce delivery & Sawaeboa multi-vendor marketplace.",
    longDescription:
      "Two international App Store products built for global clients: FattaFatt Home Deliveries powers rapid home delivery & dispatch in Trinidad & Tobago, while Sawaeboa enables multi-vendor storefront shopping and merchant management in Canada.",
    links: [
      {
        label: "FattaFatt (App Store)",
        platform: "ios",
        url: "https://apps.apple.com/tt/app/fattafatt-home-deliveries/id1616299164",
        packageOrDomain: "id1616299164",
      },
      {
        label: "Sawaeboa (App Store)",
        platform: "ios",
        url: "https://apps.apple.com/ca/app/sawaeboa/id1613394866",
        packageOrDomain: "id1613394866",
      },
    ],
    metrics: ["2 Global iOS Apps", "Quick-Commerce", "Multi-Vendor"],
    features: [
      "FattaFatt: On-demand home delivery cart, live courier status, and instant dispatch notifications",
      "Sawaeboa: Multi-vendor catalog management, merchant portals, and localized Canadian checkout",
      "End-to-end Apple App Store provisioning, TestFlight beta testing, and store compliance",
    ],
    tech: ["Flutter", "iOS App Store", "TestFlight", "REST APIs", "Geolocation", "Push Notifications"],
  },
  {
    id: "custom-pos-systems",
    title: "Custom Cloud POS & Ordering Suite",
    subtitle: "Chand Super Star & Sethi Tikka Web POS",
    category: "Web & POS",
    region: "Commercial Web / POS",
    description:
      "High-speed retail & restaurant Web POS systems for counter billing, inventory & live online ordering.",
    longDescription:
      "Custom browser-based POS and digital storefront systems built for high-volume retail and hospitality brands—streamlining counter billing, kitchen/order tickets, inventory tracking, and direct online customer orders.",
    links: [
      {
        label: "Chand Super Star POS",
        platform: "web",
        url: "https://chandsuperstar.com/",
        packageOrDomain: "chandsuperstar.com",
      },
      {
        label: "Sethi Tikka POS & Shop",
        platform: "web",
        url: "https://sethitikka.shop/",
        packageOrDomain: "sethitikka.shop",
      },
    ],
    metrics: ["2 Production POS", "Fast Counter Billing", "Live Inventory & Orders"],
    features: [
      "Keyboard-friendly rapid POS billing interface designed for peak-hour checkout speed",
      "Unified online customer ordering + in-store order queue management",
      "Real-time sales reporting, receipt generation, and catalog administration",
    ],
    tech: ["Flutter Web", "TypeScript / JS", "REST & Realtime Sync", "Responsive POS UI"],
  },
];

// Flat directory computed automatically so every single link from Umair's Google Doc is accessible
export const ALL_APP_LINKS: (AppStoreLink & {
  projectTitle: string;
  category: string;
  region: string;
})[] = PROJECTS.flatMap((project) =>
  project.links.map((link) => ({
    ...link,
    projectTitle: project.title,
    category: project.category,
    region: project.region,
  }))
);

export const MILESTONES = [
  {
    badge: "🚀 Scale & Reliability",
    year: "2024 – Present",
    title: "20,000+ Fintech Users @ 99.4% Crash-Free",
    description:
      "Architected and shipped production fintech & e-commerce apps processing 15,000+ monthly transactions with sub-second sync latency and 99.4%+ crash-free sessions.",
  },
  {
    badge: "🌍 Multi-Market Portfolio",
    year: "2022 – Present",
    title: "20+ Store & Web Deployments Across 6+ Countries",
    description:
      "Published and maintained Android, iOS, and Web/POS products serving users in Africa, Philippines, Saudi Arabia, UK, Canada, Caribbean, and Pakistan.",
  },
  {
    badge: "⚡ CI/CD Velocity",
    year: "2024 – Present",
    title: "Cut Store Deployment Time by 87% (2h → 15m)",
    description:
      "Automated iOS TestFlight/App Store and Google Play Console pipelines using Fastlane across 30+ production store submissions.",
  },
  {
    badge: "🏗️ Team Technical Leadership",
    year: "2024 – Present",
    title: "Clean Architecture Standard Across 4 Mobile Engineers",
    description:
      "Defined the Feature-First MVVM, BLoC/Riverpod state standard, and PR review gates followed across Bixo Soft's mobile engineering team.",
  },
  {
    badge: "🔥 Runtime Optimization",
    year: "2022 – 2024",
    title: "Cold Start 3.1s → 1.4s & 22% Lower RAM Usage",
    description:
      "Tuned mobile startup and rendering pipelines using Hermes, MMKV binary caching, TurboModules, and unified rendering patterns across 4 codebases.",
  },
  {
    badge: "🎓 Academic Foundation",
    year: "2016 – 2020",
    title: "BS Computer Science — GCU Faisalabad",
    description:
      "Graduated with a Bachelor of Science in Computer Science from Government College University, Faisalabad, building native Android & cross-platform foundations.",
  },
];

export const IMPACT_METRICS = [
  {
    value: "20+",
    label: "Play, iOS & Web Builds",
    detail: "Complete ecosystems shipped across Google Play, Apple App Store & Web POS.",
  },
  {
    value: "20,000+",
    label: "Active Fintech Users",
    detail: "Serving real money-pooling communities at 99.4% crash-free sessions.",
  },
  {
    value: "15,000+",
    label: "Monthly Transactions",
    detail: "Multi-gateway payment processing with sub-second real-time sync.",
  },
  {
    value: "15 min",
    label: "Automated Releases",
    detail: "Reduced from 2 hours via Fastlane CI/CD across 30+ store submissions.",
  },
];

export const ENGINEERING_NOTES: EngineeringNote[] = [
  {
    id: "offline-first-powersync",
    index: "01",
    domain: "Offline-First",
    title: "Designing Offline-First Fintech Flows with PowerSync",
    readTime: "4 min read",
    summary:
      "How encrypted local SQLite state, optimistic queues, and biometric RBAC keep money-pooling apps usable on spotty mobile networks.",
    takeaways: [
      "Treat local encrypted SQLite (PowerSync) as the single UI source of truth—never block screen rendering on a REST spinner.",
      "Queue mutations idempotently with deterministic client UUIDs so reconnections never double-charge or duplicate ledger entries.",
      "Pair offline reads with hardware-backed biometric unlock + locally cached RBAC claims for secure zero-signal access.",
    ],
    codeSnippet: `// Offline-first reactive ledger stream (Clean Architecture Repo)
Stream<List<PoolTransaction>> watchGroupLedger(String groupId) {
  return _powerSyncDb
      .watch('SELECT * FROM transactions WHERE group_id = ? ORDER BY created_at DESC',
          parameters: [groupId])
      .map((rows) => rows.map(PoolTransactionModel.fromRow).toList());
}`,
  },
  {
    id: "multi-gateway-payments",
    index: "02",
    domain: "Fintech",
    title: "Multi-Gateway Payment Orchestration at 15k+ Tx/Month",
    readTime: "3 min read",
    summary:
      "Abstracting regional mobile-money providers and card gateways behind a unified Clean Architecture domain contract.",
    takeaways: [
      "Unify disparate payment SDKs behind a single PaymentGatewayPort interface so UI BLoCs remain 100% provider-agnostic.",
      "Combine WebSocket / realtime event streams with webhook reconciliation for sub-second confirmation UX.",
      "Instrument every payment state transition in Crashlytics breadcrumbs to keep crash-free sessions above 99.4%.",
    ],
    codeSnippet: `abstract interface class PaymentGatewayPort {
  Future<Either<PaymentFailure, PaymentIntentResult>> initiateContribution({
    required Money amount,
    required GatewayProvider provider,
    required String idempotencyKey,
  });
}`,
  },
  {
    id: "cold-start-optimization",
    index: "03",
    domain: "Performance",
    title: "Cutting Mobile Cold Start from 3.1s to 1.4s (-55%)",
    readTime: "3 min read",
    summary:
      "Practical profiling wins from migrating storage to MMKV, deferring non-critical SDK init, and enabling Hermes + TurboModules.",
    takeaways: [
      "Defer heavy third-party SDK initialization (maps, analytics, deep-links) until after the first meaningful frame paints.",
      "Replace async JSON SharedPreferences reads on boot with memory-mapped MMKV synchronous key-value access.",
      "Audit image decode caches and stream subscriptions to trim steady-state memory footprint by 22%.",
    ],
    codeSnippet: `// Defer non-blocking telemetry & warmup until post-first-frame
WidgetsBinding.instance.addPostFrameCallback((_) async {
  await Future.wait([
    CrashlyticsService.init(),
    PushNotificationService.syncToken(),
  ]);
});`,
  },
  {
    id: "fastlane-cicd",
    index: "04",
    domain: "DevOps & CI/CD",
    title: "2 Hours to 15 Minutes: Fastlane for iOS & Android",
    readTime: "3 min read",
    summary:
      "Eliminating manual Xcode archiving and Play Console uploads across 30+ store submissions without breaking code signing.",
    takeaways: [
      "Automate provisioning profiles with Fastlane Match so any authorized CI runner or senior dev can ship reproducibly.",
      "Run unit + widget test gates automatically before incrementing build numbers and uploading symbols to Crashlytics.",
      "Standardize release lanes across flavors (dev, staging, prod) to shrink release cycles from 2 weeks to 3 days.",
    ],
    codeSnippet: `lane :release_prod do
  ensure_git_status_clean
  sh("flutter test --coverage")
  sh("flutter build ipa --release --obfuscate --split-debug-info=build/symbols")
  upload_to_testflight(skip_waiting_for_build_processing: true)
end`,
  },
];
