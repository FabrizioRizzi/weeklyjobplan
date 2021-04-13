import { useState } from "react";
import Button from "../components/atoms/Button/Button";
import TextInput from "../components/atoms/TextInput/TextInput";
import firebase from 'firebase/app';
import 'firebase/auth';
import { useHistory } from "react-router-dom";
import './Login.scss'

const Login: React.FC = () => {

  const history = useHistory();
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState('');

  const changeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  }

  const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }

  const login = () => {
    firebase.auth().signInWithEmailAndPassword(username.trim(), password.trim())
      .then(() => history.replace('/'))
      .catch(err => setError('* ' + err.message))
  }

  return (
    <>
      <h1 className="Login__Title">Weekly Job Plan</h1>
      <div className="Login__Login">
        <label>Email</label>
        <TextInput type="email" onChange={changeUsername} />
        <label>Password</label>
        <TextInput type="password" onChange={changePassword} />
        <div className="Login__TwoColumns">
          <Button primary={true} onClick={login}>Login</Button>
        </div>
        <div className="Login__TwoColumns Login__Error">{error}</div>
      </div>
    </>
  );
}

export default Login;