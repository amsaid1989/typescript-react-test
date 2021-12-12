import "./CompTodoList.css";
import CompTodo from "./CompTodo";
import { TodoList } from "./interfaces";

type CompTodoListProps = {
    todos: TodoList;
    changeHandler: React.ChangeEventHandler<HTMLInputElement>;
    deleteHandler: React.MouseEventHandler<HTMLButtonElement>;
};

function CompTodoList(props: CompTodoListProps): JSX.Element {
    return (
        <section>
            <ul className="todo-list">
                {props.todos.map((todo, index) => {
                    return (
                        <CompTodo
                            key={todo.id}
                            todo={todo}
                            changeHandler={props.changeHandler}
                            deleteHandler={props.deleteHandler}
                        />
                    );
                })}
            </ul>
        </section>
    );
}

export default CompTodoList;
