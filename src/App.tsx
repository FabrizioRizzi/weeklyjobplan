import firebase from 'firebase/app';
import './App.css';
import { firebaseConfig } from './firebase';
import Home from './pages/Home';

firebase.initializeApp(firebaseConfig);

const App: React.FC = () => {
  return (
    <Home />
  );
}

export default App;
