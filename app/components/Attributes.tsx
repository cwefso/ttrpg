interface AttributesProps {
  attributes: {
    agility: number;
    smarts: number;
    spirit: number;
    strength: number;
    vigor: number;
  };
}

export const Attributes = ({ attributes }: AttributesProps) => {
  return (
    <section className="mb-6">
      <h2 className="text-2xl font-semibold mb-2">Attributes</h2>
      <div className="flex flex-col gap-2 text-center">
        {Object.entries(attributes).map(([attr, value]) => (
          <div
            key={attr}
            className="p-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded flex flex-row justify-between"
          >
            <p className="font-bold capitalize text-xl">{attr}</p>
            {<p className="text-xl">d{value}</p>}
          </div>
        ))}
      </div>
    </section>
  );
};
