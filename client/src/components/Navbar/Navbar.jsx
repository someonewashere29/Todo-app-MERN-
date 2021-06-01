import React, {useContext} from 'react';
import { AuthContext } from '../../context/AuthContext';
import './Navbar.scss'


function Navbar() {
    const { logout, isLogin } = useContext(AuthContext)

    return(
        <nav>
            <div className="nav-wrapper navbar blue">
                <a 
                    href="/" 
                    className="brand-logo"
                >
                    MERN TODO
                </a>
                {
                    isLogin ?
                    <ul 
                        id="nav-mobile" 
                        className="right hide-on-med-and-down"
                    >
                        <li><a href="/login" onClick={logout}>Выйти</a></li>
                    </ul>
                    :
                    <ul 
                        id="nav-mobile" 
                        className="right hide-on-med-and-down"
                    >
                        <li><a href="/login">Войти</a></li>
                    </ul>
                }
            </div>
        </nav>
            
    )
}

export default Navbar;