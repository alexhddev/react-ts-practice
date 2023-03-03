import ReactDOM from 'react-dom/client';
import LoginComponent from './components/LoginComponent';
import LoginService from './services/LoginService';

const loginService = new LoginService();
const setToken = (token: string)=>{
  console.log(`received token from login service: ${token}`)
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
///  <React.StrictMode> // causes double rendering calls!
    <LoginComponent loginService={loginService} setToken={setToken}/>
//  </React.StrictMode>
);
