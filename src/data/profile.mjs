// Every fact shown on the site lives here. Home and Experience both read from this file.
// Sources: approved LinkedIn text and current resumes (Oct 2026). Do not add facts that are not in them.

export const site = {
  name: 'Jose Aeduru',
  title: 'Lead Oracle Cloud HCM Consultant',
  subtitle: 'Techno-Functional SME',
  headline: ['Oracle HCM programs, from design', 'through go-live.'],
  focus: 'Redwood · Oracle AI · Integrations',
  email: 'mailmejo9@gmail.com',
  linkedin: 'https://www.linkedin.com/in/jose1038',
  location: 'Frisco, TX (open to remote)',
  availability: 'For Oracle Cloud HCM roles and projects, get in touch.',
  description:
    'Jose Aeduru is a Lead Oracle Cloud HCM (Oracle Fusion HCM) consultant in Frisco, TX. Six full-lifecycle implementations across Core HR, Recruiting, Benefits, Absence, Compensation and Learning.',
};

export const stats = [
  { value: '14+', label: 'years' },
  { value: '6', label: 'full-lifecycle implementations' },
  { value: '3', label: 'Oracle certifications' },
];

export const about = [
  'I lead Oracle Cloud HCM (Oracle Fusion HCM) programs from blank-slate design through go-live and the stabilization that follows. Six full-lifecycle implementations so far, at Deloitte and directly for enterprise clients in public transit, industrial technology and manufacturing.',
  'I usually get the call when a program has drifted, integrations keep breaking, or a go-live needs steadying. My job then is to work out what the business is really asking for, decide what to build and what to leave alone, and get HR, IT and the vendors moving in the same direction.',
];

export const led = [
  {
    title: 'Go-lives',
    text: 'Core HR and Recruiting for four business units on one platform, and a public transit go-live with no critical business disruption.',
  },
  {
    title: 'Oracle AI',
    text: 'Generative AI for job descriptions, onboarding content and performance summaries, with guardrails agreed before each phase. Now building an AI Agent Studio pilot: an employee data agent and AI candidate screening.',
  },
  {
    title: 'Integrations',
    text: 'OIC, REST, SOAP and SFTP between HCM, ERP, payroll and vendor systems, built so a failure shows up and can be traced.',
  },
  {
    title: 'Redwood and quarterly releases',
    text: 'A Responsive UI to Redwood migration with HR operations never stopping, and a release cycle where every feature is reviewed and nothing is promoted without a regression plan.',
  },
  {
    title: 'Teams',
    text: 'Onshore and offshore teams of five to ten consultants, with juniors brought up to running their own workstreams.',
  },
];

export const howIWork = [
  'Decisions get written down and tied to a sign-off, so change requests are quick to scope.',
  'I hold the release gate when the defect backlog says we are not ready.',
  'I build inside supported patterns, so the next quarterly update does not break what we delivered.',
];

export const skills = [
  {
    group: 'HCM modules',
    items: [
      'Core HR / Global HR',
      'Oracle Recruiting (ORC)',
      'Journeys',
      'Talent Management',
      'Performance',
      'Goals',
      'Succession',
      'Learning',
      'Compensation',
      'Benefits',
      'Absence Management',
      'Time and Labor',
      'Payroll',
      'Help Desk',
    ],
  },
  {
    group: 'Configuration and UX',
    items: [
      'Functional Setup Manager',
      'Enterprise and Workforce Structures',
      'Flexfields (DFF/EFF)',
      'Lookups',
      'Value Sets',
      'Redwood',
      'Page Composer',
      'Transaction Design Studio',
      'Visual Builder Studio',
      'BPM approvals',
      'Scheduled Processes',
    ],
  },
  {
    group: 'Data and integrations',
    items: [
      'HDL',
      'HSDL',
      'Spreadsheet Loader',
      'HCM Extracts',
      'Oracle Integration Cloud (OIC)',
      'REST and SOAP APIs',
      'SFTP',
      'Fast Formula',
      'SQL',
      'PL/SQL',
    ],
  },
  {
    group: 'Reporting and security',
    items: [
      'BI Publisher',
      'OTBI',
      'Security Console',
      'Job, duty, data and abstract roles',
      'Security profiles',
    ],
  },
  {
    group: 'AI and delivery',
    items: [
      'Oracle HCM Generative AI',
      'AI Agent Studio',
      'Job Application AI Overview (in validation)',
      'Quarterly update regression (26B, 26C)',
      'Agile/Scrum',
      'Fit-gap',
      'CRP',
      'SIT/UAT',
      'Hypercare',
      'Oracle SR management',
      'Oracle EBS',
      'Taleo',
      'MuleSoft',
      'Python',
    ],
  },
];

export const roles = [
  {
    id: 'pace',
    title: 'Lead Oracle Cloud HCM Consultant',
    employer: 'Pace Suburban Bus',
    industry: 'Public Transit',
    dates: 'Aug 2025 – Present',
    start: '2025-08',
    end: null,
    location: 'Remote',
    short: 'Only Oracle HCM resource on the account: production support, new build and quarterly updates at the same time.',
    summary:
      'Lead Oracle Cloud HCM (Oracle Fusion HCM) consultant for a public transit agency, covering Core HR, Recruiting (ORC), Journeys, Redwood, quarterly updates and production support.',
    bullets: [
      'Took Core HR and Recruiting live with no critical business disruption and have run post-go-live support since.',
      'Own the quarterly update cycle. Reviewed 109 features for 26B and 129 for 26C, briefed the steering committee and built the Redwood regression plan.',
      'Building an Oracle AI pilot in AI Agent Studio: a read-only employee data agent and AI candidate screening.',
      'Oracle Recruiting (ORC): designed a three-layer control for high-volume hiring to stop repeat applications inside 12 months, now with HR for testing. Reworked the application flow and routed offer approvals straight to hiring managers.',
      'Integrations: background check and payroll integrations are in progress with the integration team.',
      'Redwood: rebuilt self-service pages in Page Composer and moved onboarding to Redwood Journeys that HR maintains.',
      'Reporting and security: built BI Publisher queries to audit custom roles, inherited duties and privileges.',
      'Data: replaced one-at-a-time salary changes with a bulk HDL load. A full day of HR work now takes about 30 minutes.',
    ],
  },
  {
    id: 'fortive',
    title: 'Lead Oracle Cloud HCM Consultant',
    employer: 'Fortive',
    industry: 'Industrial Technology',
    dates: 'Jun 2024 – Jul 2025',
    start: '2024-06',
    end: '2025-07',
    location: 'Remote / Texas',
    short: 'Core HR and ORC rollout that pulled four business units onto one platform, then Redwood migration and stabilization.',
    summary:
      'Lead Oracle Cloud HCM (Oracle Fusion HCM) consultant on a Core HR and Recruiting (ORC) rollout that brought four business units onto one platform, followed by the Redwood migration and post-go-live stabilization.',
    bullets: [
      'Ran the Core HR and ORC rollout across four business units and kept HR leads, IT and business stakeholders aligned when priorities shifted mid-program.',
      'Managed a mixed onshore and offshore team: sprint planning, stand-ups, retros, and the link between offshore build capacity and onshore business owners.',
      'Redwood: led the move from Responsive UI to Redwood for Core HR and ORC, covering personalization migration, regression cycles and release readiness. HR operations never stopped.',
      'Oracle Recruiting (ORC): owned the design from requisition to the candidate-to-hire handoff, which closed off the worker record errors seen at onboarding.',
      'Visual Builder: extended the VBCS onboarding app to Redwood patterns in Visual Builder Studio, with branching rules for conditional flows.',
      'Integrations: delivered HireRight background checks (package setup, secure data exchange, live status in the recruiter view) and Gatesman candidate surveys inside ORC.',
      'Oracle AI: enabled Oracle HCM Generative AI for job descriptions, onboarding content and performance summaries, with guardrails set before each phase.',
      'Reporting: built OTBI and BI Publisher dashboards for recruiting funnel, onboarding readiness and Core HR transaction health that leadership used through hypercare.',
      'Releases and hypercare: checked every quarterly update against live configuration and worked the post-go-live backlog with Oracle Support, vendors and the internal team.',
    ],
  },
  {
    id: 'deloitte',
    title: 'Senior Oracle Cloud HCM Consultant',
    employer: 'Deloitte USI',
    industry: 'Multiple Enterprise Clients',
    dates: 'Nov 2019 – May 2024',
    start: '2019-11',
    end: '2024-05',
    location: 'Remote',
    short: 'Enterprise client work across Core HR, ORC, Payroll, Compensation, Benefits, Learning and Talent, often joining mid-program.',
    summary:
      'Senior Oracle Cloud HCM (Oracle Fusion HCM) consultant on enterprise client engagements across Core HR, Recruiting (ORC), Payroll, Compensation, Benefits, Learning and Talent Management, often joining mid-program to get delivery back on track.',
    bullets: [
      'Team leadership: led Agile teams of five to ten consultants across onshore and offshore, ran the ceremonies, split the build work and brought junior consultants up to running their own workstreams.',
      'Design: ran fit-gap sessions, solution design workshops and configuration reviews, with every decision documented and tied to a client sign-off.',
      'Core HR: built enterprise foundations in Functional Setup Manager (FSM) for multi-country clients, covering legal employers, business units, departments, jobs, positions, grades and workforce structures.',
      'Oracle Recruiting (ORC): owned the lifecycle from requisition to candidate-to-hire, so downstream Core HR records came out clean.',
      'Talent and Learning: implemented Oracle Learning with learning paths and compliance training, and set up Succession Planning, Talent Review and career development against the talent model of each client.',
      'Compensation: set up salary basis, salary components and eligibility rules so compensation cycles ran the same way across business units.',
      'Integrations: delivered Oracle Integration Cloud (OIC) integrations over REST, SOAP and SFTP between HCM, ERP and vendor systems, cutting manual payroll reconciliation each cycle.',
      'Go-live: managed SIT, UAT, go-live and hypercare, triaged defects with business owners and held the release gate when the backlog got heavy.',
      'Documentation: wrote FDDs, configuration workbooks, mapping documents and test evidence packs.',
    ],
  },
  {
    id: 'tcs',
    title: 'Oracle Cloud HCM Consultant',
    employer: 'Tata Consultancy Services',
    industry: 'Global Manufacturing Client',
    dates: 'Sep 2016 – Nov 2019',
    start: '2016-09',
    end: '2019-11',
    location: 'Hyderabad, India',
    short: 'Core delivery role on a large multi-country Cloud HCM implementation across several release cycles.',
    summary:
      'Oracle Cloud HCM (Oracle Fusion HCM) consultant in a core delivery role on a large multi-country implementation for a global manufacturing client, carrying functional and technical work across several release cycles.',
    bullets: [
      'Configuration: delivered Core HR, Talent Management, Compensation, Absence Management and Payroll against multi-country requirements and years of legacy history.',
      'Data migration: drove HCM Data Loader (HDL) migration end to end, from .dat files and validation through exception reports and reconciliation before every cutover.',
      'Integrations: configured Oracle Integration Cloud (OIC) integrations to third-party applications and rewrote error handling that had been hiding failures.',
      'Security: built role-based security with segregation of duties. The client passed its first audit with no access remediation.',
      'Approvals and extensions: designed BPM approval hierarchies for Core HR, Talent and Compensation, and DFF/EFF configurations inside supported extension patterns.',
      'Self-service: configured employee and manager self-service, HCM Mobile and responsive UI through Page Composer.',
      'Reporting: produced OTBI analyses and BI Publisher reports on date-effective data models, scheduled as Excel, CSV and PDF.',
      'Testing and support: handled SIT and UAT, worked Oracle SRs to closure and wrote post-go-live training against the real configuration of the client.',
    ],
  },
  {
    id: 'satva',
    title: 'Senior Oracle Cloud HCM Techno-Functional Analyst',
    employer: 'Satva Solutions',
    industry: 'Multiple Global Clients',
    dates: 'Jun 2015 – Sep 2016',
    start: '2015-06',
    end: '2016-09',
    location: 'Pune, India',
    short: 'Functional and technical both, on full-lifecycle implementations across Core HR, Payroll, Absence, Benefits and Talent.',
    summary:
      'Senior techno-functional analyst on Oracle Fusion HCM Cloud implementations for global clients, covering both the functional and the technical work.',
    bullets: [
      'Implementations: delivered full-lifecycle implementations across Core HR, Payroll, Time and Labor, Absence Management, Benefits, Compensation, Talent and Recruiting (Taleo).',
      'Fast Formula: wrote formulas for Absence accruals, Payroll eligibility, Benefits rules and Compensation logic, and retired custom formulas wherever Oracle had since delivered the same thing.',
      'Integrations: built Integration Cloud Service (ICS) integrations on REST, SOAP, file adapters and SFTP, with error handling solid enough that operations were not watching the batch runs.',
      'Data migration: migrated Taleo talent data to HCM Cloud using TCC scripts, BI reports and HCM Data Loader (HDL), after cleaning up the source data.',
      'Security: implemented job, data, duty and abstract roles with segregation of duties that held up under audit review.',
      'Extensions: built custom self-service extensions for cases the standard pages did not cover, inside supported patterns so upgrades stayed safe.',
      'Mentoring: mentored junior consultants and wrote the technical documentation, training guides and knowledge-transfer material.',
    ],
  },
  {
    id: 'growel',
    title: 'Oracle HCM Business Analyst',
    employer: 'Growel Softech',
    industry: 'EBS-to-Cloud Migration Programs',
    dates: 'Apr 2012 – Jun 2015',
    start: '2012-04',
    end: '2015-06',
    location: 'Pune, India',
    short: 'Started here on Oracle EBS to Cloud HCM migrations: requirements, configuration, conversion, reporting, testing and support.',
    summary:
      'Oracle HCM business analyst on Oracle E-Business Suite (EBS) to Oracle Fusion HCM Cloud migrations, working across requirements, data conversion, reporting, testing and post-go-live support.',
    bullets: [
      'Requirements and testing: gathered requirements, mapped HR processes and ran SIT and UAT across Core HR, Payroll, Absence Management, Benefits, Talent and Compensation.',
      'Data conversion: handled legacy mapping, validation and reconciliation across multiple load cycles after clearing years of data-quality problems.',
      'Reporting: built OTBI and BI Publisher reports in SQL and PL/SQL across every major module, including date-effective data models delivered by email and FTP. They retired manual spreadsheets HR had kept for years.',
      'Fast Formula: wrote formulas for Benefits eligibility, Payroll processing and Absence accruals, translating policy documents into logic and testing the edge cases before sign-off.',
      'Security: designed data roles, job roles, duty roles and security profiles, with the most attention on payroll access.',
      'Support: first line of support after go-live for Absence, Benefits and Core HR.',
    ],
  },
];

export const certifications = [
  'Oracle Global Human Resources Cloud Implementation Professional',
  'Oracle Talent Management Cloud Implementation Professional',
  'Oracle Benefits Cloud Implementation Professional',
];

export const education = 'Bachelor of Technology (B.Tech), Jawaharlal Nehru Technological University (JNTUH), India';

// Home page case studies. Every figure is from the resume, and every line under
// "details" is one of the bullets already listed for that role above.
const bullet = (roleId, start) => {
  const found = roles.find((role) => role.id === roleId).bullets.find((b) => b.startsWith(start));
  if (!found) throw new Error(`No ${roleId} bullet starts with "${start}"`);
  return found;
};

export const selectedWork = [
  {
    id: 'fortive-rollout',
    role: 'fortive',
    area: 'Program delivery',
    kicker: 'Fortive / Core HR and ORC rollout',
    title: ['Four business units.', 'One Oracle HCM platform.'],
    summary:
      'Ran the Core HR and ORC rollout across four business units, then led the move from Responsive UI to Redwood for both modules.',
    stat: { value: '4', label: 'Business units on one platform', note: 'HR operations never stopped during the Redwood migration.' },
    details: [
      bullet('fortive', 'Managed a mixed onshore'),
      bullet('fortive', 'Oracle Recruiting (ORC): owned the design'),
      bullet('fortive', 'Integrations: delivered HireRight'),
    ],
  },
  {
    id: 'pace-bulk-load',
    role: 'pace',
    area: 'HR operations',
    kicker: 'Pace Suburban Bus / Bulk data',
    title: ['A day of salary updates.', 'About 30 minutes with HDL.'],
    summary: 'Replaced one-at-a-time salary changes with a bulk HDL load, for work HR had been doing by hand.',
    stat: { value: '30', unit: 'min', label: 'Approximate processing time', note: 'Previously a full working day.' },
    details: [
      bullet('pace', 'Took Core HR and Recruiting live'),
      bullet('pace', 'Redwood: rebuilt self-service pages'),
    ],
  },
  {
    id: 'pace-quarterly-updates',
    role: 'pace',
    area: 'Release management',
    kicker: 'Pace Suburban Bus / Quarterly updates',
    title: ['Every feature reviewed', 'before it reaches users.'],
    summary:
      'Own the quarterly update cycle: every feature reviewed, the steering committee briefed, and a Redwood regression plan in place.',
    stat: { value: '129', label: 'Features analyzed for 26C', note: 'Plus 109 reviewed for 26B.' },
    details: [
      bullet('pace', 'Own the quarterly update cycle'),
      bullet('pace', 'Building an Oracle AI pilot'),
    ],
  },
  {
    id: 'tcs-security-audit',
    role: 'tcs',
    area: 'Security and audit',
    kicker: 'Tata Consultancy Services / Global manufacturing client',
    title: ['Security that passed', 'its first audit.'],
    summary: 'Built role-based security with segregation of duties on a large multi-country implementation.',
    stat: { value: '1st', label: 'Audit passed', note: 'With no access remediation.' },
    details: [
      bullet('tcs', 'Data migration: drove HCM Data Loader'),
      bullet('tcs', 'Integrations: configured Oracle Integration Cloud'),
    ],
  },
];
