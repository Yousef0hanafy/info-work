import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...\n')

  // ── 1. Services ──────────────────────────────────────────────────────────

  console.log('📦 Seeding services...')

  const services = await Promise.all([
    prisma.service.upsert({
      where: { slug: 'water-treatment' },
      update: {},
      create: {
        slug: 'water-treatment',
        titleEn: 'Water Treatment',
        titleAr: 'معالجة المياه',
        descriptionEn:
          'Comprehensive water treatment solutions including reverse osmosis, filtration, softening, and purification systems for industrial, commercial, and municipal applications. We design and build turnkey water treatment plants that meet WHO and Egyptian standards.',
        descriptionAr:
          'حلول شاملة لمعالجة المياه تشمل التناضح العكسي والترشيح والتنعيم وأنظمة تطهير المياه للتطبيقات الصناعية والتجارية والبلدية. نصمم ونبني محطات معالجة مياه متكاملة وفقاً لمعايير منظمة الصحة العالمية والمواصفات المصرية.',
        iconName: 'Droplets',
        features: JSON.stringify([
          'Reverse Osmosis (RO) Systems',
          'Water Filtration & Softening',
          'Industrial Water Purification',
          'Drinking Water Plants',
          'Desalination Systems',
          'Water Quality Testing & Analysis',
        ]),
        sortOrder: 1,
      },
    }),

    prisma.service.upsert({
      where: { slug: 'wastewater-treatment' },
      update: {},
      create: {
        slug: 'wastewater-treatment',
        titleEn: 'Wastewater & Sewage Treatment',
        titleAr: 'معالجة الصرف الصحي والصناعي',
        descriptionEn:
          'End-to-end wastewater and sewage treatment solutions including design, construction, and commissioning of treatment plants. We handle industrial effluent treatment, municipal sewage systems, and specialized wastewater management for slaughterhouses and food processing facilities.',
        descriptionAr:
          'حلول متكاملة لمعالجة الصرف الصحي والصناعي تشمل التصميم والإنشاء والتشغيل لمحطات المعالجة. نتولى معالجة الصرف الصناعي والأنظمة البلدية للصرف الصحي وإدارة المياه العادمة المتخصصة للمجازر ومنشآت المعالجة الغذائية.',
        iconName: 'Waves',
        features: JSON.stringify([
          'Industrial Effluent Treatment',
          'Municipal Sewage Plants',
          'Slaughterhouse Wastewater Systems',
          'Extended Aeration Systems',
          'Sludge Treatment & Disposal',
          'Biological & Chemical Treatment',
        ]),
        sortOrder: 2,
      },
    }),

    prisma.service.upsert({
      where: { slug: 'hvac' },
      update: {},
      create: {
        slug: 'hvac',
        titleEn: 'HVAC Systems',
        titleAr: 'أنظمة التكييف والتبريد',
        descriptionEn:
          'Professional HVAC design, installation, and maintenance for commercial and industrial buildings. From central air conditioning systems to precision cooling for server rooms, we deliver energy-efficient climate control solutions tailored to Egypt\'s demanding climate conditions.',
        descriptionAr:
          'تصميم وتركيب وصيانة احترافية لأنظمة التكييف والتبريد للمباني التجارية والصناعية. من أنظمة التكييف المركزي إلى التبريد الدقيق لغرف الخوادم، نقدم حلولاً فعالّة للتحكم في المناخ مصممة خصيصاً لظروف مصر المناخية المتطلبة.',
        iconName: 'Thermometer',
        features: JSON.stringify([
          'Central Air Conditioning Systems',
          'Chilled Water Systems',
          'VRV/VRF Systems',
          'Industrial Ventilation',
          'Duct Design & Fabrication',
          'Energy-Efficient Solutions',
        ]),
        sortOrder: 3,
      },
    }),

    prisma.service.upsert({
      where: { slug: 'fire-fighting' },
      update: {},
      create: {
        slug: 'fire-fighting',
        titleEn: 'Fire Fighting Systems',
        titleAr: 'أنظمة مكافحة الحرائق',
        descriptionEn:
          'Complete fire protection engineering including sprinkler systems, fire alarm networks, FM200 gas suppression, hydrant systems, and smoke extraction. All installations comply with Egyptian Civil Defense requirements and international fire safety codes.',
        descriptionAr:
          'هندسة حماية شاملة من الحرائق تشمل أنظمة الرشاشات وشبكات إنذار الحرائق والإطفاء بغاز FM200 وأنظمة الونشيات واستخراج الدخان. جميع التركيبات تتوافق مع متطلبات الدفاع المدني المصري والمعايير الدولية للسلامة من الحرائق.',
        iconName: 'Flame',
        features: JSON.stringify([
          'Wet & Dry Sprinkler Systems',
          'Fire Alarm & Detection',
          'FM200 Gas Suppression',
          'Fire Hydrant Networks',
          'Smoke Extraction Systems',
          'Fire Pump Rooms',
        ]),
        sortOrder: 4,
      },
    }),

    prisma.service.upsert({
      where: { slug: 'electromechanical' },
      update: {},
      create: {
        slug: 'electromechanical',
        titleEn: 'Electromechanical Works',
        titleAr: 'الأعمال الكهروميكانيكية',
        descriptionEn:
          'Full-scope electromechanical contracting covering electrical distribution, power generation, lighting, low-current systems, plumbing, and drainage. We integrate all building services into a cohesive, efficient infrastructure for projects of any scale.',
        descriptionAr:
          'مقاولات كهروميكانيكية شاملة تغطي التوزيع الكهربائي وتوليد الطاقة والإضاءة وأنظمة التيار المنخفض والسباكة والصرف. ندمج جميع خدمات المبنى في بنية تحتية متكاملة وفعالة للمشاريع بأي حجم.',
        iconName: 'Zap',
        features: JSON.stringify([
          'Electrical Distribution Panels',
          'Power Generation & UPS',
          'Plumbing & Drainage Networks',
          'Low Current Systems (CCTV, BMS)',
          'Lighting Design',
          'Emergency Power Systems',
        ]),
        sortOrder: 5,
      },
    }),

    prisma.service.upsert({
      where: { slug: 'civil-construction' },
      update: {},
      create: {
        slug: 'civil-construction',
        titleEn: 'Civil Construction',
        titleAr: 'الأعمال المدنية والإنشائية',
        descriptionEn:
          'Comprehensive civil engineering and construction services including excavation, foundation work, concrete structures, finishing works, and infrastructure development. Our experienced teams deliver quality construction on schedule and within budget for commercial, industrial, and residential projects.',
        descriptionAr:
          'خدمات هندسة مدنية وإنشائية شاملة تشمل أعمال الحفر والأساسات والمنشآت الخرسانية وأعمال التشطيب وتطوير البنية التحتية. فرقنا المتمرسة تنفذ بناءً عالي الجودة في الوقت المحدد وضمن الميزانية للمشاريع التجارية والصناعية والسكنية.',
        iconName: 'Building2',
        features: JSON.stringify([
          'Excavation & Earthworks',
          'Foundation & Concrete Works',
          'Structural Steel Fabrication',
          'Road & Infrastructure Construction',
          'Finishing & Decoration',
          'Project Management & Supervision',
        ]),
        sortOrder: 6,
      },
    }),
  ])

  console.log(`   ✅ Created ${services.length} services\n`)

  // ── 2. Projects ───────────────────────────────────────────────────────────

  console.log('🏗️  Seeding projects...')

  const projects = await Promise.all([
    prisma.project.upsert({
      where: { slug: 'shobra-shahab-slaughterhouse-wastewater' },
      update: {},
      create: {
        slug: 'shobra-shahab-slaughterhouse-wastewater',
        titleEn: 'Shobra Shahab Slaughterhouse Industrial Wastewater Treatment',
        titleAr: 'معالجة الصرف الصناعي — مجزر شبرا شهاب',
        descriptionEn:
          'Design and construction of a collection tank and industrial wastewater treatment station inside the automated slaughterhouse facility. The project addressed all regulatory requirements and resolved on-site challenges efficiently, achieving full compliance with environmental discharge standards.',
        descriptionAr:
          'تصميم وإنشاء خزان تجميع ومحطة معالجة الصرف الصناعي داخل المجزر الآلي. تناول المشروع جميع المتطلبات التنظيمية وحل التحديات الميدانية بكفاءة، وحقق الامتثال الكامل لمعايير التصريف البيئي.',
        category: 'sewage-treatment',
        capacity: '200 m³/day',
        duration: '6 months',
        status: 'completed',
        clientName: 'Automated Slaughterhouse Shobra Shahab',
        location: 'Cairo, Egypt',
        year: 2022,
        thumbnail: '/images/projects/shobra-shahab-thumb.jpg',
        images: JSON.stringify([
          '/images/projects/shobra-shahab-01.jpg',
          '/images/projects/shobra-shahab-02.jpg',
          '/images/projects/shobra-shahab-03.jpg',
        ]),
        techSpecs: JSON.stringify({
          treatmentMethod: 'Biological Treatment + Chemical Dosing',
          tankCapacity: '200 m³',
          dischargeStandard: 'Egyptian Law 48/1982',
          automationLevel: 'SCADA Controlled',
        }),
        featured: true,
        sortOrder: 1,
      },
    }),

    prisma.project.upsert({
      where: { slug: 'galala-water-treatment-plant' },
      update: {},
      create: {
        slug: 'galala-water-treatment-plant',
        titleEn: 'Galala City Water Treatment Plant',
        titleAr: 'محطة معالجة مياه مدينة الجلالة',
        descriptionEn:
          'A turnkey water treatment plant serving the new Galala City development. The plant includes multi-stage filtration, reverse osmosis desalination, and disinfection systems to deliver potable water meeting WHO standards to the residential and commercial zones of the city.',
        descriptionAr:
          'محطة معالجة مياه متكاملة تخدم تطوير مدينة الجلالة الجديدة. تشمل المحطة ترشيح متعدد المراحل ونظام تحلية بالتناضح العكسي وأنظمة التعقيم لتوفير مياه شرب صالحة وفقاً لمعايير منظمة الصحة العالمية للمناطق السكنية والتجارية بالمدينة.',
        category: 'water-treatment',
        capacity: '1,000 m³/day',
        duration: '14 months',
        status: 'completed',
        clientName: 'Galala City Development Authority',
        location: 'Galala City, Suez',
        year: 2023,
        thumbnail: '/images/projects/galala-water-thumb.jpg',
        images: JSON.stringify([
          '/images/projects/galala-water-01.jpg',
          '/images/projects/galala-water-02.jpg',
          '/images/projects/galala-water-03.jpg',
          '/images/projects/galala-water-04.jpg',
        ]),
        techSpecs: JSON.stringify({
          treatmentMethod: 'Multi-Stage RO + UV Disinfection',
          desalinationCapacity: '1,000 m³/day',
          recoveryRate: '75%',
          waterQuality: 'WHO Compliant',
        }),
        featured: true,
        sortOrder: 2,
      },
    }),

    prisma.project.upsert({
      where: { slug: 'new-admin-capital-hvac' },
      update: {},
      create: {
        slug: 'new-admin-capital-hvac',
        titleEn: 'New Administrative Capital — Government Complex HVAC',
        titleAr: 'العاصمة الإدارية الجديدة — تكييف مركزي للمجمع الحكومي',
        descriptionEn:
          'Complete HVAC installation for a multi-building government complex in the New Administrative Capital. The project includes a central chilled water plant, VAV air handling units, and a building management system for optimized energy consumption across 120,000 m² of conditioned space.',
        descriptionAr:
          'تركيب تكييف مركزي كامل لمجمع حكومي متعدد المباني في العاصمة الإدارية الجديدة. يشمل المشروع محطة مياه مبردة مركزية ووحدات معالجة هواء VAV ونظام إدارة المبنى لتحسين استهلاك الطاقة على مساحة 120,000 متر مربع.',
        category: 'hvac',
        capacity: '1,200 TR (Tons of Refrigeration)',
        duration: '10 months',
        status: 'in-progress',
        clientName: 'Ministry of Housing — NUCA',
        location: 'New Administrative Capital, Egypt',
        year: 2024,
        thumbnail: '/images/projects/nac-hvac-thumb.jpg',
        images: JSON.stringify([
          '/images/projects/nac-hvac-01.jpg',
          '/images/projects/nac-hvac-02.jpg',
        ]),
        techSpecs: JSON.stringify({
          coolingCapacity: '1,200 TR',
          systemType: 'Central Chilled Water + VAV',
          conditionedArea: '120,000 m²',
          bmsIntegration: 'Full BMS with Energy Monitoring',
        }),
        featured: true,
        sortOrder: 3,
      },
    }),

    prisma.project.upsert({
      where: { slug: '10th-ramadan-fire-fighting' },
      update: {},
      create: {
        slug: '10th-ramadan-fire-fighting',
        titleEn: '10th of Ramadan Industrial Zone — Fire Protection System',
        titleAr: 'المنطقة الصناعية بمدينة العاشر من رمضان — نظام الحماية من الحرائق',
        descriptionEn:
          'Design and installation of a comprehensive fire protection system for a 25,000 m² industrial warehouse complex. The system includes wet sprinkler coverage, a fire pump house with jockey and main pumps, an intelligent fire alarm system with zone detection, and an outdoor fire hydrant ring.',
        descriptionAr:
          'تصميم وتركيب نظام حماية شامل من الحرائق لمجمع مستودعات صناعية بمساحة 25,000 متر مربع. يتضمن النظام تغطية رشاشات رطبة وغرفة مضخات إطفاء بنظام جوكي والمضخة الرئيسية ونظام إنذار حريق ذكي باكتشاف المناطق وحلقة وونشيات خارجية.',
        category: 'fire-fighting',
        capacity: '25,000 m² coverage',
        duration: '5 months',
        status: 'completed',
        clientName: 'Alpha Industrial Development',
        location: '10th of Ramadan City, Egypt',
        year: 2023,
        thumbnail: '/images/projects/10th-ramadan-fire-thumb.jpg',
        images: JSON.stringify([
          '/images/projects/10th-ramadan-fire-01.jpg',
          '/images/projects/10th-ramadan-fire-02.jpg',
          '/images/projects/10th-ramadan-fire-03.jpg',
        ]),
        techSpecs: JSON.stringify({
          sprinklerType: 'Wet Pipe — Ordinary & Extended Coverage',
          firePumpCapacity: '1,500 GPM @ 125 PSI',
          alarmSystem: 'Intelligent Addressable Fire Alarm',
          hydrantSystem: 'Outdoor Double Hydrant Ring',
        }),
        featured: false,
        sortOrder: 4,
      },
    }),
  ])

  console.log(`   ✅ Created ${projects.length} projects\n`)

  // ── 3. Testimonials ─────────────────────────────────────────────────────

  console.log('💬 Seeding testimonials...')

  const testimonials = await Promise.all([
    prisma.testimonial.upsert({
      where: { id: 'testimonial-1' },
      update: {},
      create: {
        id: 'testimonial-1',
        quoteEn:
          'We collaborated on the construction of a collection tank and an industrial wastewater treatment station inside the slaughterhouse. The team handled all requirements with great professionalism and completed the work in the shortest possible time, resolving every challenge we faced during on-site execution.',
        quoteAr:
          'تم التعاون بيننا لانشاء خزان تجميع ومحطة صرف صناعي داخل المجزر وتم التعامل بحرفية مع جميع المتطلبات وانجازها فى اسرع وقت وحل جميع المشاكل التى واجهتنا اثناء سير العمل بالموقع',
        authorName: 'Nasser Fared Salem',
        authorTitle: 'Colonel Nasser Fared Salem',
        authorRoleEn: 'Manager',
        authorRoleAr: 'المدير',
        organization: 'Automated Slaughterhouse Shobra Shahab',
        projectType: 'Industrial Wastewater Treatment',
        rating: 5,
        featured: true,
        sortOrder: 1,
      },
    }),

    prisma.testimonial.upsert({
      where: { id: 'testimonial-2' },
      update: {},
      create: {
        id: 'testimonial-2',
        quoteEn:
          'We have worked together on several projects involving excavation, backfilling, replacement works, concrete works, and some finishing works over the past 5 years. The work was completed according to the project timeline with full financial commitment — no payments or engineering consultations were ever delayed.',
        quoteAr:
          'تم العمل على عدة مشاريع تتضمن اعمال حفر وردم واحلال وخرسانات وبعض اعمال التشطيبات منذ اكثر من 5 اعوام وتم انجاز العمل على حسب الخطة الزمنية المقررة للمشروع مع الالتزام الكامل بالجانب المادي من طرف الشركة وعدم تاخير اي مستحقات مالية او استشارات هندسية بخصوص المشاريع',
        authorName: 'Hany Abbas',
        authorTitle: 'Hany Abbas',
        authorRoleEn: 'Contractor',
        authorRoleAr: 'مقاول',
        organization: null,
        projectType: 'Civil Construction',
        rating: 5,
        featured: true,
        sortOrder: 2,
      },
    }),

    prisma.testimonial.upsert({
      where: { id: 'testimonial-3' },
      update: {},
      create: {
        id: 'testimonial-3',
        quoteEn:
          'Infeworks International was selected to collaborate on several projects based on their expertise in sewage and water treatment plants and their proven track record. All subcontracted works were executed without any breach of the agreement terms during the implementation period. The work was delivered to the highest quality, on schedule, and all observations were addressed promptly.',
        quoteAr:
          'تم اختيار الشركة الدولية للاعمال الهندسية للتعاون فى عدة مشاريع استنادا على خبراتها فى مجالات محطات الصرف الصحي والمياه وسابقة الاعمال للشركة وتم تنفيذ اعمال تابعة لنا وعدم الاخلال ببنود الاتفاق اثناء مدة التنفيذ وتم التنفيذ باعلى جودة وفى وقت مناسب طبقا لجدول المشروع وتلافي جميع الملاحظات',
        authorName: 'Naser Hafny',
        authorTitle: 'Eng. Naser Hafny',
        authorRoleEn: 'Consulting Engineer',
        authorRoleAr: 'مهندس استشاري',
        organization: null,
        projectType: 'Water & Sewage Treatment',
        rating: 5,
        featured: true,
        sortOrder: 3,
      },
    }),
  ])

  console.log(`   ✅ Created ${testimonials.length} testimonials\n`)

  // ── 4. Clients ───────────────────────────────────────────────────────────

  console.log('🏢 Seeding clients...')

  const clients = await Promise.all([
    prisma.client.upsert({
      where: { id: 'client-1' },
      update: {},
      create: {
        id: 'client-1',
        name: 'Ministry of Housing & Utilities',
        logoUrl: '/images/clients/ministry-housing.png',
        type: 'client',
        sortOrder: 1,
        isActive: true,
      },
    }),

    prisma.client.upsert({
      where: { id: 'client-2' },
      update: {},
      create: {
        id: 'client-2',
        name: 'Egyptian Armed Forces Engineering Authority',
        logoUrl: '/images/clients/engineering-authority.png',
        type: 'client',
        sortOrder: 2,
        isActive: true,
      },
    }),

    prisma.client.upsert({
      where: { id: 'client-3' },
      update: {},
      create: {
        id: 'client-3',
        name: 'Galala City Development',
        logoUrl: '/images/clients/galala-city.png',
        type: 'client',
        sortOrder: 3,
        isActive: true,
      },
    }),

    prisma.client.upsert({
      where: { id: 'client-4' },
      update: {},
      create: {
        id: 'client-4',
        name: 'Orascom Construction',
        logoUrl: '/images/clients/orascom.png',
        type: 'partner',
        sortOrder: 4,
        isActive: true,
      },
    }),

    prisma.client.upsert({
      where: { id: 'client-5' },
      update: {},
      create: {
        id: 'client-5',
        name: 'Siemens Egypt',
        logoUrl: '/images/clients/siemens.png',
        type: 'partner',
        sortOrder: 5,
        isActive: true,
      },
    }),

    prisma.client.upsert({
      where: { id: 'client-6' },
      update: {},
      create: {
        id: 'client-6',
        name: 'Grundfos Egypt',
        logoUrl: '/images/clients/grundfos.png',
        type: 'supplier',
        sortOrder: 6,
        isActive: true,
      },
    }),
  ])

  console.log(`   ✅ Created ${clients.length} clients\n`)

  // ── 5. Settings ──────────────────────────────────────────────────────────

  console.log('⚙️  Seeding site settings...')

  const settings = await Promise.all([
    prisma.setting.upsert({
      where: { key: 'company_name_en' },
      update: {},
      create: {
        key: 'company_name_en',
        value: 'Infeworks International',
        type: 'text',
      },
    }),

    prisma.setting.upsert({
      where: { key: 'company_name_ar' },
      update: {},
      create: {
        key: 'company_name_ar',
        value: 'الشركة الدولية للأعمال الهندسية',
        type: 'text',
      },
    }),

    prisma.setting.upsert({
      where: { key: 'company_description_en' },
      update: {},
      create: {
        key: 'company_description_en',
        value:
          'Infeworks is a leading Egyptian EPC (Engineering, Procurement & Construction) company specializing in water treatment, HVAC, fire fighting, electromechanical, and civil construction projects across Egypt and the Middle East.',
        type: 'text',
      },
    }),

    prisma.setting.upsert({
      where: { key: 'company_description_ar' },
      update: {},
      create: {
        key: 'company_description_ar',
        value:
          'إنفيوركس هي شركة مصرية رائدة في مجال الهندسة والمشتريات والإنشاء (EPC) متخصصة في معالجة المياه والتكييف ومكافحة الحرائق والأعمال الكهروميكانيكية والإنشاءات المدنية في مصر والشرق الأوسط.',
        type: 'text',
      },
    }),

    prisma.setting.upsert({
      where: { key: 'contact_email' },
      update: {},
      create: {
        key: 'contact_email',
        value: 'info@infeworks.com',
        type: 'text',
      },
    }),

    prisma.setting.upsert({
      where: { key: 'contact_phone' },
      update: {},
      create: {
        key: 'contact_phone',
        value: '+20 2 1234 5678',
        type: 'text',
      },
    }),

    prisma.setting.upsert({
      where: { key: 'contact_address_en' },
      update: {},
      create: {
        key: 'contact_address_en',
        value: 'Cairo, Egypt',
        type: 'text',
      },
    }),

    prisma.setting.upsert({
      where: { key: 'contact_address_ar' },
      update: {},
      create: {
        key: 'contact_address_ar',
        value: 'القاهرة، مصر',
        type: 'text',
      },
    }),

    prisma.setting.upsert({
      where: { key: 'social_links' },
      update: {},
      create: {
        key: 'social_links',
        value: JSON.stringify({
          facebook: 'https://facebook.com/infeworks',
          linkedin: 'https://linkedin.com/company/infeworks',
          instagram: 'https://instagram.com/infeworks',
        }),
        type: 'json',
      },
    }),

    prisma.setting.upsert({
      where: { key: 'stats' },
      update: {},
      create: {
        key: 'stats',
        value: JSON.stringify({
          projectsCompleted: 150,
          yearsExperience: 20,
          teamMembers: 200,
          satisfiedClients: 80,
        }),
        type: 'json',
      },
    }),
  ])

  console.log(`   ✅ Created ${settings.length} settings\n`)

  // ── Summary ───────────────────────────────────────────────────────────────

  console.log('═══════════════════════════════════════════')
  console.log('  ✨  Database seeded successfully!        ')
  console.log('═══════════════════════════════════════════')
  console.log(`  Services:     ${services.length}`)
  console.log(`  Projects:     ${projects.length}`)
  console.log(`  Testimonials: ${testimonials.length}`)
  console.log(`  Clients:      ${clients.length}`)
  console.log(`  Settings:     ${settings.length}`)
  console.log('═══════════════════════════════════════════\n')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:')
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })