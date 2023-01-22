import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import HomePage from './Pages/HomePage';
import CoinPage from './Pages/CoinPage';
import FeedBackPage from './Pages/FeedBackPage';
import Login from './Pages/Login';

function App() {

  return (
   <div className="overallTop">
    <Header />
    <Routes>
      <Route exact='true' path='/' element={<HomePage />}/>
      <Route path='/feedback' element={<FeedBackPage />} />
      <Route path='/coins/:id' element={<CoinPage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/user-profiles/:id' element={<FeedBackPage />} />
    </Routes>
   </div>
  );
}

export default App;
