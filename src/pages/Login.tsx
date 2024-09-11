import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '@firebaseUtils/firebase';
import Button from '@components/atoms/Button/Button';
import TextInput from '@components/atoms/TextInput/TextInput';
import './Login.scss';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const changeUsername = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  }, []);

  const changePassword = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }, []);

  const login = (event: React.SyntheticEvent) => {
    setLoading(true);
    event.preventDefault();
    signInWithEmailAndPassword(auth, username.trim(), password.trim())
      .then(() => navigate('/'))
      .catch((err) => setError(`* ${err.message}`))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <h1 className="Login__Title">Weekly Job Plan</h1>
      <form className="Login__Login" onSubmit={login}>
        <div>Email</div>
        <TextInput type="email" onChange={changeUsername} />
        <div>Password</div>
        <TextInput type="password" onChange={changePassword} />
        <div className="Login__TwoColumns">
          <Button
            primary
            submit
            disabled={!username || !password}
            loading={loading}
          >
            Login
          </Button>
        </div>
        <div className="Login__TwoColumns Login__Error">{error}</div>
      </form>
    </>
  );
};

export default Login;
