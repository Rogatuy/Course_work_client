import {Routes, Route} from 'react-router-dom';
import { AppRoute } from './const';
import {ToastContainer} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

import MainPage from './pages/main-page/main-page';
import Login from './pages/login/login';
import MyAccount from './pages/my-account/my-account';
import NoFoundScreen from './pages/no-found-screen/no-found-screen';
import Header from './components/header/header';
import FullReview from './pages/full-review/full-review';
import Footer from './components/footer/footer';

function App() {

  return (
    <div className="app">
      <Header/>
      <div className="app_wrapper" style={{backgroundColor: 'rgb(248, 249, 250)'}}>
        <Routes>        
          <Route path={AppRoute.Main} element={<MainPage />} />
          <Route path={AppRoute.Films}>
            <Route path=':id' element={<FullReview />} />
          </Route>
          <Route path={AppRoute.Books}>
            <Route path=':id' element={<FullReview />} />
          </Route>
          <Route path={AppRoute.Games}>
            <Route path=':id' element={<FullReview />} />
          </Route>        
          <Route path={AppRoute.Login} element={<Login />} />
          <Route path={AppRoute.MyAccount} element={<MyAccount />} />
          <Route path={AppRoute.NoFoundScreen} element={<NoFoundScreen />}/>
        </Routes>
      </div>
      <Footer />
      <ToastContainer position = 'bottom-right' />
    </div>
  );
}

export default App;
