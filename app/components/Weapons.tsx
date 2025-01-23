import { useState, useRef } from "react";
import { Character, Weapon } from "../types";

interface WeaponsProps {
  displayCharacter: Character;
  addWeapon: (weapon: Weapon) => void;
  deleteWeapon: (indexToDelete: number) => void;
}

const Weapons = ({
  displayCharacter,
  addWeapon,
  deleteWeapon,
}: WeaponsProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const damageRef = useRef<HTMLInputElement>(null);

  const handleAddWeapon = () => {
    const newWeapon = {
      name: nameRef.current?.value || "",
      damage: damageRef.current?.value || "",
    };

    if (!newWeapon.name || !newWeapon.damage) {
      alert("Both fields are required.");
      return;
    }
    addWeapon(newWeapon);
    if (nameRef.current) nameRef.current.value = "";
    if (damageRef.current) damageRef.current.value = "";
    setIsAdding(false);
  };

  const handleDeleteWeapon = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    e.preventDefault();
    deleteWeapon(index);
  };

  return (
    <section className="mb-6">
      <h2 className="text-2xl font-semibold mb-2">Weapons</h2>
      <div className="grid grid-cols-3 gap-4 my-4">
        {displayCharacter.weapons.map((weapon, index) => (
          <div
            key={index}
            className="p-4 bg-gray-800 rounded flex flex-col items-start gap-2"
          >
            <div className="flex flex-row justify-between items-center w-full">
              <p className="font-bold text-xl">{weapon.name}</p>
              <button
                className="hover:text-red-800 hover:bg-white border border:white px-2 text-xl rounded"
                onClick={(e) => handleDeleteWeapon(e, index)}
              >
                X
              </button>
            </div>
            <p className="text-lg">
              Damage: <span>{weapon.damage}</span>
            </p>
          </div>
        ))}
      </div>
      {!isAdding ? (
        <button
          className="p-4 bg-gray-800 rounded flex justify-center items-center text-4xl w-full"
          onClick={() => setIsAdding(true)}
        >
          +
        </button>
      ) : (
        <form
          className="p-4 bg-gray-800 rounded col-span-3 flex flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleAddWeapon();
          }}
        >
          <input
            type="text"
            placeholder="Weapon Name"
            ref={nameRef}
            className="p-2 rounded bg-gray-700 text-white"
          />
          <input
            type="text"
            placeholder="Weapon Damage"
            ref={damageRef}
            className="p-2 rounded bg-gray-700 text-white"
          />
          <div className="flex justify-between">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 rounded text-white"
            >
              Add
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-red-600 rounded text-white"
              onClick={() => setIsAdding(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </section>
  );
};

export default Weapons;
