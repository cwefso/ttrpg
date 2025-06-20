import { Hindrance } from "../types";

interface HindrancesProps {
  hindrances: Hindrance[];
}

export const Hindrances = ({ hindrances }: HindrancesProps) => {
  return (
    <section className="mb-2">
      <h2 className="text-2xl font-semibold mb-2">Hindrances</h2>
      <ul className="list-disc list-inside">
        {hindrances.map((hindrance, index) => (
          <li key={index} className="text-xl">
            <strong>{hindrance.name}</strong>: {hindrance.description}
          </li>
        ))}
      </ul>
    </section>
  );
};