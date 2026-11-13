import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'

import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { auth } from './firebase';
import { login, logout } from './features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';

function NotFound() {
  return (
    <main>
      <h1>Página não encontrada</h1>
      <Link to="/">Voltar para o início</Link>
    </main>
  )
}

function App() {

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email,
        }));
      } else {
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          {user ? (
            <>
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/" element={<HomeScreen />} />
              <Route path="*" element={<NotFound />} />
            </>
          ) : (
            <>
              <Route path="*" element={<LoginScreen />} />
              <Route path="/login" element={<LoginScreen />} />
            </>
          )}
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
