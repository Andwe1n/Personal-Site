/** Portfolio content supplied by Mihnea-Andrei Cristache. */

export const profile = {
  name: 'Mihnea-Andrei Cristache',
  initials: 'MC',
  brand: 'Andwe1n',
  isPreview: false,
  previewLabel: '',
  title: 'Robotics, mechanical design & creative work.',
  tagline: 'From a first sketch to a tested mechanism.',
  shortBio: 'Hi, I’m Mihnea-Andrei Cristache (Andwe1n online). I design robot mechanisms, build in 3D and write code. I helped FTC team Undefined #19112 win the 2026 European Championship. Photo and video editing is my second passion.',
  bio: [
    'It started in high school with curiosity about how programs, websites and apps work. I began building projects—many of them public on GitHub—and that curiosity led me to robotics. In February 2025 I joined the hardware team of FTC team Undefined #19112. I design mechanisms in Fusion 360, prototype them through 3D printing, test what works, fix what fails and document the process. In 2026, our team won the FTC European Championship.',
    'Alongside robotics, I led web administration for the Nexus Science Club at Nicolae Grigorescu National College, maintaining the club website and solving practical problems at events. Through Nexus and Undefined I help young people get into science, pass on what mentors taught me, and organize robotics activities for the local community. Our team earned second place in the European Championship Connect Award for outreach and community engagement.',
    'I’m charismatic, understanding and balanced. I adapt quickly, take the work seriously and try to make a positive contribution to the team. I enjoy swimming, cars—which I have loved since childhood—and photography at car events. I speak Romanian natively and English at C2 level for listening and reading, and B2 for speaking and writing.',
  ],
  mission: 'My goal is a career in mechanics: I want to join UPB Drive, Politehnica București’s Formula Student team, and one day pursue an internship with a Formula 1 team.',
  location: 'Romania',
  email: '',
  phone: '',
  resumeUrl: '',
  availability: 'Open to engineering opportunities and thoughtful collaborations.',
  recruiterIntro: 'FTC European Championship winner with hands-on experience taking mechanisms from CAD through 3D printing and testing. I care about quality, learn quickly, and enjoy working with people.',
};

export const highlights = [
  { mark: '🏆', title: 'FTC European Champion', detail: '2026 · Team Undefined #19112' },
  { mark: '🥈', title: 'CAD & Craft · 2nd place', detail: 'High School category · Politehnica București' },
  { mark: '💡', title: 'Innovate Award winner', detail: 'FTC Romania South-East League' },
  { mark: '🤝', title: 'Connect Award · 2nd place', detail: 'FTC European Championship' },
];

export const navigation = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About me' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Expertise' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
  { id: 'other', label: 'Visual studio' },
];

export const projects = [
  {
    id: '01', slug: 'undefined', title: 'FTC · Undefined #19112', category: 'Robotics',
    summary: 'Competition robot mechanisms designed, printed, tested and refined with a hardware team. European Championship winners in 2026.',
    role: 'Hardware team member · mechanism design, prototyping and iteration',
    status: 'FTC DECODE 2025–2026 · FTC BIOBUZZ 2026–2027',
    tags: ['Fusion 360', '3D printing', 'FTC', 'Testing & iteration'],
    challenge: 'Build reliable mechanisms that score consistently under the time, space and match constraints of FTC. Each design had to fit the robot, work with the rest of the system and hold up through repeated testing.',
    contribution: 'For DECODE, I designed and optimized the intake, transfer system, sorting system and turret in Fusion 360. I 3D-printed custom parts, tested and troubleshot mechanisms to improve reliability and cycle time, and worked with software teammates on Panels telemetry and PedroPathing path following. For BIOBUZZ, I am redesigning the turret with new bearings, a rear ramp and adjustable launch angle; I also fixed a pollen-feeding issue by repositioning a wheel.',
    learning: 'I learned to take an idea from CAD to a competition-proven robot, improve it after every test and build on a proven design instead of starting over. Team results include the 2026 FTC European Championship title, the South-East League Innovate Award and second place in the European Championship Connect Award.',
    repoUrl: '', liveUrl: '',
  },
  {
    id: '02', slug: 'nexus', title: 'Nexus Science Club', category: 'Community & web',
    summary: 'Web administration, event support and science outreach for the Nexus Science Club at Nicolae Grigorescu National College.',
    role: 'Head of web administration · event volunteer and mentor',
    status: 'Ongoing community work',
    tags: ['Website maintenance', 'Event support', 'Mentoring', 'Outreach'],
    challenge: 'Help a student science club keep its website useful while supporting events where young people can explore science and technology hands-on.',
    contribution: 'I maintained the Nexus Science Club website, solved practical technical problems at events and helped organize community activities. Event projects included mechanical screening forms, a line-following robot track and a Theo Jansen walker concept for a children’s robotics event. I also designed NEXUS club t-shirts and built a Photoshop batch-automation workflow for the design series.',
    learning: 'Good outreach takes both preparation and flexibility. I enjoy helping younger students get excited about science and sharing what my own mentors taught me.',
    repoUrl: '', liveUrl: '',
  },
  {
    id: '03', slug: 'quickstart', title: 'defined-quickstart', category: 'Open source',
    summary: 'An action-based command system library released by our FTC team, with a documentation website built using Astro and Svelte 5.',
    role: 'Team contributor · web development and robotics tooling',
    status: 'Open-source team project',
    tags: ['Astro', 'Svelte 5', 'Java', 'Robotics'],
    challenge: 'Make a reusable action-based command system easier for our team to use and understand across robot software projects.',
    contribution: 'I contributed to the team’s software ecosystem and built a website for the library using Astro and Svelte 5. The wider robot software workflow includes Gradle, PedroPathing and Panels.',
    learning: 'Open-source tools are stronger when the code and the documentation work together. Building for teammates also taught me to think about clarity and maintenance, not only implementation.',
    repoUrl: '', liveUrl: '',
  },
  {
    id: '04', slug: 'websites', title: 'Websites & experiments', category: 'Development',
    summary: 'Maintaining the Nexus Science Club site, upgrading team-undefined.ro, and building projects that began with curiosity about how software works.',
    role: 'Web administrator and developer',
    status: 'Ongoing projects',
    tags: ['Astro 7', 'Svelte 5', 'Tailwind v4', 'GitHub'],
    challenge: 'Keep real club and team websites useful, current and straightforward to maintain while continuing to learn modern web tools.',
    contribution: 'I maintain the Nexus Science Club website and am upgrading team-undefined.ro to Astro 7, Svelte 5 and Tailwind v4. Earlier projects include a C++ Fractal Explorer using SFML, plus school database projects: an electronics and robotics parts store in Microsoft Access and a hotel management system in Visual FoxPro.',
    learning: 'Working on sites people rely on makes software feel practical: small issues matter, and a good solution should be understandable to the next person.',
    repoUrl: '', liveUrl: '',
  },
  {
    id: '05', slug: 'creative-work', title: 'Photo & video', category: 'Visual studio',
    summary: 'Car-event photography, recruitment video editing and visual content shaped with careful pacing, color and detail.',
    role: 'Photographer and editor',
    status: 'Selected visual work',
    tags: ['DaVinci Resolve', 'Photoshop', 'Photography', 'Color grading'],
    challenge: 'Turn photos and raw footage into polished, clear content for teams, clubs, events and car enthusiasts.',
    contribution: 'I planned and edited a recruitment video for team Undefined in DaVinci Resolve. My edits use clear structure, considered transitions, color grading—including a vintage look—titles such as typewriter text, and music replacement that preserves the original cuts. In Photoshop I retouch images and automate batch workflows; I also prepare exports for Instagram Reels and other social platforms.',
    learning: 'Photo and video editing is my second passion. Perfectionism shows up in the finishing details, while photography at car events gives me a reason to keep looking closely.',
    repoUrl: '', liveUrl: '',
  },
  {
    id: '06', slug: 'haven', title: 'Hack Club Haven', category: 'Workshops',
    summary: 'Organizing beginner-friendly Godot game-making workshops in Câmpina and preparing a tutorial for participants.',
    role: 'Workshop organizer and mentor',
    status: 'In preparation',
    tags: ['Godot', 'Teaching', 'Community'],
    challenge: 'Make game-making approachable for people who are new to programming and creative technology.',
    contribution: 'I am organizing Godot workshops for Hack Club Haven in Câmpina and preparing a practical tutorial to help participants get started.',
    learning: 'Teaching is another way to learn: explaining a tool clearly helps me understand it more deeply and gives others a confident first step.',
    repoUrl: '', liveUrl: '',
  },
];

export const skillGroups = [
  {
    title: 'Mechanical & robotics',
    intro: 'Competition mechanisms developed through CAD, fabrication, testing and iteration.',
    items: ['Intakes & transfer systems', 'Sorting systems & turrets', 'Flywheel launchers', 'Drivetrains & gear transmissions', 'Reliability & cycle-time testing', 'Engineering documentation'],
  },
  {
    title: 'CAD, fabrication & 3D',
    intro: 'Turning a mechanism idea into a part that can be built, tested and improved.',
    items: ['Fusion 360 assemblies & parametric sketches', 'Blender Cycles rendering', 'Studio lighting', 'CraftBot Flow IDEX & Sidewinder X2', 'Cura & OrcaSlicer', 'Marlin firmware & G-code recovery'],
  },
  {
    title: 'Software & systems',
    intro: 'Programming and web tools used in team projects, personal builds and practical setup.',
    items: ['Java, Python & C++ · growing in Java OOP', 'Astro, Svelte 5 & Tailwind v4', 'Gradle, PedroPathing & Panels', 'Git, GitHub & GitLab', 'Windows, Linux Mint & Docker · revived an HP laptop', 'Godot · AWS/Azure basics · AI/ML fundamentals'],
  },
  {
    title: 'Creative & people skills',
    intro: 'Visual craft and communication that help a project—and the people in it—move forward.',
    items: ['DaVinci Resolve & Photoshop', 'Photo and video editing', 'Teamwork across hardware, software & electrical', 'Event organization', 'Teaching & mentoring', 'Romanian native · English C2/B2'],
  },
];

export const services = [
  {
    title: 'Mechanical design & prototyping',
    description: 'My experience spans mechanism concepts, Fusion 360 and physical prototypes. I understand the path from an idea through 3D printing, testing and iteration.',
    deliverables: ['Fusion 360 parts and assemblies', '3D-printed prototypes and custom parts', 'Testing, troubleshooting and refinement'],
  },
  {
    title: 'Robotics & technical collaboration',
    description: 'My robotics and maker experience includes team projects, practical technical problem solving and beginner-friendly workshops.',
    deliverables: ['FTC mechanism design and iteration', '3D printer setup and firmware help', 'Beginner-friendly robotics workshops'],
  },
  {
    title: 'Web, photo & video',
    description: 'I work on modern websites for teams and clubs, alongside visual content for projects, events and automotive subjects.',
    deliverables: ['Web development with Astro and Svelte', 'Photo retouching and batch workflows', 'Promotional video and social-ready edits'],
  },
];

export const socialLinks = [
  { id: 'github', label: 'GitHub', caption: 'Code, repositories & experiments', href: '' },
  { id: 'linkedin', label: 'LinkedIn', caption: 'Professional background & opportunities', href: '' },
  { id: 'instagram', label: 'Instagram', caption: 'Photography & the creative side', href: '' },
  { id: 'gmail', label: 'Email', caption: 'Projects, questions & a first hello', href: '' },
  { id: 'whatsapp', label: 'WhatsApp', caption: 'A direct way to start a conversation', href: '' },
];

export const principles = [
  { title: 'Take it from idea to test', description: 'I enjoy the whole chain: understand the problem, design a solution, build it, find what fails and improve it.' },
  { title: 'Care about the details', description: 'Quality comes from paying attention to fit, reliability, documentation and the finishing touches.' },
  { title: 'Be good to work with', description: 'I adapt quickly, communicate clearly in Romanian and English, and treat teammates with understanding and respect.' },
];
