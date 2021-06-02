import React, {useState, useContext} from 'react';
import './AuthPage.scss'
import {BrowserRouter, Switch, Route, Link, useHistory} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext'
import Axios from '../utils'

function AuthPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()
    const { login } = useContext(AuthContext)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await Axios.post('/auth/registration', {email: email, password: password})
            history.push('/')
        } catch (err) {
            if(err) {
                setEmail('')
                setPassword('')
                alert('Неккоректные данные при регистрации.\nМинимальная длина пароля: 6')
                console.log('error>>', err);
            }
        }
    }

    const handleLogin = async () => {
        try {
            await Axios.post('/auth/login', {email: email, password: password})
            .then(res => login(res.data.token, res.data.userId))
        } catch (err) {
            setEmail('')
            setPassword('')
            alert('Неккоректные данные, попробуйте еще раз!')
            console.log(err);
        }
    }

    return(
        <BrowserRouter>
            <Switch>
                <>
                    <div className="container">
                        <div className="auth-page">
                            <Route path="/login">
                                <h3>Авторизация</h3>
                                <form 
                                    onSubmit={(e) => e.preventDefault()} 
                                    className="form form-login"
                                    >
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                type="text" 
                                                name="email" 
                                                className="validate"
                                            />
                                            <label htmlFor="email">Email</label>
                                        </div>
                                        <div className="input-field col s12">
                                            <input
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                autoComplete="on"
                                                type="password" 
                                                name="password"
                                                className="validate"
                                            />
                                            <label htmlFor="password">Password</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <button 
                                            onClick={handleLogin} 
                                            className="wawes-effect wawes-light btn blue"
                                        >
                                            Войти
                                        </button>
                                        <Link 
                                            className="btn-outline btn-reg" 
                                            to="/registration"
                                        >
                                            Нет аккаунта? Регистрация
                                        </Link>
                                    </div>
                                </form>
                            </Route>
                        
                            <Route path="/registration">
                                <h3>Регистрация</h3>
                                <form 
                                    onSubmit={handleSubmit} 
                                    className="form form-login"
                                >
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input 
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                type="text" 
                                                name="email" 
                                                className="validate"
                                            />
                                            <label htmlFor="email">Email</label>
                                        </div>
                                        <div className="input-field col s12">
                                            <input
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                autoComplete="on"
                                                type="password" 
                                                name="password" 
                                                className="validate"
                                            />
                                            <label htmlFor="password">Password</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <button className="wawes-effect wawes-light btn blue">
                                            Регистрация
                                        </button>
                                        <Link 
                                            className="btn-outline btn-reg" 
                                            to="/login"
                                        >
                                            Уже есть аккаунт? Войти
                                        </Link>
                                    </div>
                                </form>
                            </Route>
                        
                        </div>
                    </div>
                </>
            </Switch>
        </BrowserRouter>
    
    )
}

export default AuthPage;