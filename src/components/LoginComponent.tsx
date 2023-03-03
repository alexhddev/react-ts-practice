import { SyntheticEvent, useState } from "react";
import LoginService from "../services/LoginService";

type LoginProps = {
  loginService: LoginService;
  setToken: (token: string) => void;
};

function LoginComponent({ loginService, setToken }: LoginProps) {
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginResult, setLoginResult] = useState<string>('');

  const handleSubmit = async (event: SyntheticEvent) =>{
    event.preventDefault();
    console.log(userName + ' ' + password);
    if (userName && password) {
        const loginResponse = await loginService.login(userName, password);
        console.log(loginResponse);
        if (loginResponse) {
          setLoginResult('successful login')
          setToken(loginResponse)
        } else {
          setLoginResult('invalid credentials')
        }
    } else {
      setLoginResult('UserName and password required!')
    }
  }

  function renderLoginResult(){
    if (loginResult) {
      return <label>{loginResult}</label>
    }
  }


  return (
    <div>
      <h2>Please login</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>User name</label>
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        /><br/>
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        /><br/>
        <input type="submit" value="Login" />
      </form><br/>
      {renderLoginResult()}
    </div>
  );
}

export default LoginComponent;
