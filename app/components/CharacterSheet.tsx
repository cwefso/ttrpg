"use client";

import React, { useCallback, useState, useEffect, useRef } from "react";
import { Character } from "../types";
import { useUpdateCharacter } from "../hooks/useUpdateCharacter";
import Weapons from "./Weapons";
import Status from "./Status";
import { Attributes } from "./Attributes";
import { SkillsSection } from "./Skills";
import { Header } from "./Header";
import { Edges } from "./Edges";
import { Hindrances } from "./Hindrances";
import Items from "./Items";

interface CharacterSheetProps {
  character: Character;
}

const CharacterSheet: React.FC<CharacterSheetProps> = ({ character }) => {
  const [displayCharacter, setDisplayCharacter] = useState(character);
  const { updateCharacter } = useUpdateCharacter();
  const prevCharacterRef = useRef<Character | null>(null);

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

  const addItem = (item: { name: string; description: string }) => {
    setDisplayCharacter((prevCharacter) => {
      const updatedCharacter = {
        ...prevCharacter,
        items: [...prevCharacter.items, item],
      };
      console.log("display,", updatedCharacter);
      updateCharacter(updatedCharacter);
      return updatedCharacter;
    });
  };

  const deleteItem = (indexToDelete: number) => {
    setDisplayCharacter((prevCharacter) => {
      const updatedCharacter = {
        ...prevCharacter,
        items:
          prevCharacter.items?.filter((_, index) => index !== indexToDelete) ||
          [],
      };
      console.log("Updated character with deleted item:", updatedCharacter);
      updateCharacter(updatedCharacter);
      return updatedCharacter;
    });
  };

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
    <div className="p-12 text-white rounded shadow-lg justify-around flex flex-col border border-gray-900">
      <Header
        name={displayCharacter.name}
        background={displayCharacter.background}
        year={displayCharacter.year}
        handleSubmit={handleSubmit}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Attributes attributes={displayCharacter.attributes} />
        <SkillsSection skills={displayCharacter.skills} />
      </div>
      <div className="flex flex-col gap-4 my-6">
        <Edges edges={displayCharacter.edges} />

        <Hindrances hindrances={displayCharacter.hindrances} />
      </div>

      <Weapons
        displayCharacter={displayCharacter}
        addWeapon={addWeapon}
        deleteWeapon={deleteWeapon}
      />

      {displayCharacter.items && (
        <Items
          displayCharacter={displayCharacter}
          addItem={addItem}
          deleteItem={deleteItem}
        />
      )}

      <Status
        displayCharacter={displayCharacter}
        setDisplayCharacter={setDisplayCharacter}
      />
    </div>
  );
};

export default CharacterSheet;
