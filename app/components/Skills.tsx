import { Skills } from "../types";

interface SkillsProps {
  skills: Skills;
}

export const SkillsSection = ({ skills }: SkillsProps) => {
  function normalizeSkillName(skill: string): string {
    return skill
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/^./, (str) => str.toUpperCase());
  }

  return (
    <section className="mb-6">
      <h2 className="text-2xl font-semibold mb-2">Skills</h2>
      <div className="flex flex-col gap-2 text-center">
        {Object.entries(skills).map(([skill, value]) => {
          if (value !== ("d4" as unknown))
            return (
              <div
                key={skill}
                className="p-4 bg-gray-100 dark:bg-gray-800 rounded flex flex-row justify-between"
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
  );
};
