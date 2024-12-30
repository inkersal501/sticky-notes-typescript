import { useState, useEffect, FormEvent  } from 'react'  
import './App.css'
type Notes = string;

function App() { 

  const [notes, setNotes] = useState<Notes[]>([]);  
  const [note, setNote] = useState<string>("");  

  useEffect(() => {
    const storedNotes = localStorage.getItem("sticky-notes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes)); 
    }
  }, []);
 
  useEffect(() => {
    localStorage.setItem("sticky-notes", JSON.stringify(notes));
  }, [notes]);
  
  const addNote = (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (note.trim()) {
      setNotes([...notes, note]); 
      setNote(""); 
    }
  };
 
  const deleteNote = (index: number) => {
    const updatedNotes = notes.filter((_note, i) => i !== index);
    setNotes(updatedNotes);
  };


  return (
    <> 
      <h1>Sticky Notes</h1>
      <div className='input-container'>
        <form onSubmit={addNote}>
          <input
              type="text"
              placeholder="Write your note"
              value={note}
              onChange={(e)=>setNote(e.target.value)}
            />
            <button type='submit'>Add Note</button>
        </form>
      </div>

      <div className="notes-container">
        {notes.map((note, index) => (
          <div key={index} className="note">
            <p>{note}</p>
            <button type="button" onClick={() => deleteNote(index)}>x</button>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
