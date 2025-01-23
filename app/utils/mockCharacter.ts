import { Character } from "../types";

const mockCharacter: Character = {
  name: "Kara the Chronomancer",
  background: "Time Scientist",
  year: "4068",
  attributes: {
    agility: 6,
    smarts: 10,
    spirit: 8,
    strength: 4,
    vigor: 6,
  },
  skills: {
    athletics: 6,
    commonKnowledge: 8,
    investigation: 10,
    notice: 8,
    persuasion: 6,
    shooting: 4,
    stealth: 6,
    survival: 5,
    taunt: 7,
  },
  edges: [
    {
      name: "Arcane Background (Magic)",
      description:
        "Grants access to arcane powers and the ability to cast spells.",
    },
    {
      name: "Quick",
      description: "Reduces the chance of being caught off guard in combat.",
    },
  ],
  hindrances: [
    {
      name: "Cautious",
      description: "Tends to overthink and hesitate in critical situations.",
    },
    {
      name: "Loyal",
      description: "Will go to great lengths to protect their allies.",
    },
  ],
  wounds: 1,
  fatigue: 0,
  bennies: 3,
  weapons: [
    {
      name: "Chrono Blade",
      damage: "Str+d8",
    },
    {
      name: "Time Shard Pistol",
      damage: "2d6+1",
    },
  ],
};

export default mockCharacter;
