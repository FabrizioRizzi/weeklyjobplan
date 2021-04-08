import { BrowserRouter, Route } from 'react-router-dom';
import firebase from 'firebase/app';
import { firebaseConfig } from '../firebase/firebase';
import Home from '../pages/Home';

firebase.initializeApp(firebaseConfig);

const RootNavigation = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
    </BrowserRouter>
  )
}

export default RootNavigation;