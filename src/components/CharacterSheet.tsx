import React, { useCallback, useState, useEffect } from "react";
import { useUser } from '@clerk/clerk-react';
import { Character } from "../types";
import Weapons from "./Weapons";
import Status from "./Status";
import { Attributes } from "./Attributes";
import { SkillsSection } from "./Skills";
import { Header } from "./Header";
import { Edges } from "./Edges";
import { Hindrances } from "./Hindrances";
import Items from "./Items";
import DiceRoller from "./DiceRoller";
import Notes from "./Notes";

interface CharacterSheetProps {
  character: Character;
  updateCharacter: (character: Character) => void;
}

const CharacterSheet = ({ character, updateCharacter }: CharacterSheetProps) => {
  const { user } = useUser();
  const [displayCharacter, setDisplayCharacter] = useState(character);

  const addWeapon = (weapon: { name: string; damage: string; notes?: string }) => {
    const updatedCharacter = {
      ...displayCharacter,
      weapons: [...displayCharacter.weapons, weapon],
    };
    setDisplayCharacter(updatedCharacter);
    updateCharacter(updatedCharacter);
  };

  const deleteWeapon = useCallback(
    (indexToDelete: number) => {
      const updatedCharacter = {
        ...displayCharacter,
        weapons: displayCharacter.weapons.filter(
          (_, index) => index !== indexToDelete
        ),
      };
      setDisplayCharacter(updatedCharacter);
      updateCharacter(updatedCharacter);
    },
    [displayCharacter, updateCharacter]
  );

  const addItem = (item: string) => {
    const updatedCharacter = {
      ...displayCharacter,
      items: [...displayCharacter.items, item],
    };
    setDisplayCharacter(updatedCharacter);
    updateCharacter(updatedCharacter);
  };

  const deleteItem = (indexToDelete: number) => {
    const updatedCharacter = {
      ...displayCharacter,
      items: displayCharacter.items?.filter((_, index) => index !== indexToDelete) || [],
    };
    setDisplayCharacter(updatedCharacter);
    updateCharacter(updatedCharacter);
  };

  useEffect(() => {
    setDisplayCharacter(character);
  }, [character]);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="mb-4 text-sm text-gray-400">
        Playing as: {user?.firstName || user?.emailAddresses?.[0]?.emailAddress || 'Player'}
      </div>
      <div className="p-12 rounded shadow-lg justify-between flex flex-col xl:flex-row xl:gap-8 border border-gray-900">
        <section>
          <Header
            name={displayCharacter.name}
            background={displayCharacter.background}
            year={displayCharacter.year}
            parry={displayCharacter.parry}
            toughness={displayCharacter.toughness}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Attributes attributes={displayCharacter.attributes} />
            <SkillsSection skills={displayCharacter.skills} />
          </div>
          <div className="flex flex-col gap-4 my-6">
            <Edges edges={displayCharacter.edges} />
            <Hindrances hindrances={displayCharacter.hindrances} />
            <Notes character={displayCharacter} updateCharacter={updateCharacter} />
          </div>
        </section>
        <section>
          <Weapons
            displayCharacter={displayCharacter}
            addWeapon={addWeapon}
            deleteWeapon={deleteWeapon}
          />

          <Items
            displayCharacter={displayCharacter}
            addItem={addItem}
            deleteItem={deleteItem}
          />

          <Status
            displayCharacter={displayCharacter}
            setDisplayCharacter={setDisplayCharacter}
            updateCharacter={updateCharacter}
          />

          <DiceRoller />
        </section>
      </div>
    </div>
  );
};

export default CharacterSheet;