import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkIsAuth, deleteStatus, registerUser } from '../../redux/features/auth/authSlice';
import { loginUser } from '../../redux/features/auth/authSlice';
import { AppRoute } from '../../const';
import { toast } from 'react-toastify';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {status} = useSelector((state) => state.auth)
  const isAuth = useSelector(checkIsAuth);

  const [tabKey, setTabKey] = useState('login');

  useEffect(() => {
    if(status) toast(status);
    dispatch(deleteStatus());
    if(isAuth) {navigate(`${AppRoute.Main}`) };
  }, [dispatch, isAuth, navigate, status]);

  const handleSubmitLogin = () => {
    try {      
      dispatch(loginUser({email, password}));
    } catch(error) {
      console.log(error);
    }
  }

  const handleSubmitRegister = () => {
    try {      
      dispatch(registerUser({name, email, password}));
    } catch(error) {
      console.log(error);
    }
  }

  return (
      <div className='Auth-form-container container-xl'>
        <div className='row justify-content-center'>
          <div className="col-lg-5 col-md-6 col-xs-12">
            <Tabs 
            id="tabs-controlled"
            activeKey={tabKey}
            onSelect={(k) => setTabKey(k)}
            className="nav nav-tabs my-4 "
            justify
            >
              <Tab eventKey="login" title="Авторизация" className="nav-item col-12">
                <form className="Auth-form">
                  <div className="Auth-form-content">
                    <h2 className="Auth-form-title my-3 text-center">Авторизация</h2>
                    <div className="mb-4">
                      <input
                        type="email"
                        className="form-control mt-1"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="password"
                        className="form-control mt-1"
                        placeholder="Пароль"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="mb-4 text-center">
                      <button
                        type="button" 
                        className="btn btn-secondary"
                        onClick={handleSubmitLogin} >
                        Авторизоваться
                      </button>
                    </div>
                  </div>
                </form>
              </Tab>
              <Tab eventKey="registration" title="Регистрация" className="nav-item col-12">
                <form className="Auth-form">
                  <div className="Auth-form-content">
                    <h2 className="Auth-form-title my-3 text-center">Регистрация</h2>
                    <div className="mb-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Имя"
                        value={name}
                        onChange={e => setName(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Пароль"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="mb-4 text-center">
                      <button 
                      type="button" 
                      className="btn btn-secondary"
                      onClick={handleSubmitRegister} 
                      >
                        Зарегистрироваться
                      </button>
                    </div>
                  </div>
                </form> 
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
  )
}

export default Login;