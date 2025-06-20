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

  const extractDiceValue = (skillValue: string): string => {
    // Extract dice value from strings like "Smarts d6" or "Agility d8 (Specialized)"
    const match = skillValue.match(/d(\d+)/);
    return match ? `d${match[1]}` : skillValue;
  };

  const shouldShowSkill = (skillValue: string): boolean => {
    // Show skill if it's not d4 or if it has special status like (Specialized) or (Untrained)
    const diceMatch = skillValue.match(/d(\d+)/);
    const hasSpecialStatus = skillValue.includes('(') && skillValue.includes(')');
    
    if (!diceMatch) return true; // Show if we can't parse it
    
    const diceValue = parseInt(diceMatch[1]);
    return diceValue > 4 || hasSpecialStatus;
  };

  return (
    <section className="mb-6">
      <h2 className="text-2xl font-semibold mb-2">Skills</h2>
      <div className="flex flex-col gap-2 text-center">
        {Object.entries(skills).map(([skill, value]) => {
          if (shouldShowSkill(value)) {
            return (
              <div
                key={skill}
                className="p-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded flex flex-row justify-between"
              >
                <p className="font-bold capitalize text-xl">
                  {normalizeSkillName(skill)}
                </p>
                <p className="text-xl">{extractDiceValue(value)}</p>
              </div>
            );
          }
          return null;
        })}
      </div>
    </section>
  );
};