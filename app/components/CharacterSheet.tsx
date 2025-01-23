"use client";

import React, { useCallback, useState, useEffect, useRef } from "react";
import { Character } from "../types";
import { useUpdateCharacter } from "../hooks/useUpdateCharacter";
import Weapons from "./Weapons";

interface CharacterSheetProps {
  character: Character;
}

const CharacterSheet: React.FC<CharacterSheetProps> = ({ character }) => {
  const [displayCharacter, setDisplayCharacter] = useState(character);
  const { updateCharacter } = useUpdateCharacter();
  const prevCharacterRef = useRef<Character | null>(null);

  function normalizeSkillName(skill: string): string {
    return skill
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/^./, (str) => str.toUpperCase());
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    updateCharacter(displayCharacter);
  };

  const addWeapon = (weapon: { name: string; damage: string }) => {
    setDisplayCharacter((prevCharacter) => {
      const updatedCharacter = {
        ...prevCharacter,
        weapons: [...prevCharacter.weapons, weapon],
      };
      console.log("display,", updatedCharacter);
      updateCharacter(updatedCharacter);
      return updatedCharacter;
    });
  };

  const deleteWeapon = useCallback((indexToDelete: number) => {
    setDisplayCharacter((prevCharacter) => {
      const updatedCharacter = {
        ...prevCharacter,
        weapons: prevCharacter.weapons.filter(
          (_, index) => index !== indexToDelete
        ),
      };
      console.log("display,", updatedCharacter);
      updateCharacter(updatedCharacter);
      return updatedCharacter;
    });
  }, []);

  //
  useEffect(() => {
    prevCharacterRef.current = displayCharacter;

    return () => {
      if (
        prevCharacterRef.current &&
        prevCharacterRef.current !== displayCharacter
      ) {
        updateCharacter(displayCharacter);
      }
    };
  }, [displayCharacter, updateCharacter]);

  return (
    <div className="p-6 bg-gray-900 text-white mx-auto rounded shadow-lg">
      <header className="border-b border-gray-700 pb-4 mb-6">
        <h1 className="text-4xl font-bold">{displayCharacter.name}</h1>
        <div className="w-full flex flex-row justify-between">
          <p className="text-lg text-gray-400">
            {displayCharacter.background} | Year: {displayCharacter.year}
          </p>
          <button
            type="button"
            className="border border-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </header>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Attributes</h2>
        <div className="grid grid-cols-5 gap-4 text-center">
          {Object.entries(displayCharacter.attributes).map(([attr, value]) => (
            <div key={attr} className="p-4 bg-gray-800 rounded">
              <p className="font-bold capitalize text-xl">{attr}</p>
              <p className="text-xl">d{value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Skills</h2>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(displayCharacter.skills).map(([skill, value]) => (
            <div key={skill} className="p-4 bg-gray-800 rounded">
              <p className="font-bold capitalize text-xl">
                {normalizeSkillName(skill)}
              </p>
              <p className="text-xl">d{value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Edges</h2>
        <ul className="list-disc list-inside">
          {displayCharacter.edges.map((edge, index) => (
            <li key={index} className="text-xl">
              <strong>{edge.name}</strong>: {edge.description}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Hindrances</h2>
        <ul className="list-disc list-inside">
          {displayCharacter.hindrances.map((hindrance, index) => (
            <li key={index} className="text-xl">
              <strong>{hindrance.name}</strong>: {hindrance.description}
            </li>
          ))}
        </ul>
      </section>

      <Weapons
        displayCharacter={displayCharacter}
        addWeapon={addWeapon}
        deleteWeapon={deleteWeapon}
      />

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Status</h2>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-gray-800 rounded">
            <p className="font-bold">Wounds</p>
            <div className="flex justify-center items-center gap-2">
              <button
                className="bg-red-500 px-2 py-1 rounded"
                onClick={() =>
                  setDisplayCharacter((prev) => ({
                    ...prev,
                    wounds: Math.max(0, prev.wounds - 1),
                  }))
                }
              >
                -
              </button>
              <p className="text-xl">{displayCharacter.wounds}</p>
              <button
                className="bg-green-500 px-2 py-1 rounded"
                onClick={() =>
                  setDisplayCharacter((prev) => ({
                    ...prev,
                    wounds: prev.wounds + 1,
                  }))
                }
              >
                +
              </button>
            </div>
          </div>
          <div className="p-4 bg-gray-800 rounded">
            <p className="font-bold">Fatigue</p>
            <div className="flex justify-center items-center gap-2">
              <button
                className="bg-red-500 px-2 py-1 rounded"
                onClick={() =>
                  setDisplayCharacter((prev) => ({
                    ...prev,
                    fatigue: Math.max(0, prev.fatigue - 1),
                  }))
                }
              >
                -
              </button>
              <p className="text-xl">{displayCharacter.fatigue}</p>
              <button
                className="bg-green-500 px-2 py-1 rounded"
                onClick={() =>
                  setDisplayCharacter((prev) => ({
                    ...prev,
                    fatigue: prev.fatigue + 1,
                  }))
                }
              >
                +
              </button>
            </div>
          </div>
          <div className="p-4 bg-gray-800 rounded">
            <p className="font-bold">Bennies</p>
            <div className="flex justify-center items-center gap-2">
              <button
                className="bg-red-500 px-2 py-1 rounded"
                onClick={() =>
                  setDisplayCharacter((prev) => ({
                    ...prev,
                    bennies: Math.max(0, prev.bennies - 1),
                  }))
                }
              >
                -
              </button>
              <p className="text-xl">{displayCharacter.bennies}</p>
              <button
                className="bg-green-500 px-2 py-1 rounded"
                onClick={() =>
                  setDisplayCharacter((prev) => ({
                    ...prev,
                    bennies: prev.bennies + 1,
                  }))
                }
              >
                +
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CharacterSheet;
