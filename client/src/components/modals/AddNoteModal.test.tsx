import { screen, render, fireEvent, act } from "@testing-library/react";

import { AddNoteModal } from "./AddNoteModal";

const onSubmit = jest.fn();
const setShowModal = jest.fn();

describe("AddNotesModal", () => {
    it("adds note, refetches notes and closes modal when successful", async () => {
        render(
            <AddNoteModal
                showModal={true}
                setShowModal={setShowModal}
                getNotes={onSubmit}
            />
        );

        const input = await screen.findByRole("textbox");
        const form = await screen.findByTestId("form");

        expect(form).toBeInTheDocument();
        expect(input).toBeInTheDocument();

        await act(async () => {
            fireEvent.change(input, { target: { value: "test" } });
        });

        expect(input).toHaveValue("test");

        await act(async () => {
            fireEvent.submit(form);
        });

        expect(onSubmit).toBeCalled();
        expect(setShowModal).toHaveBeenCalledTimes(1);
    });

    it("throws error when note is required", async () => {
        render(
            <AddNoteModal
                showModal={true}
                setShowModal={setShowModal}
                getNotes={onSubmit}
            />
        );

        const inputElement = screen.getByRole("textbox");
        const errorsElement = screen.getByTestId("errors");
        const form = screen.getByTestId("form");
        await act(async () => {
            fireEvent.change(inputElement, { target: { value: "" } });
            fireEvent.submit(form);
        });

        expect(errorsElement.innerHTML).toMatch("Note is required");
    });

    it("throws error when note exceeds 500 characters", async () => {
        render(
            <AddNoteModal
                showModal={true}
                setShowModal={setShowModal}
                getNotes={onSubmit}
            />
        );

        const text = "t";
        const longText = text.repeat(501);
        const inputElement = screen.getByRole("textbox");
        const form = screen.getByTestId("form");
        const errorsElement = screen.getByTestId("errors");

        await act(async () => {
            fireEvent.change(inputElement, { target: { value: longText } });
            fireEvent.submit(form);
        });

        expect(errorsElement.innerHTML).toMatch(
            "Cannot be more than 500 characters"
        );
    });
});
