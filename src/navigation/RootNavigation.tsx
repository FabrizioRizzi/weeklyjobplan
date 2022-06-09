import {
  BrowserRouter, Navigate, Route, Routes, useLocation,
} from 'react-router-dom';
import Home from 'pages/Home';
import Loading from 'components/atoms/Loading/Loading';
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from 'firebaseUtils/firebase';
import Login from 'pages/Login';
import Projects from 'pages/Projects';
import Sorint from 'pages/Sorint';

const PrivateRoute = ({ children, user }: { children: JSX.Element, user: User | null }) => {
  const location = useLocation();
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
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
          <Routes>
            <Route
              path="/"
              element={(
                <PrivateRoute user={user}>
                  <Home />
                </PrivateRoute>
            )}
            />
            <Route
              path="/projects"
              element={(
                <React.Suspense fallback={<>Loading...</>}>
                  <PrivateRoute user={user}>
                    <Projects />
                  </PrivateRoute>
                </React.Suspense>
            )}
            />
            <Route
              path="/sorint/*"
              element={(
                <React.Suspense fallback={<>Loading...</>}>
                  <PrivateRoute user={user}>
                    <Sorint />
                  </PrivateRoute>
                </React.Suspense>
            )}
            />
            <Route
              path="/login"
              element={<Login />}
            />
            <Route path="*" element={<div>404</div>} />
          </Routes>
        </BrowserRouter>
      ));
};

export default RootNavigation;
