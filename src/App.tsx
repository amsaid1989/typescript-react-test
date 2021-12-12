import { useRef, useState } from "react";
import "./App.css";
import CompTodoList from "./CompTodoList";
import { Todo, TodoList } from "./interfaces";

function App() {
    const [text, setText] = useState("");
    const [todos, setTodos] = useState<TodoList | null>(null);

    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (buttonRef && buttonRef.current) {
            buttonRef.current.disabled = text.length === 0;
        }

        setText(e.target.value);
    };

    const addTodo: React.MouseEventHandler<HTMLButtonElement> = () => {
        const num = todos ? todos.length + 1 : 0;

        const todo: Todo = {
            id: `${num}-${text}`,
            text: text,
            completed: false,
        };

        const todoList: TodoList = todos ? [...todos, todo] : [todo];

        setTodos(todoList);

        setText("");
    };

    const deleteTodo = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const id = (e.target as HTMLButtonElement).id;

        if (todos) {
            const todoList: TodoList = [...todos].filter(
                (todo) => todo.id !== id
            );

            setTodos(todoList);
        }
    };

    const toggleTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const id = (e.target as HTMLInputElement).id;

        if (todos) {
            const todoList: TodoList = [...todos].map((todo) => {
                if (todo.id === id) {
                    todo.completed = e.target.checked;

                    return todo;
                }

                return todo;
            });

            setTodos(todoList);
        }
    };

    return (
        <main className="App">
            <section id="todo-add">
                <input
                    id="todo-text"
                    value={text}
                    onChange={handleTextChange}
                />
                <button
                    ref={buttonRef}
                    onClick={addTodo}
                    disabled={text.length === 0}
                >
                    Add todo
                </button>
            </section>

            {todos && (
                <CompTodoList
                    todos={todos}
                    changeHandler={toggleTodo}
                    deleteHandler={deleteTodo}
                />
            )}
        </main>
    );
}

export default App;
