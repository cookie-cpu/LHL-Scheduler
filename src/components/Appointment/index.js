import React from 'react';
import useVisualMode from '../../hooks/useVisualMode'
import "../Appointment/styles.scss";
import Header from '../Appointment/Header'
import Show from '../Appointment/Show'
import Empty from '../Appointment/Empty'
import Form from '../Appointment/Form'
import Status from '../Appointment/Status'


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";


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
  
  function onDelete (id) {
    props.cancelInterview(id)
  }


  function save(name, interviewer) {
    
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    transition(SHOW);
   
   
  }

  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={onAdd} />}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={onDelete(props.id)}
        />
      )}

      {mode === CREATE && 
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={onCancel}>
        </Form>
      }

      {mode === SAVING && 
        <Status/>
      }

    </article>
  );
}
