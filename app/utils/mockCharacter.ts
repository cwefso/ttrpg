import { Character } from "../types";

export const jackCharacter: Character = {
  name: "",
  background: "Warrior of a post-apocalyptic tribe.",
  year: "2500 (approximate)",
  attributes: {
    agility: 6,
    smarts: 4,
    spirit: 6,
    strength: 8,
    vigor: 8,
  },
  skills: {
    fighting: 8,
    survival: 8,
    notice: 6,
    athletics: 6,
    intimidation: 6,
  },
  edges: [
    {
      name: "Brawny",
      description: "+1 Toughness and increased carrying capacity.",
    },
    {
      name: "Woodsman",
      description: "+2 to Survival rolls in natural environments.",
    },
  ],
  hindrances: [
    {
      name: "Outsider",
      description: "Viewed with suspicion by those unfamiliar with his tribe.",
    },
    {
      name: "Clueless",
      description:
        "Limited understanding of pre-apocalypse technology and concepts.",
    },
  ],
  wounds: 0,
  fatigue: 0,
  bennies: 3,
  weapons: [
    {
      name: "Stone-tipped Spear",
      damage: "Str+d6",
    },
  ],
  items: [],
};

export const mikeCharacter: Character = {
  name: "",
  background: "Ambitious drama student dreaming of Broadway.",
  year: "1997",
  attributes: {
    agility: 6,
    smarts: 8,
    spirit: 8,
    strength: 4,
    vigor: 6,
  },
  skills: {
    persuasion: 8,
    performance: 10,
    notice: 6,
    knowledge: 6, // Pop Culture
    stealth: 6,
  },
  edges: [
    {
      name: "Charismatic",
      description: "+2 to Persuasion and Performance rolls.",
    },
    {
      name: "Luck",
      description: "Gain one free Benny per session.",
    },
  ],
  hindrances: [
    {
      name: "Curious",
      description: "Constantly wants to learn more and explore.",
    },
    {
      name: "Pacifist",
      description: "Avoids violence unless absolutely necessary.",
    },
  ],
  wounds: 0,
  fatigue: 0,
  bennies: 4,
  weapons: [
    {
      name: "Prop Dagger",
      damage: "Str",
    },
  ],
  items: [],
};

export const peggyCharacter: Character = {
  name: "",
  background: "Dedicated healer and spiritual guide at a leper colony.",
  year: "1890s",
  attributes: {
    agility: 4,
    smarts: 6,
    spirit: 8,
    strength: 6,
    vigor: 4,
  },
  skills: {
    healing: 6,
    faith: 8,
    notice: 6,
    survival: 6,
    stealth: 4,
  },
  edges: [
    {
      name: "Healer",
      description: "+2 to Healing rolls.",
    },
    {
      name: "Loyal",
      description: "Gains a Benny when protecting or aiding allies.",
    },
  ],
  hindrances: [
    {
      name: "Lame",
      description:
        "Reduced Pace (4) and -2 on running rolls due to physical ailments.",
    },
    {
      name: "Vow",
      description: "Dedicated to helping others, inspired by his faith.",
    },
  ],
  wounds: 0,
  fatigue: 0,
  bennies: 3,
  weapons: [
    {
      name: "Wooden Staff",
      damage: "Str+d4",
    },
  ],
  items: [],
};

export const kristenCharacter: Character = {
  name: "Lotte St. John",
  background:
    "A rising star in London's fashion scene, navigating the glamorous yet cutthroat world of 1960s modeling.",
  year: "1967",
  attributes: {
    agility: 6,
    smarts: 6,
    spirit: 8,
    strength: 4,
    vigor: 6,
  },
  skills: {
    persuasion: 8,
    notice: 6,
    performance: 10, // Modeling
    knowledge: 6, // Fashion
    stealth: 6,
  },
  edges: [
    {
      name: "Attractive",
      description: "+2 Charisma.",
    },
    {
      name: "Connections",
      description:
        "Has access to high society and influential individuals in the fashion industry.",
    },
  ],
  hindrances: [
    {
      name: "Arrogant",
      description: "Believes she’s the most important person in any room.",
    },
    {
      name: "Habit",
      description:
        "Spends excessively on luxury items, often leaving her strapped for cash.",
    },
  ],
  wounds: 0,
  fatigue: 0,
  bennies: 3,
  weapons: [
    {
      name: "Pepper Spray",
      damage: "Special: Causes blindness/distraction.",
    },
  ],
  items: [],
};
