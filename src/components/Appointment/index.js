import React from 'react';
import useVisualMode from '../../hooks/useVisualMode'
import "../Appointment/styles.scss";
import Header from '../Appointment/Header'
import Show from '../Appointment/Show'
import Empty from '../Appointment/Empty'
import Form from '../Appointment/Form'
import Status from '../Appointment/Status'
import Confirm from '../Appointment/Confirm'


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";


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
  

  function onSave(name, interviewer) {
    
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    transition(SHOW);

  }


  const onDelete = function () {
    props.cancelInterview(props.id)
  }

  const handleDelete = function(){
    transition(CONFIRM)
    console.log("delete called");
    
  }

  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={onAdd} />}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={()=>transition(CONFIRM)}
          onEdit={()=>transition(EDIT)}
        />
      )}

      {mode === CREATE && 
        <Form
          interviewers={props.interviewers}
          onSave={onSave}
          onCancel={onCancel}>
        </Form>
      }

     
      {mode === CONFIRM && (
        <Confirm
          onCancel={() => transition(SHOW)}
          onConfirm={() => {
            transition(DELETING);
            props.cancelInterview(props.id)
            transition(EMPTY);
          }}
          message={DELETING}
        />
      )}

      {mode === EDIT && (
        <Form 
        name={props.interview.student}
        interviewers={props.interviewers}
        interviewer={props.interview.interviewer.id}
        onCancel={onCancel}
        onSave={onSave}
        // onSave={() => {
        //   onSave(props.interview.student, props.interview.interviewer.id)
        //   }}
         


        />
      )}


    </article>
  );
}
