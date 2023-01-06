import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link} from 'react-router-dom';
import { AppRoute, sectionHobbiesValue, groupHobbies } from '../../const';
import { changeHobbie } from '../../redux/features/activeHobbie/activeHobbieSlice';
import { checkIsAuth, logOut } from '../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import classNames from 'classnames';
import './header.scss';
import { changeTags } from '../../redux/features/tagsFilter/tagsFilterSlice';

const Header = () => {
  const dispatch = useDispatch();
  const hobbie = useSelector(state => state.activeHobbie.selectedHobbie);
  const isAuth = useSelector(checkIsAuth);

  const handleLogOut = () => {
    dispatch(logOut());
    window.localStorage.removeItem('_id');
    window.localStorage.removeItem('token');
    toast('Exit user');
  }

  return (
    <header className="navbar navbar-expand navbar-dark bd-navbar sticky-top bg-dark">
      <nav className="container-xxl bd-gutter flex-nowrap">
        <Link 
          className="navbar-brand d-inline-flex align-items-center p-0 me-0 me-lg-2 text-uppercase" 
          to={AppRoute.Main}
          onClick={() => {
            dispatch(changeHobbie(sectionHobbiesValue.All));
            dispatch(changeTags([]));
          }}
          >
          <svg className="d-block me-2 bi bi-star-half" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
            <path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z"/>
          </svg> Отзывы
        </Link>
        <div className="offcanvas offcanvas-end flex-grow-1">
          <div className="offcanvas-body pt-0 p-lg-0 align-items-center">
            <ul className="navbar-nav flex-row flex-wrap bd-navbar-nav">
              <li className="nav-item">
                <Link 
                  className={classNames('nav-link', {'active': (hobbie === sectionHobbiesValue.Games)})}
                  aria-current="page" 
                  to={AppRoute.Main} 
                  onClick={() => {
                    dispatch(changeHobbie(sectionHobbiesValue.Games));
                    dispatch(changeTags([]));
                  }}
                  alt={sectionHobbiesValue.Games}
                  title={groupHobbies[sectionHobbiesValue.Games]}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-joystick" viewBox="0 0 16 16">
                    <path d="M10 2a2 2 0 0 1-1.5 1.937v5.087c.863.083 1.5.377 1.5.726 0 .414-.895.75-2 .75s-2-.336-2-.75c0-.35.637-.643 1.5-.726V3.937A2 2 0 1 1 10 2z"></path>
                    <path d="M0 9.665v1.717a1 1 0 0 0 .553.894l6.553 3.277a2 2 0 0 0 1.788 0l6.553-3.277a1 1 0 0 0 .553-.894V9.665c0-.1-.06-.19-.152-.23L9.5 6.715v.993l5.227 2.178a.125.125 0 0 1 .001.23l-5.94 2.546a2 2 0 0 1-1.576 0l-5.94-2.546a.125.125 0 0 1 .001-.23L6.5 7.708l-.013-.988L.152 9.435a.25.25 0 0 0-.152.23z"></path>
                  </svg>
                </Link>
              </li>
              <li className="nav-item">
                <Link  
                  className={classNames('nav-link', {'active': (hobbie === sectionHobbiesValue.Films)})}
                  aria-current="page" 
                  to={AppRoute.Main} 
                  onClick={() => {
                    dispatch(changeHobbie(sectionHobbiesValue.Films));
                    dispatch(changeTags([]));
                  }}
                  alt={sectionHobbiesValue.Films}
                  title={groupHobbies[sectionHobbiesValue.Films]}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-camera-reels" viewBox="0 0 16 16">
                    <path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM1 3a2 2 0 1 0 4 0 2 2 0 0 0-4 0z"></path>
                    <path d="M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h7zm6 8.73V7.27l-3.5 1.555v4.35l3.5 1.556zM1 8v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1z"></path>
                    <path d="M9 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM7 3a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
                  </svg>
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className={classNames('nav-link', {'active': (hobbie === sectionHobbiesValue.Books)})}
                  aria-current="page" 
                  to={AppRoute.Main} 
                  onClick={() => {
                    dispatch(changeHobbie(sectionHobbiesValue.Books));
                    dispatch(changeTags([]));
                  }}
                  alt={sectionHobbiesValue.Books}
                  title={groupHobbies[sectionHobbiesValue.Books]}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-book" viewBox="0 0 16 16">
                    <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"></path>
                  </svg>
                </Link>
              </li>
            </ul>
            <div className="navbar-nav flex-row flex-wrap ms-auto">
            {isAuth &&
            <>
              <Link to={AppRoute.MyAccount} className="mx-1 nav-link" alt="MyAccount" title="Личный кабинет">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-badge" viewBox="0 0 16 16">
                  <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path>
                  <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0h-7zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492V2.5z"></path>
                </svg>
              </Link>
              <Link to={AppRoute.Main} onClick={handleLogOut} className="mx-1 nav-link" alt="Logout" title="Выйти">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"></path>
                  <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"></path>
                </svg>
              </Link>
            </>
            }
            {!isAuth &&
            <>
              <Link className='btn btn-link' to={AppRoute.Login} alt="Login" title="Авторизация">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#ffffff" className="bi bi-person-circle" viewBox="0 0 16 16"><path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                </svg>
              </Link>
            </>
            }
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
