import React, { Fragment } from 'react';
import useVisualMode from '../../hooks/useVisualMode'
import "../Appointment/styles.scss";
import Header from '../Appointment/Header'
import Show from '../Appointment/Show'
import Empty from '../Appointment/Empty'
import Form from '../Appointment/Form'


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";


export default function Appointment(props) {

 

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const onAdd = function () {
    transition(CREATE);
  }
  const onComplete = function () {
    transition(EMPTY)
  }
  const onCancel = function () {
    back();
  }



  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={onAdd} />}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}

      {mode === CREATE && 
      <Form
        interviewers={[]}
        onSave={"onSave"}
        onCancel={onCancel}>
        </Form>}



      {/* {props.interview ? <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
      /> : <Empty />} */}

    </article>
  );
}
