"use client";

import { useRef, useState } from "react";
import { edgesOptions } from "../utils/edges";
import { hindrancesOptions } from "../utils/hindrances";
import { Edge, Hindrance } from "../types";
import { useUpdateCharacter } from "../hooks/useUpdateCharacter";
import { useRouter } from "next/navigation";
import { skillsOptions } from "../utils/skills";

export default function NewCharacterForm() {
  const nameRef = useRef<HTMLInputElement>(null);
  const backgroundRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);
  const [edge1, setEdge1] = useState<Edge | null>(null);
  const [edge2, setEdge2] = useState<Edge | null>(null);
  const [hindrance1, setHindrance1] = useState<Hindrance | null>(null);
  const [hindrance2, setHindrance2] = useState<Hindrance | null>(null);

  const [edges, setEdges] = useState<Edge[]>([]);
  const [hindrances, setHindrances] = useState<Hindrance[]>([]);
  const { updateCharacter } = useUpdateCharacter();
  const router = useRouter();

  const [attributes, setAttributes] = useState({
    agility: 0,
    smarts: 0,
    spirit: 0,
    strength: 0,
    vigor: 0,
  });

  // Starting with 15 skill points
  const [remainingSkillPoints, setRemainingSkillPoints] = useState(15);

  const [skills, setSkills] = useState<Record<string, number>>(
    skillsOptions.reduce((acc, skill) => {
      acc[skill.name] = 4; // All skills start at d4
      return acc;
    }, {} as Record<string, number>)
  );

  const handleSkillChange = (skillName: string, newValue: number) => {
    const linkedAttribute = skillsOptions.find(
      (skill) => skill.name === skillName
    )?.linkedAttribute;

    const currentSkillValue = skills[skillName];
    const attributeValue =
      attributes[linkedAttribute as keyof typeof attributes];

    // Calculate the cost to increase or decrease the skill
    const costToIncrease =
      newValue <= attributeValue
        ? newValue - currentSkillValue // 1 point per level within attribute
        : 2 * (newValue - attributeValue) +
          (attributeValue - currentSkillValue); // 2 points above attribute

    const costToDecrease =
      currentSkillValue <= attributeValue
        ? currentSkillValue - newValue // Refund 1 point per level within attribute
        : 2 * (currentSkillValue - attributeValue) +
          (attributeValue - newValue); // Refund 2 points above attribute

    const cost =
      newValue > currentSkillValue ? costToIncrease : -costToDecrease;

    // Update the skill value and remaining points if within bounds
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
  // Handle Edge 1 selection and add to the edge array
  const handleEdge1Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedEdge = edgesOptions.find(
      (edge) => edge.name === e.target.value
    );
    setEdge1(selectedEdge || null);
    if (selectedEdge) {
      setEdges((prevEdges) => [...prevEdges, selectedEdge]);
      // When an edge is selected for Edge 1, set Edge 2 options without that edge
      setEdge2(null); // Clear Edge 2 selection when Edge 1 is selected
    }
  };

  // Handle Edge 2 selection and add to the edge array
  const handleEdge2Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedEdge = edgesOptions.find(
      (edge) => edge.name === e.target.value
    );
    setEdge2(selectedEdge || null);
    if (selectedEdge) {
      setEdges((prevEdges) => [...prevEdges, selectedEdge]);
    }
  };

  // Handle Hindrance 1 selection and add to the hindrance array
  const handleHindrance1Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedHindrance = hindrancesOptions.find(
      (hindrance) => hindrance.name === e.target.value
    );
    setHindrance1(selectedHindrance || null);
    if (selectedHindrance) {
      setHindrances((prevHindrances) => [...prevHindrances, selectedHindrance]);
      // When a hindrance is selected for Hindrance 1, set Hindrance 2 options without that hindrance
      setHindrance2(null); // Clear Hindrance 2 selection when Hindrance 1 is selected
    }
  };

  // Handle Hindrance 2 selection and add to the hindrance array
  const handleHindrance2Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedHindrance = hindrancesOptions.find(
      (hindrance) => hindrance.name === e.target.value
    );
    setHindrance2(selectedHindrance || null);
    if (selectedHindrance) {
      setHindrances((prevHindrances) => [...prevHindrances, selectedHindrance]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const character = {
      name: nameRef.current?.value || "",
      background: backgroundRef.current?.value || "",
      year: yearRef.current?.value || "",
      attributes,
      skills: Object.entries(skills).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: ` ${value}`, // Convert skill value to dice format (e.g., `d4`, `d6`)
        }),
        {}
      ),
      edges,
      hindrances,
      wounds: 0,
      fatigue: 0,
      bennies: 0,
      weapons: [],
      items: [],
    };
    updateCharacter(character);
    console.log("Character Created:", character);
    router.push("/");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md text-gray-800 h-auto mt-[40vh] mb-10">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Create New Character
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
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

        {/* Background */}
        <div className="mb-4">
          <label
            htmlFor="background"
            className="block text-sm font-medium text-gray-700"
          >
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

        {/* Year */}
        <div className="mb-4">
          <label
            htmlFor="year"
            className="block text-sm font-medium text-gray-700"
          >
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

        {/* Attributes */}
        <h3 className="text-xl font-medium text-gray-800 mt-6 mb-4">
          Attributes
        </h3>
        {["agility", "smarts", "spirit", "strength", "vigor"].map((attr) => (
          <div key={attr} className="mb-4">
            <label
              htmlFor={attr}
              className="block text-sm font-medium text-gray-700"
            >
              {attr.charAt(0).toUpperCase() + attr.slice(1)}:
            </label>
            <select
              id={attr}
              value={attributes[attr as keyof typeof attributes]}
              onChange={(e) =>
                handleAttributeChange(attr, Number(e.target.value))
              }
              className="w-full px-4 py-2 mt-1 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">--Attribute Value--</option>
              {[4, 6, 8, 10, 12].map((num) => (
                <option key={num} value={num}>
                  {` ${num}`}
                </option>
              ))}
            </select>
          </div>
        ))}

        {/* Skills */}
        <h3 className="text-xl font-medium text-gray-800 mt-6 mb-4">Skills</h3>
        <p className="text-sm text-gray-600 mb-4">
          Remaining Skill Points: {remainingSkillPoints}
        </p>
        {skillsOptions.map((skill) => (
          <div key={skill.name} className="mb-4">
            <label
              htmlFor={skill.name}
              className="block text-sm font-medium text-gray-700"
            >
              {skill.name} (Linked Attribute: {skill.linkedAttribute}):
            </label>
            <select
              id={skill.name}
              value={skills[skill.name]}
              onChange={(e) =>
                handleSkillChange(skill.name, Number(e.target.value))
              }
              className="w-full px-4 py-2 mt-1 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[4, 6, 8, 10, 12].map((num) => (
                <option key={num} value={num}>
                  {` ${num}`}
                </option>
              ))}
            </select>
          </div>
        ))}

        {/* Edge 1 */}
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
              .filter((edge) => edge.name !== edge2?.name) // Remove the selected Edge 2 from Edge 1 list
              .map((edge, index) => (
                <option key={index} value={edge.name}>
                  {edge.name} - {edge.description}
                </option>
              ))}
          </select>
        </div>

        {/* Edge 2 */}
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
              .filter((edge) => edge.name !== edge1?.name) // Remove the selected Edge 1 from Edge 2 list
              .map((edge, index) => (
                <option key={index} value={edge.name}>
                  {edge.name} - {edge.description}
                </option>
              ))}
          </select>
        </div>

        {/* Hindrances 1 */}
        <h3 className="text-xl font-medium text-gray-800 mt-6 mb-4">
          Hindrance 1
        </h3>
        <div className="mb-4">
          <select
            id="hindrance1"
            value={hindrance1?.name || ""}
            onChange={handleHindrance1Change}
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">--Select--</option>
            {hindrancesOptions
              .filter((hindrance) => hindrance.name !== hindrance2?.name) // Remove the selected Hindrances 2 from Hindrances 1 list
              .map((hindrance, index) => (
                <option key={index} value={hindrance.name}>
                  {hindrance.name} - {hindrance.description}
                </option>
              ))}
          </select>
        </div>

        {/* Hindrances 2 */}
        <h3 className="text-xl font-medium text-gray-800 mt-6 mb-4">
          Hindrance 2
        </h3>
        <div className="mb-4">
          <select
            id="hindrance2"
            value={hindrance2?.name || ""}
            onChange={handleHindrance2Change}
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">--Select--</option>
            {hindrancesOptions
              .filter((hindrance) => hindrance.name !== hindrance1?.name) // Remove the selected Hindrances 1 from Hindrances 2 list
              .map((hindrance, index) => (
                <option key={index} value={hindrance.name}>
                  {hindrance.name} - {hindrance.description}
                </option>
              ))}
          </select>
        </div>

        {/* Submit Button */}
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
  );
}
