export interface Edge {
  name: string;
  description: string;
}

export interface Hindrance {
  name: string;
  description: string;
}

export interface Weapon {
  name: string;
  damage: string;
  notes?: string;
}

export interface Skills {
  [key: string]: string;
}

export interface Attributes {
  agility: string;
  smarts: string;
  spirit: string;
  strength: string;
  vigor: string;
}

export interface Character {
  name: string;
  background: string;
  year: string;
  attributes: Attributes;
  skills: Skills;
  edges: Edge[];
  hindrances: Hindrance[];
  wounds: number;
  fatigue: number;
  bennies: number;
  weapons: Weapon[];
  items: string[];
  notes: string;
  parry: number;
  toughness: number;
  attribute_skill_links: Record<string, string[]>;
  userId?: string;
  createdAt?: string;
}