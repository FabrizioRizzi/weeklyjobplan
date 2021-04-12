import { useState } from "react";
import Button from "../components/atoms/Button/Button";
import TextInput from "../components/atoms/TextInput/TextInput";
import firebase from 'firebase/app';
import 'firebase/auth';
import { useHistory } from "react-router-dom";

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
    <div className="Login">
      <TextInput onChange={changeUsername}/>
      <TextInput onChange={changePassword}/>
      <Button primary={true} onClick={login}>Login</Button>
      <div>{error}</div>
    </div>
  );
}

export default Login;