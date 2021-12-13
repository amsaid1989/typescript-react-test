import "./CompTodo.css";
import { Todo } from "./interfaces";

type CompTodoProps = {
    todo: Todo;
    changeHandler: React.ChangeEventHandler<HTMLInputElement>;
    deleteHandler: React.MouseEventHandler<HTMLButtonElement>;
};

function CompTodo(props: CompTodoProps): JSX.Element {
    return (
        <div className="todo-item">
            <input
                id={props.todo.id}
                type="checkbox"
                checked={props.todo.completed}
                onChange={props.changeHandler}
                data-testid={`checkbox-${props.todo.id}`}
            />
            <span>{props.todo.text}</span>
            <button id={props.todo.id} onClick={props.deleteHandler}>
                Delete
            </button>
        </div>
    );
}

export default CompTodo;
