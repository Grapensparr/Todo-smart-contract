export function PrintTodoList({ todos, updateTodoState, deleteTodo }) {
    return (
        <ul className="todoList">
            {todos.map((todo) => (
                <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                    <span className="todoDescription">{todo.text}</span>
                    <button
                        className={`completeBtn ${todo.completed ? 'done' : 'open'}`}
                        onClick={() => updateTodoState(todo.id)}
                    >
                        {todo.completed ? 'Reopen' : 'Task completed'}
                    </button>
                    <button 
                        className="deleteBtn" 
                        onClick={() => deleteTodo(todo.id)}
                    >
                        X
                    </button>
                </li>
            ))}
        </ul>
    );
}