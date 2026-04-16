/**
 * Highlights Data — NeuraX 2.0 Post-Event Section
 *
 * HOW TO ADD IMAGES:
 *   1. Drop your .jpg / .jpeg / .png / .webp files into
 *      public/neurax2/<folder>/  (e.g. public/neurax2/highlights/)
 *   2. Add an entry in the relevant `images` array below:
 *      { src: '/neurax2/highlights/my-photo.jpg', caption: 'Caption here' }
 */

// ── Animated stats shown at the top of the section ───────────────────────────
export const highlightStats = [
  { number: '300+', label: 'Participants', icon: '👥' },
  { number: '75+', label: 'Teams', icon: '🚀' },
  { number: '24', label: 'Hours', icon: '⏱️' },
  { number: '₹50K+', label: 'Prize Pool', icon: '🏆' },
];

// ── Image categories (tabs) ───────────────────────────────────────────────────
// Add your image objects to each `images` array.
// src paths are relative to the `public/` folder.
export const highlightCategories = [
  {
    id: 'highlights',
    title: 'Event Highlights',
    icon: '✨',
    description: 'Key moments from the 24-hour hackathon',
    images: [
      // Winners
      { src: '/neurax2/winners/1st_prize_FUZZ OPS.jpg', caption: '🏆 1st Prize — FUZZ OPS' },
      { src: '/neurax2/winners/2nd_prize_EVANSTARS.jpg', caption: '🥈 2nd Prize — EVANSTARS' },
      { src: '/neurax2/winners/3rd_prize_ELITE ORBIT.jpg', caption: '🥉 3rd Prize — ELITE ORBIT' },
      // Participants
      { src: '/neurax2/participants/20260314_100831.jpg', caption: 'Hard at Work' },
      { src: '/neurax2/participants/audit_04.jpg', caption: 'Innovation Hub' },
      { src: '/neurax2/participants/coding_02.jpg', caption: 'The Grind' },
      { src: '/neurax2/participants/coding_room.jpg', caption: 'Coding Session' },
      { src: '/neurax2/participants/coding_room_01.jpg', caption: 'Mid-Hack Hustle' },
      // Organizing Team
      { src: '/neurax2/organizing-team/IMG_3925.jpg', caption: 'Finale Group Shot' },
      { src: '/neurax2/organizing-team/20260314_104455.jpg', caption: 'Team Coordination' },
      { src: '/neurax2/organizing-team/20260315_121414.jpg', caption: 'Behind the Scenes' },
      { src: '/neurax2/organizing-team/20260315_121452.jpg', caption: 'Core Organizers' },
      { src: '/neurax2/organizing-team/neurax_in_02.jpg', caption: 'Org Core' },
      { src: '/neurax2/organizing-team/neurax_in_03 (2).jpg', caption: 'Mission Success' },
      { src: '/neurax2/organizing-team/IMG-20260314-WA0045.jpg', caption: 'Volunteer Team' },
      { src: '/neurax2/organizing-team/IMG-20260314-WA0047.jpg', caption: 'Team Spirit' },
      { src: '/neurax2/organizing-team/IMG-20260314-WA0049.jpg', caption: 'NeuraX Logistics' },
    ],
  },
  {
    id: 'winners',
    title: 'Winners & Awards',
    icon: '🏆',
    description: 'Celebrating the best innovations of NeuraX 2.0',
    images: [
      { src: '/neurax2/winners/1st_prize_FUZZ OPS.jpg', caption: '1st Prize — FUZZ OPS' },
      { src: '/neurax2/winners/2nd_prize_EVANSTARS.jpg', caption: '2nd Prize — EVANSTARS' },
      { src: '/neurax2/winners/3rd_prize_ELITE ORBIT.jpg', caption: '3rd Prize — ELITE ORBIT' },
    ],
  },
  {
    id: 'participants',
    title: 'Participants in Action',
    icon: '💻',
    description: 'Teams hustling through the night, building the future',
    images: [
      { src: '/neurax2/participants/20260314_100831.jpg', caption: 'Hard at Work' },
      { src: '/neurax2/participants/audit_04.jpg', caption: 'Innovation Hub' },
      { src: '/neurax2/participants/coding_02.jpg', caption: 'The Grind' },
      { src: '/neurax2/participants/coding_room.jpg', caption: 'Coding Session' },
      { src: '/neurax2/participants/coding_room_01.jpg', caption: 'Mid-Hack Hustle' },
    ],
  },
  {
    id: 'organizing-team',
    title: 'Organizing Team',
    icon: '🤝',
    description: 'The incredible team that made NeuraX 2.0 possible',
    images: [
      { src: '/neurax2/organizing-team/20260314_104455.jpg', caption: 'Team Coordination' },
      { src: '/neurax2/organizing-team/20260315_121414.jpg', caption: 'Behind the Scenes' },
      { src: '/neurax2/organizing-team/20260315_121452.jpg', caption: 'Core Organizers' },
      { src: '/neurax2/organizing-team/IMG-20260314-WA0045.jpg', caption: 'Volunteer Team' },
      { src: '/neurax2/organizing-team/IMG-20260314-WA0047.jpg', caption: 'Team Spirit' },
      { src: '/neurax2/organizing-team/IMG-20260314-WA0049.jpg', caption: 'NeuraX Logistics' },
      { src: '/neurax2/organizing-team/IMG_3925.jpg', caption: 'Finale Group Shot' },
      { src: '/neurax2/organizing-team/neurax_in_02.jpg', caption: 'Org Core' },
      { src: '/neurax2/organizing-team/neurax_in_03 (2).jpg', caption: 'Mission Success' },
    ],
  },
];

// ── Thank-you message config ──────────────────────────────────────────────────
export const thankYouConfig = {
  heading: 'Thank You for Being Part of NeuraX 2.0! 🎉',
  subheading: 'You made it unforgettable.',
  message: `NeuraX 2.0 was more than a hackathon — it was 24 hours of passion, creativity, and relentless problem-solving. To every participant who pushed their limits, every mentor who guided with wisdom, every judge who evaluated with vision, every sponsor who believed in the next generation, and every organizer who gave it their all — thank you. You are the reason NeuraX 2.0 was a night to remember. See you at NeuraX 3.0! 🚀`,
  thanks: [
    { icon: '👩‍💻', label: 'Participants', desc: 'For building boldly under pressure' },
    { icon: '🧑‍🏫', label: 'Mentors', desc: 'For guiding with expertise & patience' },
    { icon: '⚖️', label: 'Judges', desc: 'For evaluating with fairness & insight' },
    { icon: '💼', label: 'Sponsors', desc: 'For fuelling innovation with support' },
    { icon: '🛠️', label: 'Organizers', desc: 'For countless hours making it seamless' },
  ],
};

// ── Slideshow Images (Featured moments / Prizes) ──────────────────────────────
// These images will appear in the slider right after the Thank You section.
export const slideshowImages = [
  // ── Winners ──
  {
    id: 'slide-1',
    src: '/neurax2/winners/1st_prize_FUZZ OPS.jpg',
    caption: '🏆 1st Prize Winners — Team FUZZ OPS',
    category: 'Winners',
  },
  {
    id: 'slide-2',
    src: '/neurax2/winners/2nd_prize_EVANSTARS.jpg',
    caption: '🥈 2nd Prize Winners — Team EVANSTARS',
    category: 'Winners',
  },
  {
    id: 'slide-3',
    src: '/neurax2/winners/3rd_prize_ELITE ORBIT.jpg',
    caption: '🥉 3rd Prize Winners — Team ELITE ORBIT',
    category: 'Winners',
  },

  // ── Reordered Highlights ──
  {
    id: 'slide-5',
    src: '/neurax2/participants/audit_04.jpg',
    caption: ' Inauguration',
    category: '',
  },
  {
    id: 'slide-16',
    src: '/neurax2/organizing-team/IMG-20260314-WA0047.jpg',
    caption: ' Inauguration',
    category: '',
  },
  {
    id: 'slide-17',
    src: '/neurax2/organizing-team/IMG-20260314-WA0049.jpg',
    caption: ' NeuraX Event Launch',
    category: '',
  },
  {
    id: 'slide-15',
    src: '/neurax2/organizing-team/IMG-20260314-WA0045.jpg',
    caption: '',
    category: '',
  },
  {
    id: 'slide-11',
    src: '/neurax2/organizing-team/20260315_121414.jpg',
    caption: '',
    category: '',
  },
  // {
  //   id: 'slide-14',
  //   src: '/neurax2/organizing-team/neurax_in_03 (2).jpg',
  //   caption: '',
  //   category: '',
  // },
  {
    id: 'slide-13',
    src: '/neurax2/organizing-team/neurax_in_02.jpg',
    caption: '',
    category: '',
  },
  // {
  //   id: 'slide-10',
  //   src: '/neurax2/organizing-team/20260314_104455.jpg',
  //   caption: '',
  //   category: '',
  // },
  // {
  //   id: 'slide-12',
  //   src: '/neurax2/organizing-team/20260315_121452.jpg',
  //   caption: '',
  //   category: '',
  // },
  {
    id: 'slide-4',
    src: '/neurax2/participants/20260314_100831.jpg',
    caption: '',
    category: '',
  },
  {
    id: 'slide-6',
    src: '/neurax2/participants/coding_02.jpg',
    caption: '⌨️ The Grind — Late Night Coding',
    category: 'Participants',
  },
  {
    id: 'slide-7',
    src: '/neurax2/participants/coding_room.jpg',
    caption: '🖥️ Coding Session Underway',
    category: 'Participants',
  },
  {
    id: 'slide-8',
    src: '/neurax2/participants/coding_room_01.jpg',
    caption: '🚀 Mid-Hack Hustle',
    category: 'Participants',
  },
  {
    id: 'slide-9',
    src: '/neurax2/organizing-team/IMG_3925.jpg',
    caption: '✨ The NeuraX 2.0 Organizing Family',
    category: 'Team',
  },
];
