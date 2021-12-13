import CompTodo from "./CompTodo";
import { Todo } from "./interfaces";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";

const todo: Todo = {
    id: "1",
    text: "Hello world",
    completed: false,
};

const changeHandler = jest.fn();
const deleteHandler = jest.fn();

beforeEach(() => {
    render(
        <CompTodo
            todo={todo}
            changeHandler={changeHandler}
            deleteHandler={deleteHandler}
        />
    );
});

afterEach(cleanup);

it("Renders successfully without crashing", () => {
    const checkbox = screen.getByTestId(`checkbox-${todo.id}`);
    const todoText = screen.getByText(todo.text);
    const deleteButton = screen.getByText("Delete");

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
    expect(todoText).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
});

it("Calls the changeHandler when the checkbox state is changed", () => {
    const checkbox = screen.getByTestId(`checkbox-${todo.id}`);

    fireEvent.click(checkbox);

    expect(changeHandler).toHaveBeenCalledTimes(1);

    for (let i = 0; i < 5; i++) {
        fireEvent.click(checkbox);
    }

    expect(changeHandler).toHaveBeenCalledTimes(6);
});

it("Calls the deleteHandler when the delete button is clicked", () => {
    const deleteButton = screen.getByText("Delete");

    fireEvent.click(deleteButton);

    expect(deleteHandler).toHaveBeenCalledTimes(1);

    for (let i = 0; i < 5; i++) {
        fireEvent.click(deleteButton);
    }

    expect(deleteHandler).toHaveBeenCalledTimes(6);
});
