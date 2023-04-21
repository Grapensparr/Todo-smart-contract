import { useState, useEffect, useMemo } from 'react';
import { AddTodo } from './AddTodo';
import { PrintTodoList } from './PrintTodoList';
import { Blockchain } from '../services/blockchainService';

export function HandleTodoList() {
    const {account, getAccount, getBlockchainLength, fetchTodos, addTodoContract, toggleTodoContract, removeTodoContract} = Blockchain();
    const [todos, setTodos] = useState([]);
    const [blockchainLength, setBlockchainLength] = useState();
    const [sortOrder, setSortOrder] = useState('open');

    useEffect(() => {
        async function init() {
            await getAccount();
            const todos = await fetchTodos();
            setTodos(todos);
            const blockchainLength = await getBlockchainLength();
            setBlockchainLength(blockchainLength);
        }

        init();
    }, [getAccount]);

    async function addTodo(todoDescription) {
        const updatedTodos = await addTodoContract(todoDescription, account);
        setTodos(updatedTodos);
    };

    async function updateTodoState(id) {
        const updatedTodos = await toggleTodoContract(id, account);
        setTodos(updatedTodos);
    };

    async function deleteTodo(id) {
        const updatedTodos = await removeTodoContract(id, account);
        setTodos(updatedTodos);
    };

    const sortedTodos = useMemo(() => {
        const sorted = [...todos].sort((a, b) => {
            if (a.completed === b.completed) {
                return a.text.localeCompare(b.text);
            }
            return a.completed ? 1 : -1;
        });

        return sortOrder === 'open'
            ? sorted.filter((todo) => !todo.completed).concat(sorted.filter((todo) => todo.completed))
            : sorted.filter((todo) => todo.completed).concat(sorted.filter((todo) => !todo.completed));
    }, [todos, sortOrder]);

    function toggleSortOrder() {
        setSortOrder(sortOrder === 'open' ? 'completed' : 'open');
    };

    return (
        <div>
            <h3 className='totalBlocks'>
                - Total number of blocks: {blockchainLength} -
            </h3>
            <AddTodo addTodo={addTodo} todos={todos}/>
            <p className='sorting'>
                Change sorting to: 
                <button 
                    onClick={toggleSortOrder} 
                    className='sortBtn'
                >
                    {sortOrder === 'open' ? 'Completed' : 'Open'} first
                </button>
            </p>
            <PrintTodoList
                todos={sortedTodos}
                updateTodoState={updateTodoState}
                deleteTodo={deleteTodo}
            />
        </div>
    );
}