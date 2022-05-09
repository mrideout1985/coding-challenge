import { useEffect, useState, useCallback } from "react";
import { Switch } from "antd";
import dayjs from "dayjs";
import { NoteInterface } from "../../interfaces/interfaces";
import { AddNoteModal } from "../modals/AddNoteModal";

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [showAllNotes, setShowAllNotes] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const getNotes = useCallback(async () => {
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

    useEffect(() => {
        getNotes();
    }, [getNotes]);

    const handleShowAllNotes = () => {
        setShowAllNotes(!showAllNotes);
    };

    return (
        <div>
            <Switch onChange={handleShowAllNotes} />
            <button onClick={() => setShowModal(true)}>Add Note</button>
            <AddNoteModal
                getNotes={getNotes}
                setShowModal={setShowModal}
                showModal={showModal}
            />
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
