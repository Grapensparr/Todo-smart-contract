const { assert } = require("chai");

const TodoList = artifacts.require("./TodoList.sol");

contract("TodoList", (accounts) => {
  before(async () => {
    this.todoList = await TodoList.deployed();
  });

  it("deploys successfully", async () => {
    const address = await this.todoList.address;
    assert.notEqual(address, 0x0);
    assert.notEqual(address, "");
    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
  });

  it("lists tasks", async () => {
    const todoCount = await this.todoList.todoCount();
    const todo = await this.todoList.todos(todoCount);
    assert.equal(todo.id.toNumber(), todoCount.toNumber());
    assert.equal(todo.text, "Hello world");
    assert.equal(todo.completed, false);
    assert.equal(todoCount.toNumber(), 1);
  });

  it("emits an event when creating todo", async () => {
    let result = await this.todoList.createTodo("Testing stuff out");

    const taskCount = await this.todoList.todoCount();
    assert.equal(taskCount, 2);
    const event = result.logs[0].args;
    assert.equal(event.id.toNumber(), 2);
    assert.equal(event.text, "Testing stuff out");
    assert.equal(event.completed, false);
  });

  it("emits an event when toggling todo", async () => {
    const result = await this.todoList.toggleTodo(1);
    const todo = await this.todoList.todos(1);
    assert.equal(todo.completed, true);
    const event = result.logs[0].args;
    assert.equal(event.id.toNumber(), 1);
    assert.equal(event.completed, true);
  });

  it("emits an event when removing todo", async () => {
    const result = await this.todoList.removeTodo(2);

    const taskCount = await this.todoList.todoCount();
    assert.equal(taskCount, 2);

    const todo = await this.todoList.todos(2);
    assert.equal(todo.id, 0);
    assert.equal(todo.text, "");

    const event = result.logs[0].args;
    assert.equal(event.id.toNumber(), 2);
  });
});
