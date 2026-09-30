export type Project = {
  id: string;
  title: string;
  description: string;
  stack: string[];
  summary: string;
  built: string;
  outcome: string;
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    id: 'sharon-english-school',
    title: 'Sharon English School — Longmai',
    description: 'A school website for the co-educational school in Longmai Bazar.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Google Apps Script'],
    summary:
      'Sharon English School is a co-educational school in Longmai Bazar, Noney. Established in 1980, it serves students from Nursery through Grade 10.',
    built: 'A website for Sharon English School.',
    outcome: 'Published as a live website on Vercel.',
    liveUrl: 'https://sharon-english-school-longmai-3-non.vercel.app/',
  },
  {
    id: 'tengkonjang-school',
    title: 'Tengkonjang Higher Secondary School',
    description: 'A website for a government school serving Noney district.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Google Apps Script'],
    summary:
      'Tengkonjang Higher Secondary School is a government school serving Noney and nearby villages since 1969. It teaches Classes 1–12 under the Manipur State Board in English, with computer-aided learning, a library, and an on-campus mid-day meal programme.',
    built: 'A website for Tengkonjang Higher Secondary School.',
    outcome: 'Published as a live website on Vercel.',
    liveUrl: 'https://tengkonjang.vercel.app/',
  },
  {
    id: 'rhema-phi-school',
    title: 'Rhema Public School',
    description: 'A website for a co-educational school in Khumji Bazaar.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Google Apps Script'],
    summary:
      'Established in 2010, Rhema Public School is a privately built, unaided co-educational school in Khumji Bazaar, Noney district. It teaches Nursery through Class 10 and is reachable year-round by an all-weather road.',
    built: 'A website for Rhema Public School.',
    outcome: 'Published as a live website on Vercel.',
    liveUrl: 'https://rhema-phi-rouge.vercel.app/',
  },
  {
    id: 'hoops-with-karan',
    title: 'Hoops with Karan',
    description: 'A website for a local basketball coaching program in Nagaon, Guwahati.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Google Apps Script'],
    summary:
      'Hoops with Karan is a local basketball coaching program based in Nagaon, Guwahati, Assam.',
    built: 'A website for the Hoops with Karan basketball coaching program.',
    outcome: 'Published as a live website on Vercel.',
    liveUrl: 'https://hoops-with-karan.vercel.app/',
  },
  {
    id: 'fuel-adulteration-device',
    title: 'Fuel adulteration detection device',
    description: 'A real-world project currently in development.',
    stack: ['Not specified'],
    summary:
      'I am working on a real-world device to detect fuel adulteration. The project is still in progress.',
    built: 'A fuel adulteration detection device.',
    outcome: 'In progress; results will be added as the project develops.',
  },
];
