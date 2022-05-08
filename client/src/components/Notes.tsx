import { useEffect, useState } from "react";
import { NoteInterface } from "../interfaces/interfaces";
import dayjs from "dayjs";

const Notes = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const sixMonthsAgo = dayjs().subtract(6, "months");
        const url = `api/notes?from=${sixMonthsAgo.format("YYYY-MM-DD")}`;

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setNotes(data);
            });
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
