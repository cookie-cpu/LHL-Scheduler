import React, { Fragment } from 'react';
import useVisualMode from '../../hooks/useVisualMode'
import "../Appointment/styles.scss";
import Header from '../Appointment/Header'
import Show from '../Appointment/Show'
import Empty from '../Appointment/Empty'

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  return (
    <article className="appointment">
      <Header time={props.time} />
      {props.interview ? <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
      /> : <Empty />}

    </article>
  );
}
