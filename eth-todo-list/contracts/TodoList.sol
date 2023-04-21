// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract TodoList {
    uint256 public todoCount = 0;

    struct Todo {
        uint256 id;
        string text;
        bool completed;
    }

    mapping(uint256 => Todo) public todos;

    event TodoCreated(uint256 id, string text, bool completed);

    event ToggleTodo(uint256 id, bool completed);

    event RemovedTodo(uint256 id);

    function createTodo(string memory _content) public {
        todoCount++;
        todos[todoCount] = Todo(todoCount, _content, false);
        emit TodoCreated(todoCount, _content, false);
    }

    function toggleTodo(uint256 _id) public {
        Todo memory t = todos[_id];
        t.completed = !t.completed;
        todos[_id] = t;
        emit ToggleTodo(_id, t.completed);
    }

    function removeTodo(uint256 _id) public {
        delete todos[_id];
        emit RemovedTodo(_id);
    }

    constructor() public {
        createTodo("Hello world");
    }
}
