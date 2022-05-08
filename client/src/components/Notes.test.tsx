import { screen, render } from "@testing-library/react";
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
    it("renders notes", async () => {
        render(<Notes />);

        const listItems = await screen.findAllByRole("listitem");
        const note = screen.getByText(/Sit iusto odit/i);

        expect(listItems).toHaveLength(1);
        expect(note).toBeInTheDocument();
    });
});
