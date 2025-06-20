import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Character } from "../types";

interface NotesProps {
  character: Character;
  updateCharacter: (character: Character) => void;
}

const Notes = ({ character, updateCharacter }: NotesProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: character.notes || "",
  });

  const handleSave = () => {
    if (editor) {
      const updatedNotes = editor.getHTML();
      updateCharacter({ ...character, notes: updatedNotes });
    }
  };

  return (
    <div>
      <h1 className="text-xl">Notes:</h1>
      <EditorContent editor={editor} />
      <button
        className="border border-white rounded m-2 py-1 px-2"
        onClick={handleSave}
      >
        Save Notes
      </button>
    </div>
  );
};

export default Notes;