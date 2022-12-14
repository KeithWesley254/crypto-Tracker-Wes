import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import HomePage from './Pages/HomePage';
import CoinPage from './Pages/CoinPage';
import FeedBackPage from './Pages/FeedBackPage';

function App() {

  return (
   <BrowserRouter>
   <div className="overallTop">
    <Header />
    <Routes>
      <Route exact='true' path='/' element={<HomePage />}/>
      <Route path='/feedback' element={<FeedBackPage />} />
      <Route path='/coins/:id' element={<CoinPage />} />
    </Routes>
   </div>
   </BrowserRouter>
  );
}

export default App;
