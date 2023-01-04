import React from 'react';
import {useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';

import { sectionHobbiesValue, AppRoute } from '../../const';
import { changeHobbie } from '../../redux/features/activeHobbie/activeHobbieSlice';

import './no-found-screen.scss';

const NoFoundScreen = () => {
  const dispatch = useDispatch();
  return (
      <div className="container mx-auto mt-5 d-flex flex-column justify-content-center">
        <h4 className="col-9 text-center text-dark mx-auto">Такой ссылки не существует, к сожалению</h4>
        <Link 
        type="button" 
        className="btn btn-secondary col mt-3 mx-auto text-center" 
        to={AppRoute.Main}
        onClick={() => dispatch(changeHobbie(sectionHobbiesValue.All))}
        >
          На главную
        </Link>
      </div>
  )
}

export default NoFoundScreen;
