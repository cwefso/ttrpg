"use client";

import React, { useCallback, useState, useEffect, useRef } from "react";
import { Character } from "../types";
import { useUpdateCharacter } from "../hooks/useUpdateCharacter";
import Weapons from "./Weapons";
import Status from "./Status";

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

  const deleteWeapon = useCallback(
    (indexToDelete: number) => {
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
    },
    [updateCharacter]
  );

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
    <div className="p-12 bg-gray-900 text-white rounded shadow-lg w-[95vw] h-[95vh] justify-around flex flex-col">
      <header className="border-b border-gray-700 pb-4 mb-6">
        <h1 className="text-4xl font-bold">{displayCharacter.name}</h1>
        <div className="w-full flex flex-row justify-between items-center">
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
        <div className="flex flex-col gap-2 text-center">
          {Object.entries(displayCharacter.attributes).map(([attr, value]) => (
            <div
              key={attr}
              className="p-4 bg-gray-800 rounded flex flex-row justify-between"
            >
              <p className="font-bold capitalize text-xl">{attr}</p>
              <p className="text-xl">d{value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Skills</h2>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(displayCharacter.skills).map(([skill, value]) => {
            if (value !== ("d4" as any))
              return (
                <div
                  key={skill}
                  className="p-4 bg-gray-800 rounded flex flex-row justify-between"
                >
                  <p className="font-bold capitalize text-xl">
                    {normalizeSkillName(skill)}
                  </p>
                  <p className="text-xl">{value}</p>
                </div>
              );
          })}
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

      <Status
        displayCharacter={displayCharacter}
        setDisplayCharacter={setDisplayCharacter}
      />
    </div>
  );
};

export default CharacterSheet;
