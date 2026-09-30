export type Project = {
  title: string;
  description: string;
  href?: string;
  tags: string[];
  status?: 'In progress';
};

export const projects: Project[] = [
  {
    title: 'Sharon English School — Longmai',
    description: 'A functional website built for a school.',
    href: 'https://sharon-english-school-longmai-3-non.vercel.app/',
    tags: ['School website'],
  },
  {
    title: 'Tengkonjang',
    description: 'A functional website built for a school.',
    href: 'https://tengkonjang.vercel.app/',
    tags: ['School website'],
  },
  {
    title: 'Rhema Phi',
    description: 'A functional website built for a school.',
    href: 'https://rhema-phi-rouge.vercel.app/',
    tags: ['School website'],
  },
  {
    title: 'Hoops with Karan',
    description: 'A website for a basketball coaching center.',
    href: 'https://hoops-with-karan.vercel.app/',
    tags: ['Basketball', 'Coaching'],
  },
  {
    title: 'Fuel adulteration detection device',
    description:
      'A real-world project currently in development. More details coming soon.',
    tags: ['Hardware', 'In progress'],
    status: 'In progress',
  },
];
