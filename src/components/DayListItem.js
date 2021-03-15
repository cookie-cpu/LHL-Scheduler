import React from "react";
import classNames from 'classnames';
import "components/DayListItem.scss";

export default function DayListItem(props) {

  const formatSpots = function(spots) {
    if (spots == 1) {
      return `${spots} spot remaining`
    } else if (spots >= 2) {
      return `${spots} spots remaining`
    } else {
      return `no spots remaining`
    }
  }

  const dayClass = classNames(
    'day-list__item', 
    {'day-list__item--selected': props.selected},
    {'day-list__item--full': props.spots})

  return (
    <li className={dayClass} onClick={()=> {props.setDay(props.name)}}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
    );
}