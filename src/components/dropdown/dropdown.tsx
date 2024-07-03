import React, { useState } from 'react';

import useStore from "../../utils/useStore";

import { IDropdownOptions } from '../../typings/common';
import icon from '../../assets/arrow_icon.svg'

interface IDropdown {
  options: IDropdownOptions[]
}

const Dropdown: React.FC<IDropdown> = ({options}) => {
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const {setSelectedCity, selectedCity} = useStore();

  const toggle = (): void => {isMenuVisible === false ? setIsMenuVisible(true) : setIsMenuVisible(false)};

  return (
    <React.Fragment>
      <button
        className="dropdown"
        id="dropdown"
        aria-controls="menu"
        aria-expanded={isMenuVisible}
        aria-haspopup="true"
        onClick={toggle}
        data-expanded={isMenuVisible}
      >
        <label className={selectedCity.cityName !== '' ? "dropdown__label dropdown__label--selected" :  "dropdown__label"}  
          id="dropdown-label" htmlFor="dropdown"
        >
          {selectedCity.cityName || 'Select a city'}
        </label>
        <img className="dropdown__icon" src={icon} alt="arrow" onClick={toggle}/>
      </button>
      <ul
        className="dropdown__menu"
        data-visible={isMenuVisible}
        role="menu"
        id="menu"
        aria-labelledby="dropdown"
      >
        {options.map((city: IDropdownOptions, index: number) => {
          return (
            <li className="dropdown__menu-item" role="menu-item" key={index} 
              onClick={() => {
                setIsMenuVisible(false);
                setSelectedCity(city);
              }}
            >
              {city.cityName}
            </li>
          )
        })}
      </ul>
    </React.Fragment>
  );
};

export default Dropdown;