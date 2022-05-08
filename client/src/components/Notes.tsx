import { useEffect, useState } from "react";
import { NoteInterface } from "../interfaces/interfaces";

const Notes = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        fetch("api/notes")
            .then((res) => res.json())
            .then((data) => setNotes(data));
    }, []);

    return (
        <div>
            <ul>
                {notes.length > 0 ? (
                    notes.map((note: NoteInterface) => (
                        <li key={note.id}>{note.note}</li>
                    ))
                ) : (
                    <span>No Notes</span>
                )}
            </ul>
        </div>
    );
};

export { Notes };
