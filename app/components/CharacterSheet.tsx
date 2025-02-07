"use client";

import React, { useCallback, useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
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
import Container from "./DiceRoller";
import Notes from "./Notes";

interface CharacterSheetProps {
  character: Character;
}

const CharacterSheet = ({ character }: CharacterSheetProps) => {
  const [displayCharacter, setDisplayCharacter] = useState(character);
  const { updateCharacter } = useUpdateCharacter();
  const prevCharacterRef = useRef<Character | null>(null);
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");

  const addWeapon = (weapon: { name: string; damage: string }) => {
    setDisplayCharacter((prevCharacter) => {
      const updatedCharacter = {
        ...prevCharacter,
        weapons: [...prevCharacter.weapons, weapon],
      };
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
        updateCharacter(updatedCharacter);
        return updatedCharacter;
      });
    },
    [updateCharacter]
  );

  const addItem = (item: string) => {
    setDisplayCharacter((prevCharacter) => {
      const updatedCharacter = {
        ...prevCharacter,
        items: [...prevCharacter.items, item],
      };
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
      updateCharacter(updatedCharacter);
      return updatedCharacter;
    });
  };

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
    <div className="p-12 rounded shadow-lg justify-between flex flex-col xl:flex-row xl:gap-8 border border-gray-900">
      <section>
        <Header
          name={displayCharacter.name}
          background={displayCharacter.background}
          year={displayCharacter.year}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Attributes attributes={displayCharacter.attributes} />
          <SkillsSection skills={displayCharacter.skills} />
        </div>
        <div className="flex flex-col gap-4 my-6">
          <Edges edges={displayCharacter.edges} />
          <Hindrances hindrances={displayCharacter.hindrances} />
          {!isAdminPage && <Notes character={displayCharacter} />}
        </div>
      </section>
      <section>
        <Weapons
          displayCharacter={displayCharacter}
          addWeapon={addWeapon}
          deleteWeapon={deleteWeapon}
          isAdminPage={isAdminPage}
        />

        {displayCharacter.items && (
          <Items
            displayCharacter={displayCharacter}
            addItem={addItem}
            deleteItem={deleteItem}
            isAdminPage={isAdminPage}
          />
        )}

        {!isAdminPage && (
          <Status
            displayCharacter={displayCharacter}
            setDisplayCharacter={setDisplayCharacter}
          />
        )}
        {!isAdminPage && <Container />}
      </section>
    </div>
  );
};

export default CharacterSheet;
