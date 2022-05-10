import { AddNoteModal } from "../modals/AddNoteModal";
import { NoteInterface } from "../../interfaces/interfaces";
import { Switch } from "antd";
import { useEffect, useState, useCallback } from "react";
import dayjs from "dayjs";
import styles from "./Notes.module.scss";

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
        <>
            <AddNoteModal
                getNotes={getNotes}
                setShowModal={setShowModal}
                showModal={showModal}
            />
            <div className={styles["container"]}>
                <div className={styles["toggle"]}>
                    <button type="button" onClick={() => setShowModal(true)}>
                        Add note
                    </button>
                    <Switch onChange={handleShowAllNotes} />
                </div>
                <section className={styles["notes"]}>
                    <span className={styles["timeframe"]}>
                        {showAllNotes
                            ? "All notes"
                            : `Notes from ${dayjs()
                                  .subtract(6, "months")
                                  .format("YYYY/MM/DD")} - ${dayjs().format(
                                  "YYYY/MM/DD"
                              )}`}
                    </span>
                    <ul>
                        {notes.length > 0 ? (
                            notes.map((note: NoteInterface) => (
                                <li key={note.id}>
                                    <div>{note.note}</div>
                                </li>
                            ))
                        ) : (
                            <span>No Notes</span>
                        )}
                    </ul>
                </section>
            </div>
        </>
    );
};

export { Notes };
