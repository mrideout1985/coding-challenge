import React from "react";
import { Modal } from "antd";
import { useForm } from "react-hook-form";
import styles from "./AddNoteModal.module.scss";

interface AddNoteModalInterface {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    getNotes: () => void;
}

const AddNoteModal = ({
    showModal,
    setShowModal,
    getNotes,
}: AddNoteModalInterface) => {
    const {
        register,
        handleSubmit,
        getValues,
        reset,
        formState: { errors },
    } = useForm();

    const onAddNote = () => {
        try {
            fetch("api/notes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ note: getValues("note") }),
            });
        } finally {
            setShowModal(false);
            getNotes();
            reset();
        }
    };

    const handleCancel = () => {
        setShowModal(false);
        reset();
    };

    return (
        <Modal
            onCancel={handleCancel}
            title="Add note"
            visible={showModal}
            footer={null}
            className={styles["modal"]}
        >
            <>
                <form
                    className={styles["form"]}
                    data-testid="form"
                    onSubmit={handleSubmit(onAddNote)}
                >
                    <div className={styles["inputs"]}>
                        <input
                            type="text"
                            {...register("note", {
                                required: "Note is required",
                                maxLength: {
                                    value: 500,
                                    message:
                                        "Cannot be more than 500 characters",
                                },
                            })}
                        />
                        <input
                            data-testid="submit"
                            type="submit"
                            value="add note"
                        />
                    </div>
                    <span className={styles["errors"]} data-testid="errors">
                        {errors.note && errors.note.message}
                    </span>
                </form>
            </>
        </Modal>
    );
};

export { AddNoteModal };
