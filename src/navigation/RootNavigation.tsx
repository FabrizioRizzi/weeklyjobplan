import { BrowserRouter, Route } from 'react-router-dom';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Projects from 'pages/Projects';
import Sorint from 'pages/Sorint';
import Loading from 'components/atoms/Loading/Loading';
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from 'firebaseUtils/firebase';

export interface PrivateRouteProps {
  component: React.FC;
  user: User | null;
  path: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component, user, path,
}: PrivateRouteProps) => {
  const finalComponent = user ? component : Login;
  return (<Route exact path={path} component={finalComponent} />);
};

const RootNavigation = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authStateChangeSubscription = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => authStateChangeSubscription();
  }, []);

  return (
    loading
      ? (
        <div style={{ margin: 20 }}>
          <Loading />
        </div>
      )
      : (
        <BrowserRouter>
          <PrivateRoute component={Home} user={user} path="/" />
          <PrivateRoute component={Projects} user={user} path="/projects" />
          <PrivateRoute component={Sorint} user={user} path="/sorint" />
        </BrowserRouter>
      ));
};

export default RootNavigation;
