import React from 'react';
import InterviewerList from '../InterviewerList'
import Button from '../Button'

function Form(props) {
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={props.name}
          /*
            This must be a controlled component
          */
          onChange={props.setName}
          
          

          />
        </form>
        <InterviewerList interviewers={props.interviewers} value={props.interviewer} onChange={props.setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={props.onCancel}>Cancel</Button>
          <Button confirm onClick={props.onSave}>Save</Button>
        </section>
      </section>
    </main>
  );
}

export default Form;