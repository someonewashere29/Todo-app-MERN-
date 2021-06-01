import './App.scss';
import Navbar from './components/Navbar/Navbar'
import {BrowserRouter} from 'react-router-dom';
import { useRoutes } from './routes';
import {AuthContext} from './context/AuthContext';
import {useAuth} from './hooks/auth.hook';

function App() {
  const {login, logout, userId, token, isReady} = useAuth()
  const isLogin = !!token
  const routes = useRoutes(isLogin)

  return (
    <AuthContext.Provider value={{login, logout, userId, token, isReady, isLogin}}>
      <div className="app">
        <BrowserRouter>
          <Navbar />
          { routes }
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
