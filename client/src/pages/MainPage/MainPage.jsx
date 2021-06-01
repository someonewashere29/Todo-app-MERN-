import React, {useState, useContext, useCallback, useEffect} from 'react';
import './MainPage.scss'
import axios from 'axios';
import {AuthContext} from '../../context/AuthContext'

function MainPage() {
    const [value, setValue] = useState('');
    const {userId} = useContext(AuthContext)
    const [todos, setTodos] = useState([]);

    const getTodo = useCallback(async () => {
        try {
            await axios.get('/api/todo', {
                headers: {
                    'Content-Type': 'application/json'
                },
                //Принимаем на бэке через req.query
                params: {userId}
            })
            .then(res => setTodos(res.data))
        } catch (err) {
            console.log(err);
        }
    }, [userId])

    const createTodo = useCallback(async () => {
        if(!value) return null || alert('Поле не должно быть пустым')
        try {
            await axios.post('/api/todo/add', {value, userId}, {
                headers: {
                    'Content-Type':'application/json',
                }
            })
            .then(res => {
                setTodos([...todos], res.data)
                setValue('')
                getTodo()
            })
        } catch(err) {
            console.log(err);
        }
    }, [value, userId, todos, getTodo])

    const removeTodo = useCallback(async (id) => {
        try {
            await axios.delete(`/api/todo/delete/${id}`, {id}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(() => getTodo())
        } catch (err) {
            console.log(err);
        }
    }, [getTodo])

    const importantTodo = useCallback(async (id) => {
        try {
            await axios.put(`/api/todo/important/${id}`, {id}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                setTodos([...todos], res.data)
                getTodo()
            })
        } catch (err) {
            console.log(err);
        }
    }, [todos, getTodo])

    const completedTodo = useCallback(async (id) => {
        try {
            await axios.put(`/api/todo/completed/${id}`, {id}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                setTodos([...todos], res.data)
                getTodo()
            })
        } catch (err) {
            console.log(err);
        }
    }, [todos, getTodo])

    useEffect(() => {
        getTodo()
    }, [getTodo])

    return(
        <div className="container">
            <div className="main-page">
                <h4>Добавить задачу</h4>
                <form onSubmit={(e) => e.preventDefault()} className="form form-login">
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                value={value}
                                onChange={e => setValue(e.target.value)}
                                type="text"
                                id="text"
                                className="validate" 
                                name="input"
                            />
                            <label htmlFor="input">Задача:</label>
                        </div>
                    </div>
                    <div className="row">
                        <button onClick={createTodo} className="waves-effect waves-light btn blue">Добавить</button>
                    </div>
                </form>
                <h3>Активные задачи:</h3>
                <div className="todos">
                    {
                        todos.map((todo, index) => {
                            let classess = ['row flex todos-item']
                            if(todo.completed) {
                                classess.push('completed')
                            }

                            if(todo.important) {
                                classess.push('important')
                            }
                            return(
                                <div className={classess.join(' ')} key={index}>
                                    <div className="col todos-num">{index + 1}</div>
                                    <div className="col todos-text">{todo.value}</div>
                                    <div className="todos-buttons col">
                                        <i className="material-icons blue-text" onClick={() => completedTodo(todo._id)}>check</i>
                                        <i className="material-icons orange-text" onClick={() => importantTodo(todo._id)}>warning</i>
                                        <i onClick={() => removeTodo(todo._id)} className="material-icons red-text">delete</i>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            
        </div>
    )
}

export default MainPage;