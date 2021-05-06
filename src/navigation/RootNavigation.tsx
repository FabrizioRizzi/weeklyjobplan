import { BrowserRouter, Route } from 'react-router-dom';
import { auth, FirebaseUser, startFirebase } from 'firebaseUtils/firebase';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Projects from 'pages/Projects';
import Loading from 'components/atoms/Loading/Loading';
import React, { useEffect, useState } from 'react';

export interface PrivateRouteProps {
  component: React.FC;
  user: FirebaseUser | null;
  path: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component, user, path,
}: PrivateRouteProps) => {
  const finalComponent = user ? component : Login;
  return (<Route exact path={path} component={finalComponent} />);
};

const RootNavigation = () => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    startFirebase();
    const fbaseAuthSubscription = auth().onAuthStateChanged((firebaseUser: FirebaseUser | null) => {
      setUser(firebaseUser || null);
      setLoading(false);
    });
    return () => fbaseAuthSubscription();
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
        </BrowserRouter>
      ));
};

export default RootNavigation;
