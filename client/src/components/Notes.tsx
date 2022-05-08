import { useEffect, useState } from "react";
import { NoteInterface } from "../interfaces/interfaces";
import { Switch } from "antd";
import dayjs from "dayjs";

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [showAllNotes, setShowAllNotes] = useState(false);

    useEffect(() => {
        const baseApi = "api/notes";
        const sixMonthsAgo = dayjs().subtract(6, "months");
        const filteredApi = `${baseApi}?from=${sixMonthsAgo.format(
            "YYYY-MM-DD"
        )}`;

        fetch(showAllNotes ? baseApi : filteredApi)
            .then((res) => res.json())
            .then((data) => {
                setNotes(data);
            });
    }, [showAllNotes]);

    const handleShowAllNotes = () => {
        setShowAllNotes(!showAllNotes);
    };

    return (
        <div>
            <Switch onChange={handleShowAllNotes} />
            <span>
                {showAllNotes
                    ? "Notes from the dawn of time.."
                    : `Notes from ${dayjs()
                          .subtract(6, "months")
                          .format("YYYY-MM-DD")} until ${dayjs().format(
                          "YYYY-MM-DD"
                      )}`}
            </span>
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
