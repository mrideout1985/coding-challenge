import { screen, render, fireEvent } from "@testing-library/react";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { Notes } from "./Notes";

const server = setupServer(
    rest.get("api/notes", (_, res, ctx) => {
        return res(
            ctx.json([
                {
                    id: 30,
                    createdAt: "2021-07-17T18:04:38.040Z",
                    user: "Hoyt Braun",
                    note: "Sit iusto odit ero.",
                },
            ])
        );
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Notes", () => {
    it("notes from past 6 months displayed by default", async () => {
        render(<Notes />);

        const listItems = await screen.findAllByRole("listitem");
        const note = screen.getByText(/Sit iusto odit/i);
        const toggleSwitch = screen.getByRole("switch");

        expect(listItems).toHaveLength(1);
        expect(note).toBeInTheDocument();
        expect(toggleSwitch).toHaveAttribute("aria-checked", "false");
    });

    it("can click switch to toggle notes", () => {
        render(<Notes />);

        const toggleSwitch = screen.getByRole("switch");

        fireEvent.click(toggleSwitch);

        expect(toggleSwitch).toHaveAttribute("aria-checked", "true");
    });

    it("opens modal when add note button is clicked", async () => {
        render(<Notes />);

        const addNoteButton = screen.getByRole("button", { name: /add note/i });

        fireEvent.click(addNoteButton);

        const addNoteModal = await screen.findByRole("dialog");

        expect(addNoteModal).toBeInTheDocument();
    });
});
