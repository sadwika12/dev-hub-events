export interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
  url: string;
  time:string;
}

export const events: EventItem[] = [
  {
    id: 'react-europe-2026',
    title: 'React Europe 2026',
    description: 'Europe\'s flagship React conference with deep dives, networking, and workshops.',
    date: '2026-05-20',
    location: 'Paris, France',
    image: '/images/event1.png',
    url: 'https://www.reacteurope.org/',
    time: '10:00 AM - 6:00 PM CEST',
  },
  {
    id: 'jsworldconf-2026',
    title: 'JS World Conference 2026',
    description: 'JavaScript community conference focused on modern web tooling, frameworks and best practices.',
    date: '2026-06-12',
    location: 'Berlin, Germany',
    image: '/images/event2.png',
    url: 'https://jsworldconference.com/',
    time:'9:00 AM - 5:00 PM CEST',
  },
  {
    id: 'google-io-2026',
    title: 'Google I/O 2026',
    description: 'Google\'s annual developer conference with Android, Chrome, Cloud and AI announcements.',
    date: '2026-05-14',
    location: 'Mountain View, CA, USA (hybrid)',
    image: '/images/event3.png',
    url: 'https://io.google/',
    time:'10:00 AM - 6:00 PM PDT',
  },
  {
    id: 'hacktoberfest-2026',
    title: 'Hacktoberfest 2026',
    description: 'Open-source celebration with coding sprints, contributions, and community prizes.',
    date: '2026-10-01',
    location: 'Online',
    image: '/images/event4.png',
    url: 'https://hacktoberfest.com/',
    time:'9:00 AM -11:59 PM UTC',
  },
  {
    id: 'kubecon-cloudnative-2026',
    title: 'KubeCon + CloudNativeCon 2026',
    description: 'Cloud native infrastructure and Kubernetes developers conference with keynotes and real-world case studies.',
    date: '2026-11-03',
    location: 'San Diego, CA, USA',
    image: '/images/event5.png',
    url: 'https://events.linuxfoundation.org/kubecon-cloudnativecon-north-america/',
    time:'9:00 AM - 5:00 PM PST',
  },
  {
    id: 'jsworldconf-2026-2',
    title: 'JS World Conference 2026',
    description: 'JavaScript community conference focused on modern web tooling, frameworks and best practices.',
    date: '2026-06-12',
    location: 'Berlin, Germany',
    image: '/images/event2.png',
    url: 'https://jsworldconference.com/',
    time:'9:00 AM - 5:00 PM CEST',
  },
];
