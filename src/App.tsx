import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import { useCharacter } from './hooks/useCharacter';
import CharacterSheet from './components/CharacterSheet';
import NewCharacterForm from './components/NewCharacterForm';

function App() {
  const { character, updateCharacter } = useCharacter();

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <SignedIn>
          <Routes>
            <Route 
              path="/" 
              element={
                character ? (
                  <CharacterSheet character={character} updateCharacter={updateCharacter} />
                ) : (
                  <Navigate to="/new-character" replace />
                )
              } 
            />
            <Route 
              path="/new-character" 
              element={<NewCharacterForm updateCharacter={updateCharacter} />} 
            />
          </Routes>
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </div>
    </Router>
  );
}

export default App;