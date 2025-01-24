export interface Character {
  name: string;
  background: string;
  year: string;
  attributes: {
    agility: number;
    smarts: number;
    spirit: number;
    strength: number;
    vigor: number;
  };
  skills: Skills;
  edges: Edge[];
  hindrances: Hindrance[];
  wounds: number;
  fatigue: number;
  bennies: number;
  weapons: {
    name: string;
    damage: string;
  }[];
  items: {
    name: string;
    description: string;
  }[];
}

export type Edge = {
  name: string;
  description: string;
};

export type Hindrance = {
  name: string;
  description: string;
};

export type Weapon = {
  name: string;
  damage: string;
};

export type Skills = {
  athletics?: number;
  commonKnowledge?: number;
  driving?: number;
  fighting?: number;
  healing?: number;
  intimidation?: number;
  investigation?: number;
  notice?: number;
  persuasion?: number;
  repair?: number;
  riding?: number;
  shooting?: number;
  stealth?: number;
  streetwise?: number;
  survival?: number;
  swimming?: number;
  taunt?: number;
  throwing?: number;
  tracking?: number;
  [key: string]: number | undefined;
};
