import { useState, useRef } from "react";
import { Character } from "../types";

interface ItemsProps {
  displayCharacter: Character;
  addItem: (item: string) => void;
  deleteItem: (indexToDelete: number) => void;
  isAdminPage: boolean;
}

const Items = ({
  displayCharacter,
  addItem,
  deleteItem,
  isAdminPage,
}: ItemsProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  const handleAddItem = () => {
    const newItem = nameRef.current?.value || "";

    if (!newItem) {
      alert("Both fields are required.");
      return;
    }
    addItem(newItem);
    if (nameRef.current) nameRef.current.value = "";
    setIsAdding(false);
  };

  const handleDeleteItem = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    e.preventDefault();
    deleteItem(index);
  };

  console.log(displayCharacter);

  return (
    <section className="mb-6">
      <h2 className="text-2xl font-semibold mb-2">Items</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 my-4 text-gray-800 dark:text-gray-100">
        {displayCharacter.items.map((item, index) => (
          <div
            key={index}
            className="p-4 bg-gray-100 dark:bg-gray-800 rounded flex flex-col items-start gap-2"
          >
            <div className="flex flex-row justify-between items-center w-full ">
              <p className="font-bold text-xl">{item}</p>
              {!isAdminPage && (
                <button
                  className="hover:text-red-800 hover:bg-white border border:white px-2 mx-2 text-xl rounded"
                  onClick={(e) => handleDeleteItem(e, index)}
                >
                  X
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      {!isAdminPage && (
        <>
          {!isAdding ? (
            <button
              className="p-4 bg-gray-100 text-gray-800 dark:text-gray-100 dark:bg-gray-800 rounded flex justify-center items-center text-4xl w-full"
              onClick={() => setIsAdding(true)}
            >
              +
            </button>
          ) : (
            <form
              className="p-4 bg-gray-100 dark:bg-gray-800 rounded col-span-3 flex flex-col gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleAddItem();
              }}
            >
              <input
                type="text"
                placeholder="Item Name"
                ref={nameRef}
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
        </>
      )}
    </section>
  );
};

export default Items;
