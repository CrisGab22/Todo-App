import { useState } from 'react';
import TodoCard from './TodoCard.jsx';
import { ESTADOS, TIPO_ACTIVIDAD, PRIORIDADES } from '../helpers/todoHelpers';

const TodoList = ({ todos, removeTodo, handleEdit }) => {
    const [filtroEstado, setFiltroEstado] = useState('');
    const [filtroTipoActividad, setFiltroTipoActividad] = useState('');
    const [filtroPrioridad, setFiltroPrioridad] = useState('');
    const [filtroFechaLimite, setFiltroFechaLimite] = useState('');
    const [vista, setVista] = useState('tarjeta'); // 'tarjeta' o 'tabla'

    const todosFiltrados = todos.filter(todo => {
        const matchEstado = filtroEstado ? todo.estado === filtroEstado : true;
        const matchTipo = filtroTipoActividad ? todo.tipoActividad === filtroTipoActividad : true;
        const matchPrioridad = filtroPrioridad ? todo.prioridad === filtroPrioridad : true;
        const matchFecha = filtroFechaLimite ? todo.fechaLimite === filtroFechaLimite : true;
        return matchEstado && matchTipo && matchPrioridad && matchFecha;
    });

    return (
        <div className='container mt-4'>
            <div className="d-flex flex-wrap gap-2 mb-4 justify-content-center">
                <select
                    className="form-select"
                    style={{ maxWidth: 180 }}
                    value={filtroEstado}
                    onChange={e => setFiltroEstado(e.target.value)}
                >
                    <option value="">Todos los estados</option>
                    {Object.keys(ESTADOS).map(e => (
                        <option key={e} value={e}>
                            {ESTADOS[e].icon} {ESTADOS[e].nombre}
                        </option>
                    ))}
                </select>
                <select
                    className="form-select"
                    style={{ maxWidth: 200 }}
                    value={filtroTipoActividad}
                    onChange={e => setFiltroTipoActividad(e.target.value)}
                >
                    <option value="">Todas las actividades</option>
                    {Object.keys(TIPO_ACTIVIDAD).map(t => (
                        <option key={t} value={t}>
                            {TIPO_ACTIVIDAD[t].icon} {TIPO_ACTIVIDAD[t].nombre}
                        </option>
                    ))}
                </select>
                <select
                    className="form-select"
                    style={{ maxWidth: 200 }}
                    value={filtroPrioridad}
                    onChange={e => setFiltroPrioridad(e.target.value)}
                >
                    <option value="">Todas las prioridades</option>
                    {PRIORIDADES.map(p => (
                        <option key={p} value={p}>{p}</option>
                    ))}
                </select>
                <input
                    type="date"
                    className="form-control"
                    style={{ maxWidth: 170 }}
                    value={filtroFechaLimite}
                    onChange={e => setFiltroFechaLimite(e.target.value)}
                    placeholder="Fecha límite"
                />
                {(filtroEstado || filtroTipoActividad || filtroPrioridad || filtroFechaLimite) && (
                    <button
                        className="btn btn-danger"
                        onClick={() => {
                            setFiltroEstado('');
                            setFiltroTipoActividad('');
                            setFiltroPrioridad('');
                            setFiltroFechaLimite('');
                        }}
                    >
                        Limpiar
                    </button>
                )}
                <div className="ms-auto">
                    <div className="btn-group btn-group-sm mb-3" role="group" aria-label="Selector de vista">
                    <button
                        type="button"
                        className={`btn ${vista === 'tarjeta' ? 'btn-primary active' : 'btn-outline-primary'}`}
                        onClick={() => setVista('tarjeta')}
                        title="Vista Tarjeta"
                    >
                        🗂️ Tarjetas
                    </button>
                    <button
                        type="button"
                        className={`btn ${vista === 'tabla' ? 'btn-primary active' : 'btn-outline-primary'}`}
                        onClick={() => setVista('tabla')}
                        title="Vista Tabla"
                    >
                        📋 Tabla
                    </button>
                    </div>
                </div>
            </div>
            {vista === 'tarjeta' ? (
                <div>
                    {todosFiltrados.length === 0 && <div className="text-center text-muted">No hay tareas para mostrar.</div>}
                    {todosFiltrados.map((todo, index) => (
                        <TodoCard 
                            key={todo.id} 
                            todo={todo}
                            onEdit={() => handleEdit(todo)}
                            onDelete={() => removeTodo(index)}
                        />
                    ))}
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-bordered align-middle">
                        <thead className="table-light">
                            <tr>
                                <th>Estado</th>
                                <th>Tipo Actividad</th>
                                <th>Título</th>
                                <th>Descripción</th>
                                <th>Prioridad</th>
                                <th>Fecha Límite</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todosFiltrados.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="text-center text-muted">No hay tareas para mostrar.</td>
                                </tr>
                            )}
                            {todosFiltrados.map((todo, index) => (
                                <tr key={todo.id}>
                                    <td>
                                        <span style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            padding: '2px 8px',
                                            borderRadius: 8,
                                            fontWeight: 600,
                                            fontSize: 13,
                                            color: ESTADOS[todo.estado]?.color,
                                            background: ESTADOS[todo.estado]?.background
                                        }}>
                                            <span style={{ marginRight: 6 }}>{ESTADOS[todo.estado]?.icon}</span>
                                            {ESTADOS[todo.estado]?.nombre}
                                        </span>
                                    </td>
                                    <td>
                                        <span style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            fontSize: 13,
                                            color: '#555',
                                            background: '#f3f4f6',
                                            borderRadius: 8,
                                            padding: '2px 8px'
                                        }}>
                                            <span style={{ marginRight: 6 }}>{TIPO_ACTIVIDAD[todo.tipoActividad]?.icon}</span>
                                            {TIPO_ACTIVIDAD[todo.tipoActividad]?.nombre}
                                        </span>
                                    </td>
                                    <td>{todo.titulo}</td>
                                    <td>{todo.descripcion}</td>
                                    <td>{todo.prioridad}</td>
                                    <td>{todo.fechaLimite}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-outline-primary me-2"
                                            onClick={() => handleEdit(todo)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => removeTodo(index)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default TodoList;