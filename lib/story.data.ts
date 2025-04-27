import { getImage } from "@/constants/image";

export interface Story {
  id: string;
  title: string;
  language: string;
  duration: number; // in seconds
  image:any;
  totalPlayCount: number;
  storyText: string;
  audioFile: string;
}

export const dummyStories: Story[] = [
  {
    id: "story_001",
    title: "The Magic Forest",
    language: "English",
    duration: 180,
    image:getImage.s1,
    totalPlayCount: 1250,
    storyText: "Deep in the enchanted forest, where the trees whispered ancient secrets...",
    audioFile: "magic-forest.mp3"
  },
  {
    id: "story_002",
    title: "Le Petit Chat",
    language: "French",
    duration: 240,
    image:getImage.s2,

    totalPlayCount: 850,
    storyText: "Dans une petite ville française, il y avait un chat très spécial...",
    audioFile: "petit-chat.mp3"
  },
  {
    id: "story_003",
    title: "Der Sternensammler",
    language: "German",
    duration: 300,
    image:getImage.s1,
    totalPlayCount: 720,
    storyText: "Es war einmal ein kleiner Junge, der die Sterne sammelte...",
    audioFile: "sternensammler.mp3"
  },
  {
    id: "story_004",
    title: "The Brave Little Boat",
    language: "English",
    duration: 210,
    image:getImage.s1,
    totalPlayCount: 2100,
    storyText: "On a stormy night, a tiny wooden boat faced the biggest wave...",
    audioFile: "brave-boat.mp3"
  },
  {
    id: "story_005",
    title: "El Dragon Dormido",
    language: "Spanish",
    duration: 270,
    image:getImage.s2,
    totalPlayCount: 1580,
    storyText: "En lo alto de la montaña vivía un dragón que solo quería dormir...",
    audioFile: "dragon-dormido.mp3"
  },
  {
    id: "story_006",
    title: "The Time Machine",
    language: "English",
    duration: 360,
    image:getImage.s1,

    totalPlayCount: 3200,
    storyText: "Professor Jenkins had finally done it - he built a working time machine...",
    audioFile: "time-machine.mp3"
  },
  {
    id: "story_007",
    title: "Il Giardino Segreto",
    language: "Italian",
    duration: 240,
    image:getImage.s1,

    totalPlayCount: 920,
    storyText: "In un angolo nascosto della città, c'era un giardino magico...",
    audioFile: "giardino-segreto.mp3"
  },
  {
    id: "story_008",
    title: "The Last Unicorn",
    language: "English",
    duration: 420,
    image:getImage.s1,

    totalPlayCount: 4500,
    storyText: "In a world where magic was fading, one unicorn remained...",
    audioFile: "last-unicorn.mp3"
  },
  {
    id: "story_009",
    title: "空の冒険",
    language: "Japanese",
    duration: 280,
    image:getImage.s2,

    totalPlayCount: 1750,
    storyText: "雲の上で、小さな鳥が大きな夢を見ていました...",
    audioFile: "sora-bouken.mp3"
  },
  {
    id: "story_010",
    title: "The Midnight Library",
    language: "English",
    duration: 330,
    image:getImage.s2,

    totalPlayCount: 2800,
    storyText: "At exactly midnight, the library doors would open to another dimension...",
    audioFile: "midnight-library.mp3"
  }
];
