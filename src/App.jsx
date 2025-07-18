import { useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
    const [todos, setTodos] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [todoToEdit, setTodoToEdit] = useState(null);

    const handleAdd = () => {
        setTodoToEdit(null);
        setShowForm(true);
    };

    const handleEdit = (todo) => {
        setTodoToEdit(todo);
        setShowForm(true);
    };

    const handleSave = (todo) => {
        if (todoToEdit) {
            setTodos(todos.map(t => t.id === todo.id ? todo : t));
        } else {
            setTodos([...todos, { ...todo, id: Date.now() }]);
        }
        setShowForm(false);
        setTodoToEdit(null);
    };

    const removeTodo = (index) => {
        setTodos(todos.filter((_, i) => i !== index));
    };

    const handleClose = () => {
        setShowForm(false);
        setTodoToEdit(null);
    };

    return (
        <div className="bg-light p-4 d-flex flex-column align-items-center w-100 min-vh-100">
            <h1>Sistema Tasys</h1>
            <div className='container mb-2'>
              <div className='w-100 d-flex justify-content-start'>
                <button className="btn btn-success mb-3" onClick={handleAdd}>
                    + Crear Nueva Tarea
                </button>
              </div>
            </div>
            <TodoForm
                show={showForm}
                handleClose={handleClose}
                handleSave={handleSave}
                todoToEdit={todoToEdit}
            />
            <TodoList
                todos={todos}
                removeTodo={removeTodo}
                handleEdit={handleEdit}
            />
        </div>
    );
};

export default App;