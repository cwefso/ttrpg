import { Edge } from "../types";

interface Edges {
  edges: Edge[];
}

export const Edges = ({ edges }: Edges) => {
  return (
    <section className="mb-2">
      <h2 className="text-2xl font-semibold mb-2">Edges</h2>
      <ul className="list-disc list-inside">
        {edges.map((edge, index) => (
          <li key={index} className="text-xl">
            <strong>{edge.name}</strong>: {edge.description}
          </li>
        ))}
      </ul>
    </section>
  );
};
