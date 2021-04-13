import { BrowserRouter, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Loader from '../components/atoms/Loader/Loader';
import React, { useState } from 'react';
import { auth, FirebaseUser } from '../firebase/firebase';

export interface PrivateRouteProps {
  component: React.FC;
  user: FirebaseUser | null;
  path: string;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component, user, path }) => {
  const finalComponent = user ? component : Login;
  return (<Route exact path={path} component={finalComponent} />)
};

const RootNavigation = () => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  auth.onAuthStateChanged(user => {
    setUser(user ? user : null);
    setLoading(false);
  });

  return (
    loading ?
      (<div style={{margin: 20}}>
        <Loader />
      </div>)
      :
      (<BrowserRouter>
        <PrivateRoute component={Home} user={user} path="/" />
      </BrowserRouter>)
  )
}

export default RootNavigation;
