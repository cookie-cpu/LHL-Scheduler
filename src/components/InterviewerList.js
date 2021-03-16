import React from 'react';
import classNames from 'classnames';
import "components/InterviewerList.scss";
import InterviewerListItem from './InterviewerListItem'

// Our InterviewerList takes in three props:
// interviewers:array - an array of objects containing the information of each interviewer
// interviewer:number - the id of an interviewer
// setInterviewer:function - a function that accepts an interviewer id

export default function InterviewerList(props) {
  
  const listOfInterviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
      key={interviewer.id}
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.interviewer}
      setInterviewer={props.setInterviewer}
      
      />
    )
  })
  
  
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {listOfInterviewers}
      </ul>
    </section>

  );
}


