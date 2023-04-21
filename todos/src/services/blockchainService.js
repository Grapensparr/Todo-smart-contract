import Web3 from 'web3';
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from '../config';
import { useState } from 'react';

const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
const todoContract = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS);

export function Blockchain() {
    const [account, setAccount] = useState();

    async function getAccount() {
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
    }

    async function getBlockchainLength() {
        const blockchainLength = await web3.eth.getBlockNumber();
        return blockchainLength;
    }

    async function fetchTodos() {
        const todos = [];
        const count = await todoContract.methods.todoCount().call();
        for (let i = 1; i <= count; i++) {
            const todo = await todoContract.methods.todos(i).call();
            if (todo.text !== '') {
                todos.push(todo);
            }
        }
        return todos;
    }

    async function addTodoContract(todoDescription, account) {
        await todoContract.methods.createTodo(todoDescription).send({ from: account });
        return fetchTodos();
    }

    async function toggleTodoContract(id, account) {
        await todoContract.methods.toggleTodo(id).send({ from: account });
        return fetchTodos();
    }

    async function removeTodoContract(id, account) {
        await todoContract.methods.removeTodo(id).send({ from: account });
        return fetchTodos();
    }

    return { account, getAccount, getBlockchainLength, fetchTodos, addTodoContract, toggleTodoContract, removeTodoContract };
}