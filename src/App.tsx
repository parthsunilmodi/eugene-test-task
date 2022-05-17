import React, { Suspense, FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import SpinLoader from 'components/SpinLoader';
import Header from './components/Header';
import PrivateRoute from './Route/privateRoute';
import './App.css';

const Home = React.lazy(() => import('pages/Home'));
const AllPokemon = React.lazy(() => import('pages/AllPokemon'));
const MyPokemon = React.lazy(() => import('pages/MyPokemon'));

const App: FC = () => {
  return (
    <div className="h-100">
      <Header />
      <div className="App">
        <Suspense fallback={<SpinLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/all" element={<PrivateRoute><AllPokemon /></PrivateRoute>} />
            <Route path="/bag" element={<PrivateRoute><MyPokemon /></PrivateRoute>} />
          </Routes>
        </Suspense>
      </div>
    </div>
  )
};

export default App;
