import { screen, render, fireEvent } from "@testing-library/react";
import { AddNoteModal } from "./AddNoteModal";

describe("AddNotesModal", () => {
    it("refetches notes and closes modal when successful", async () => {
        const getNotes = jest.fn();
        const setShowModal = jest.fn();

        render(
            <AddNoteModal
                showModal={true}
                setShowModal={setShowModal}
                getNotes={getNotes}
            />
        );

        const okButton = screen.getByRole("button", { name: /ok/i });

        fireEvent.click(okButton);

        expect(getNotes).toHaveBeenCalledTimes(1);
        expect(setShowModal).toHaveBeenCalledTimes(1);
    });
});
