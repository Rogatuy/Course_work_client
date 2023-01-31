import React from 'react'
import { Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { AppRoute, FIRST_STEP_PAGINATION, sectionHobbiesValue } from '../../const';
import { scrollOnTop } from '../../utils/utils';
import { HalfStarIcon, InstagramIcon, MetaIcon, TelegramIcon } from '../icons/icons';
import { changeHobbie, changePaginationMain, changeTags } from '../../redux/features/features';

import './footer.scss';

const Footer = () => {
  const dispatch = useDispatch();

  const handleOnClick = () => {
    dispatch(changeHobbie(sectionHobbiesValue.All));
    dispatch(changeTags([]));
    scrollOnTop();
    dispatch(changePaginationMain(FIRST_STEP_PAGINATION));
  }
  
  return (
    <footer className="footer bg-body-tertiary py-3">
      <div className="container">
        <div className="row">
          <div className='col-6 d-flex align-items-center'>
          <Link 
            className="logo navbar-brand text-uppercase d-inline-flex align-items-center" 
            to={AppRoute.Main}
            onClick={handleOnClick}
            >
            <HalfStarIcon/> Отзывы
          </Link>
          </div>
          <div className='col-6 d-flex align-items-center justify-content-end'>
            <div className='me-3'>
              <a href="https://www.instagram.com/">
                <InstagramIcon/>
              </a>
            </div>
            <div className='me-3'>
              <a href="https://www.facebook.com/">
                <MetaIcon/>
              </a>
            </div>
            <div className='me-3'>
              <a href="https://telegram.org/">
                <TelegramIcon/>
              </a>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col pt-3 text-center">
            <a href='https://github.com/Rogatuy'>Copyright by Rogatuy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer