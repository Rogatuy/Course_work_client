import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link} from 'react-router-dom';

import { HalfStarIcon, GameIcon, BookIcon, FilmIcon, SearchIcon, LogoutIcon, MyAccountIcon, LoginIcon } from '../icons/icons';
import { changeHobbie, changePaginationMain, changeTags, checkIsAuth, logOut  } from '../../redux/features/features';

import { AppRoute, sectionHobbiesValue, groupHobbies, FIRST_STEP_PAGINATION } from '../../const';
import { toast } from 'react-toastify';
import classNames from 'classnames';
import './header.scss';

const Header = () => {
  const dispatch = useDispatch();
  const hobbie = useSelector(state => state.activeHobbie.selectedHobbie);
  const isAuth = useSelector(checkIsAuth);

  const handleLogOut = () => {
    dispatch(logOut());
    window.localStorage.removeItem('_id');
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('name');
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
            dispatch(changePaginationMain(FIRST_STEP_PAGINATION));
          }}
          >
          <HalfStarIcon/> Отзывы
        </Link>
        <div className="offcanvas offcanvas-end flex-grow-1">
          <div className="offcanvas-body pt-0 p-lg-0 align-items-center">
            <ul className="navbar-nav flex-row bd-navbar-nav">
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
                  <GameIcon/>
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
                  <FilmIcon/>
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
                  <BookIcon/>
                </Link>
              </li>
            </ul>
            <div className="d-flex ms-auto">
              <Link to={AppRoute.Search} className="btn btn-dark text-secondary" type="button" alt="Поиск" title="Поиск по обзорам">
                <SearchIcon/>
              </Link>
            </div>
            <div className="navbar-nav flex-row">
              {isAuth &&
              <>
                <Link to={AppRoute.MyAccount} className="nav-link p-1" alt="MyAccount" title="Личный кабинет">
                  <MyAccountIcon/>
                </Link>
                <Link to={AppRoute.Main} onClick={handleLogOut} className="nav-link p-1" alt="Logout" title="Выйти">
                  <LogoutIcon/>
                </Link>
              </>
              }
              {!isAuth &&
              <>
                <Link className='btn btn-link' to={AppRoute.Login} alt="Login" title="Авторизация">
                  <LoginIcon/>
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
