import { render, screen, fireEvent } from "@testing-library/react";
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
