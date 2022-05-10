import React from "react";
import { Modal } from "antd";
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

    return (
        <Modal
            onCancel={() => setShowModal(false)}
            title="Basic Modal"
            visible={showModal}
            footer={null}
        >
            <>
                <form data-testid="form" onSubmit={handleSubmit(onAddNote)}>
                    <input
                        {...register("note", {
                            required: "Note is required",
                            maxLength: {
                                value: 500,
                                message: "Cannot be more than 500 characters",
                            },
                        })}
                    />
                    <span data-testid="errors">
                        {errors.note && errors.note.message}
                    </span>
                    <input
                        data-testid="submit"
                        type="submit"
                        value="add note"
                    />
                </form>
            </>
        </Modal>
    );
};

export { AddNoteModal };
