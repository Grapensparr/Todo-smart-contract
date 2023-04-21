import { useState } from 'react';

export function AddTodo({ addTodo, todos }) {
    const [newTodo, setNewTodo] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    function handleAddTodo() {
        if (!newTodo.trim()) {
            setErrorMessage('Please enter a valid task');
            setNewTodo('');
            return;
        } else if (todos.some(todo => todo[1] === newTodo)) {
            setErrorMessage('This task already exists');
            return;
        } else {
            addTodo(newTodo);
            setNewTodo('');
            setErrorMessage('');
        }
    }

    return (
        <div className='addTodo'>
            <input
                type='text'
                placeholder='Add a new task'
                value={newTodo}
                onChange={(event) => setNewTodo(event.target.value)}
            />
            <button onClick={handleAddTodo} className='addBtn'>Add</button>
            {errorMessage && <h3 className='errorMessage'>{errorMessage}</h3>}
        </div>
    );
}