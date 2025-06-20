import { useRef, useState } from "react";
import { useUser } from '@clerk/clerk-react';
import { edgesOptions } from "../utils/edges";
import { hindrancesOptions } from "../utils/hindrances";
import { Edge, Hindrance } from "../types";
import { skillsOptions } from "../utils/skills";
import { useNavigate } from "react-router-dom";

interface NewCharacterFormProps {
  updateCharacter: (character: any) => void;
}

export default function NewCharacterForm({ updateCharacter }: NewCharacterFormProps) {
  const { user } = useUser();
  const nameRef = useRef<HTMLInputElement>(null);
  const backgroundRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);
  const parryRef = useRef<HTMLInputElement>(null);
  const toughnessRef = useRef<HTMLInputElement>(null);
  const [edge1, setEdge1] = useState<Edge | null>(null);
  const [edge2, setEdge2] = useState<Edge | null>(null);
  const [hindrance1, setHindrance1] = useState<Hindrance | null>(null);
  const [hindrance2, setHindrance2] = useState<Hindrance | null>(null);

  const [edges, setEdges] = useState<Edge[]>([]);
  const [hindrances, setHindrances] = useState<Hindrance[]>([]);
  const navigate = useNavigate();

  // Keep attributes as numbers for internal calculations
  const [attributes, setAttributes] = useState({
    agility: 4,
    smarts: 4,
    spirit: 4,
    strength: 4,
    vigor: 4,
  });

  const [remainingSkillPoints, setRemainingSkillPoints] = useState(15);

  // Keep skills as numbers for internal calculations
  const [skills, setSkills] = useState<Record<string, number>>(
    skillsOptions.reduce((acc, skill) => {
      acc[skill.name.toLowerCase().replace(' ', '')] = 4;
      return acc;
    }, {} as Record<string, number>)
  );

  const handleSkillChange = (skillName: string, newValue: number) => {
    const linkedAttribute = skillsOptions.find(
      (skill) => skill.name.toLowerCase().replace(' ', '') === skillName
    )?.linkedAttribute;

    const currentSkillValue = skills[skillName];
    const attributeValue = attributes[linkedAttribute as keyof typeof attributes];

    const costToIncrease =
      newValue <= attributeValue
        ? newValue - currentSkillValue
        : 2 * (newValue - attributeValue) + (attributeValue - currentSkillValue);

    const costToDecrease =
      currentSkillValue <= attributeValue
        ? currentSkillValue - newValue
        : 2 * (currentSkillValue - attributeValue) + (attributeValue - newValue);

    const cost = newValue > currentSkillValue ? costToIncrease : -costToDecrease;

    if (remainingSkillPoints - cost >= 0) {
      setSkills((prevSkills) => ({
        ...prevSkills,
        [skillName]: newValue,
      }));
      setRemainingSkillPoints((prevPoints) => prevPoints - cost);
    }
  };

  const handleAttributeChange = (attr: string, value: number) => {
    setAttributes((prev) => ({
      ...prev,
      [attr]: value,
    }));
  };

  const handleEdge1Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedEdge = edgesOptions.find((edge) => edge.name === e.target.value);
    setEdge1(selectedEdge || null);
    if (selectedEdge) {
      setEdges([selectedEdge, ...(edge2 ? [edge2] : [])]);
      setEdge2(null);
    }
  };

  const handleEdge2Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedEdge = edgesOptions.find((edge) => edge.name === e.target.value);
    setEdge2(selectedEdge || null);
    if (selectedEdge) {
      setEdges([...(edge1 ? [edge1] : []), selectedEdge]);
    }
  };

  const handleHindrance1Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedHindrance = hindrancesOptions.find(
      (hindrance) => hindrance.name === e.target.value
    );
    setHindrance1(selectedHindrance || null);
    if (selectedHindrance) {
      setHindrances([selectedHindrance, ...(hindrance2 ? [hindrance2] : [])]);
      setHindrance2(null);
    }
  };

  const handleHindrance2Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedHindrance = hindrancesOptions.find(
      (hindrance) => hindrance.name === e.target.value
    );
    setHindrance2(selectedHindrance || null);
    if (selectedHindrance) {
      setHindrances([...(hindrance1 ? [hindrance1] : []), selectedHindrance]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Convert attributes from numbers to "dX" format
    const formattedAttributes = {
      agility: `d${attributes.agility}`,
      smarts: `d${attributes.smarts}`,
      spirit: `d${attributes.spirit}`,
      strength: `d${attributes.strength}`,
      vigor: `d${attributes.vigor}`,
    };

    // Convert skills from numbers to "Attribute dX" format
    const formattedSkills: Record<string, string> = {};
    Object.entries(skills).forEach(([skillKey, value]) => {
      const skillOption = skillsOptions.find(
        (skill) => skill.name.toLowerCase().replace(' ', '') === skillKey
      );
      if (skillOption) {
        const attributeName = skillOption.linkedAttribute.charAt(0).toUpperCase() + 
                             skillOption.linkedAttribute.slice(1);
        formattedSkills[skillOption.name] = `${attributeName} d${value}`;
      }
    });

    // Generate attribute_skill_links
    const attributeSkillLinks: Record<string, string[]> = {};
    skillsOptions.forEach((skill) => {
      const attributeName = skill.linkedAttribute.charAt(0).toUpperCase() + 
                           skill.linkedAttribute.slice(1);
      if (!attributeSkillLinks[attributeName]) {
        attributeSkillLinks[attributeName] = [];
      }
      attributeSkillLinks[attributeName].push(skill.name);
    });

    const character = {
      name: nameRef.current?.value || "",
      background: backgroundRef.current?.value || "",
      year: yearRef.current?.value || "",
      attributes: formattedAttributes,
      skills: formattedSkills,
      edges,
      hindrances,
      wounds: 0,
      fatigue: 0,
      bennies: 3,
      weapons: [],
      items: [],
      notes: "",
      parry: parseInt(parryRef.current?.value || "2"),
      toughness: parseInt(toughnessRef.current?.value || "2"),
      attribute_skill_links: attributeSkillLinks,
      userId: user?.id,
      createdAt: new Date().toISOString(),
    };
    
    updateCharacter(character);
    navigate("/");
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="mb-4 text-sm text-gray-400">
        Creating character for: {user?.firstName || user?.emailAddresses?.[0]?.emailAddress || 'Player'}
      </div>
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md text-gray-800 h-auto mb-10">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Create New Character
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name:
            </label>
            <input
              id="name"
              type="text"
              ref={nameRef}
              className="w-full px-4 py-2 mt-1 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="background" className="block text-sm font-medium text-gray-700">
              Background:
            </label>
            <input
              id="background"
              type="text"
              ref={backgroundRef}
              className="w-full px-4 py-2 mt-1 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="year" className="block text-sm font-medium text-gray-700">
              Year:
            </label>
            <input
              id="year"
              type="text"
              ref={yearRef}
              className="w-full px-4 py-2 mt-1 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="parry" className="block text-sm font-medium text-gray-700">
                Parry:
              </label>
              <input
                id="parry"
                type="number"
                ref={parryRef}
                defaultValue={2}
                className="w-full px-4 py-2 mt-1 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="toughness" className="block text-sm font-medium text-gray-700">
                Toughness:
              </label>
              <input
                id="toughness"
                type="number"
                ref={toughnessRef}
                defaultValue={2}
                className="w-full px-4 py-2 mt-1 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <h3 className="text-xl font-medium text-gray-800 mt-6 mb-4">Attributes</h3>
          {["agility", "smarts", "spirit", "strength", "vigor"].map((attr) => (
            <div key={attr} className="mb-4">
              <label htmlFor={attr} className="block text-sm font-medium text-gray-700">
                {attr.charAt(0).toUpperCase() + attr.slice(1)}:
              </label>
              <select
                id={attr}
                value={attributes[attr as keyof typeof attributes]}
                onChange={(e) => handleAttributeChange(attr, Number(e.target.value))}
                className="w-full px-4 py-2 mt-1 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {[4, 6, 8, 10, 12].map((num) => (
                  <option key={num} value={num}>
                    d{num}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <h3 className="text-xl font-medium text-gray-800 mt-6 mb-4">Skills</h3>
          <p className="text-sm text-gray-600 mb-4">
            Remaining Skill Points: {remainingSkillPoints}
          </p>
          {skillsOptions.map((skill) => {
            const skillKey = skill.name.toLowerCase().replace(' ', '');
            return (
              <div key={skill.name} className="mb-4">
                <label htmlFor={skill.name} className="block text-sm font-medium text-gray-700">
                  {skill.name} (Linked Attribute: {skill.linkedAttribute}):
                </label>
                <select
                  id={skill.name}
                  value={skills[skillKey]}
                  onChange={(e) => handleSkillChange(skillKey, Number(e.target.value))}
                  className="w-full px-4 py-2 mt-1 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {[4, 6, 8, 10, 12].map((num) => (
                    <option key={num} value={num}>
                      d{num}
                    </option>
                  ))}
                </select>
              </div>
            );
          })}

          <h3 className="text-xl font-medium text-gray-800 mt-6 mb-4">Edge 1</h3>
          <div className="mb-4">
            <select
              id="edge1"
              value={edge1?.name || ""}
              onChange={handleEdge1Change}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">--Select--</option>
              {edgesOptions
                .filter((edge) => edge.name !== edge2?.name)
                .map((edge, index) => (
                  <option key={index} value={edge.name}>
                    {edge.name} - {edge.description}
                  </option>
                ))}
            </select>
          </div>

          <h3 className="text-xl font-medium text-gray-800 mt-6 mb-4">Edge 2</h3>
          <div className="mb-4">
            <select
              id="edge2"
              value={edge2?.name || ""}
              onChange={handleEdge2Change}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">--Select--</option>
              {edgesOptions
                .filter((edge) => edge.name !== edge1?.name)
                .map((edge, index) => (
                  <option key={index} value={edge.name}>
                    {edge.name} - {edge.description}
                  </option>
                ))}
            </select>
          </div>

          <h3 className="text-xl font-medium text-gray-800 mt-6 mb-4">Hindrance 1</h3>
          <div className="mb-4">
            <select
              id="hindrance1"
              value={hindrance1?.name || ""}
              onChange={handleHindrance1Change}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">--Select--</option>
              {hindrancesOptions
                .filter((hindrance) => hindrance.name !== hindrance2?.name)
                .map((hindrance, index) => (
                  <option key={index} value={hindrance.name}>
                    {hindrance.name} - {hindrance.description}
                  </option>
                ))}
            </select>
          </div>

          <h3 className="text-xl font-medium text-gray-800 mt-6 mb-4">Hindrance 2</h3>
          <div className="mb-4">
            <select
              id="hindrance2"
              value={hindrance2?.name || ""}
              onChange={handleHindrance2Change}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">--Select--</option>
              {hindrancesOptions
                .filter((hindrance) => hindrance.name !== hindrance1?.name)
                .map((hindrance, index) => (
                  <option key={index} value={hindrance.name}>
                    {hindrance.name} - {hindrance.description}
                  </option>
                ))}
            </select>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-3 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Create Character
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}