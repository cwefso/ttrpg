import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Character } from "../types";
import { useUpdateCharacter } from "../hooks/useUpdateCharacter";

// Define the props for the Notes component
interface NotesProps {
  character: Character;
}

const Notes = ({ character }: NotesProps) => {
  const { updateCharacter } = useUpdateCharacter();

  // Initialize the Tiptap editor
  const editor = useEditor({
    extensions: [StarterKit], // Add the StarterKit for basic formatting
    content: character.notes || "", // Load existing notes or start with an empty editor
  });

  const handleSave = () => {
    if (editor) {
      const updatedNotes = editor.getHTML(); // Get the HTML content from the editor
      updateCharacter({ ...character, notes: updatedNotes }); // Update the character object
    }
  };

  return (
    <div>
      <h1 className="text-xl">Notes:</h1>
      <EditorContent editor={editor} content={character.notes} />{" "}
      {/* Render the Tiptap editor */}
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
