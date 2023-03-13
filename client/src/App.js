import React, { useState, useEffect } from 'react'

// CRUD todo component at localhost:8080/api
export default function Todo() {
    const [todos, setTodos] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentTodo, setCurrentTodo] = useState();
    const [updatedTodo, setUpdatedTodo] = useState();

    // useEffect is used to run side effects in React
    // In this case, we want to get our todos from the server when the component mounts
    useEffect(() => {
        getTodos();
    }, []);

    // Function to get the todos from server
    const getTodos = async () => {
        const res = await fetch('http://localhost:8080/api/todos');
        const data = await res.json();
        console.log(data);
        setTodos(data);
    };

    // Function to delete a todo
    const deleteTodo = async (id) => {
        await fetch(`http://localhost:8080/api/todos/${id}`, {
            method: 'DELETE',
        });
        // Get all the todos after deleting one
        getTodos();
    };

    // Function to update a todo
    const updateTodo = async (id) => {
        await fetch(`http://localhost:8080/api/todos/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ todo: updatedTodo }),
        });
        // Get all the todos after updating one
        getTodos();
        // Set isEditing state to false
        setIsEditing(false);
    };

    // Function to create a todos
    const createTodo = async (e) => {
        e.preventDefault();
        await fetch('http://localhost:8080/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ todo: currentTodo }),
        });
        // Get all the todos after creating one
        getTodos();
    };

    // Function to toggle todos PATCH - /api/todos/:id/toggle
    const toggleTodo = async (id) => {
        await fetch(`http://localhost:8080/api/todos/${id}/toggle`, {
            method: 'PATCH',
        });
        // Get all the todos after updating one
        getTodos();
    };

    return (
        <div>
            <h2>Todo List</h2>
            <form onSubmit={createTodo}>
                <input
                    type="text"
                    value={currentTodo}
                    onChange={(e) => setCurrentTodo(e.target.value)}
                />
                <button>Create</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Completed</th>
                        <th>Edit/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo) => (
                        <tr key={todo.id}>
                            <td>{todo.todo}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    onChange={() => toggleTodo(todo.id)}
                                    checked={todo.completed}
                                />
                            </td>
                            <td>
                                {isEditing && todo.id === currentTodo.id ? (
                                    <form
                                        onSubmit={(e) => {
                                            updateTodo(todo.id);
                                        }}
                                    >
                                        <input
                                            type="text"
                                            value={updatedTodo}
                                            onChange={(e) =>
                                                setUpdatedTodo(e.target.value)
                                            }
                                        />
                                        <button>Update</button>
                                    </form>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => {
                                                setIsEditing(true);
                                                setCurrentTodo(todo);
                                                setUpdatedTodo(todo.todo);
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteTodo(todo.id)}
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}