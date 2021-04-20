import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from 'firebaseUtils/firebase';
import Button from 'components/atoms/Button/Button';
import TextInput from 'components/atoms/TextInput/TextInput';
import './Login.scss';

const Login: React.FC = () => {
  const history = useHistory();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const changeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const login = () => {
    setLoading(true);
    auth().signInWithEmailAndPassword(username.trim(), password.trim())
      .then(() => history.replace('/'))
      .catch((err) => setError(`* ${err.message}`))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <h1 className="Login__Title">Weekly Job Plan</h1>
      <div className="Login__Login">
        <div>Email</div>
        <TextInput type="email" onChange={changeUsername} />
        <div>Password</div>
        <TextInput type="password" onChange={changePassword} />
        <div className="Login__TwoColumns">
          <Button
            primary
            onClick={login}
            disabled={!username || !password}
            loading={loading}
          >
            Login
          </Button>
        </div>
        <div className="Login__TwoColumns Login__Error">{error}</div>
      </div>
    </>
  );
};

export default Login;
