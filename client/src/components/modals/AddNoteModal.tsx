import { Modal } from "antd";
import React from "react";
import { useForm } from "react-hook-form";

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
    const { register, handleSubmit, getValues, reset } = useForm();

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

    return (
        <Modal
            onCancel={() => setShowModal(false)}
            onOk={onAddNote}
            title="Basic Modal"
            visible={showModal}
        >
            <>
                <form onSubmit={handleSubmit(onAddNote)}>
                    <input {...register("note")} />
                </form>
            </>
        </Modal>
    );
};

export { AddNoteModal };
