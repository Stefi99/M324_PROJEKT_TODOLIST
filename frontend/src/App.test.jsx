import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  test("renders heading", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { name: /ToDo Liste/i }),
    ).toBeInTheDocument();
  });

  test("allows user to write a new task before submitting", () => {
    render(<App />);

    const inputElement = screen.getByLabelText(/Neues Todo anlegen/i);

    fireEvent.change(inputElement, { target: { value: "Buy groceries" } });

    expect(inputElement.value).toBe("Buy groceries");
  });

  test("input field is empty at start", () => {
    render(<App />);
    const inputElement = screen.getByLabelText(/Neues Todo anlegen/i);
    expect(inputElement.value).toBe("");
  });

  test("allows user to type into input field", () => {
    render(<App />);
    const inputElement = screen.getByLabelText(/Neues Todo anlegen/i);

    fireEvent.change(inputElement, { target: { value: "Test Aufgabe" } });

    expect(inputElement.value).toBe("Test Aufgabe");
  });
});
describe("Systemtests Todo App", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("fügt ein neues Todo hinzu, wenn der Benutzer Text eingibt und auf Absenden klickt", async () => {
    fetch
      .mockResolvedValueOnce({
        json: () => Promise.resolve([]),
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve({}),
      })
      .mockResolvedValueOnce({
        json: () =>
          Promise.resolve([
            {
              taskdescription: "Mathe lernen",
              priority: "Mittel",
              completed: false,
            },
          ]),
      });

    render(<App />);

    const inputElement = screen.getByLabelText(/Neues Todo anlegen/i);

    fireEvent.change(inputElement, {
      target: { value: "Mathe lernen" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Absenden/i }));

    await waitFor(() => {
      expect(screen.getByText(/Mathe lernen/i)).toBeInTheDocument();
    });
  });

  test("setzt ein Todo auf erledigt, wenn der Benutzer auf Erledigt klickt", async () => {
    fetch
      .mockResolvedValueOnce({
        json: () =>
          Promise.resolve([
            {
              taskdescription: "Mathe lernen",
              priority: "Mittel",
              completed: false,
            },
          ]),
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve({}),
      })
      .mockResolvedValueOnce({
        json: () =>
          Promise.resolve([
            {
              taskdescription: "Mathe lernen",
              priority: "Mittel",
              completed: true,
            },
          ]),
      });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/Mathe lernen/i)).toBeInTheDocument();
    });

    const erledigtButtons = screen.getAllByRole("button", {
      name: /Erledigt/i,
    });
    fireEvent.click(erledigtButtons[1]);
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:8080/api/v1/done",
        expect.objectContaining({
          method: "POST",
        }),
      );
    });
  });
});
