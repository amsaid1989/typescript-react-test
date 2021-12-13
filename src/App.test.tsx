import App from "./App";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";

beforeEach(() => {
    render(<App />);
});

afterEach(cleanup);

it("Renders correctly without crashing", () => {
    const todoInput = screen.getByTestId("todo-input");
    const addButton = screen.getByText("Add todo");

    expect(todoInput).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
    expect(addButton).toBeDisabled();
});

it("Enables the Add button when the user inputs any text in the todo input", () => {
    const todoInput = screen.getByTestId("todo-input");
    const addButton = screen.getByText("Add todo");

    fireEvent.input(todoInput, { target: { value: "Hello world" } });

    expect(todoInput).toHaveValue("Hello world");
    expect(addButton).not.toBeDisabled();
});

it("Adds a todo with the specified text when the user clicks the Add button", () => {
    const todoInput = screen.getByTestId("todo-input");
    const addButton = screen.getByText("Add todo");

    fireEvent.input(todoInput, { target: { value: "Hello world" } });
    fireEvent.click(addButton);

    const checkbox = document.querySelector(
        "input[type='checkbox']"
    ) as HTMLInputElement;
    const todoText = screen.getByText("Hello world");
    const deleteButton = screen.getByText("Delete");

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
    expect(todoText).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
});

it("Resets the todo input and the Add button once a todo is added", () => {
    const todoInput = screen.getByTestId("todo-input");
    const addButton = screen.getByText("Add todo");

    fireEvent.input(todoInput, { target: { value: "Hello world" } });
    fireEvent.click(addButton);

    expect(todoInput).toHaveValue("");
    expect(addButton).toBeDisabled();
});

it("Checks the todo checkbox when the user clicks it and unchecks it when user clicks again", () => {
    const todoInput = screen.getByTestId("todo-input");
    const addButton = screen.getByText("Add todo");

    fireEvent.input(todoInput, { target: { value: "Hello world" } });
    fireEvent.click(addButton);

    const checkbox = document.querySelector(
        "input[type='checkbox']"
    ) as HTMLInputElement;

    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);

    expect(checkbox).not.toBeChecked();
});

it("Deletes a todo when the user clicks the Delete button", () => {
    const todoInput = screen.getByTestId("todo-input");
    const addButton = screen.getByText("Add todo");

    fireEvent.input(todoInput, { target: { value: "Hello world" } });
    fireEvent.click(addButton);

    const checkbox = document.querySelector(
        "input[type='checkbox']"
    ) as HTMLInputElement;
    const todoText = screen.getByText("Hello world");
    const deleteButton = screen.getByText("Delete");

    fireEvent.click(deleteButton);

    expect(checkbox).not.toBeInTheDocument();
    expect(todoText).not.toBeInTheDocument();
    expect(deleteButton).not.toBeInTheDocument();
});
