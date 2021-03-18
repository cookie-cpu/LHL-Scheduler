import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from 'components/DayList'
import Appointment from './Appointment'
import {getAppointmentsForDay, getInterview} from '../helpers/selectors'
const axios = require('axios');

/* API Routes
"GET_DAYS":     http://localhost:8001/api/days,
"GET_APPOINTMENTS": http://localhost:8001/api/appointments,
"GET_INTERVIEWERS": http://localhost:8001/api/interviewers,
*/

export default function Application(props) {
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);
  // const [appointments, setAppointments] = useState({})
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });
  // const setDays = (days) => setState((previous) => ({ ...previous, days }));

  useEffect(() => {

    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ])
    .then((response)=>{
      console.log(response)
     setState(previous => (
       {...previous,
        days:response[0].data,
        appointments:response[1].data,
        interviewers:response[2].data}))
    })
  }, [])

  
  
  // const listOfAppointments = getAppointmentsForDay(state, state.day).map((appointment)=>{
  //   return (
  //     <Appointment key={appointment.id} {...appointment} />
  //   )
  // })

  const appointments = getAppointmentsForDay(state, state.day);
  const schedule = appointments.map((appointment)=>{
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
       key={appointment.id}
       id={appointment.id}
       time={appointment.time}
       interview={interview}
       />
    )
  })

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          
          <DayList 
          days={state.days}
          day={state.day}
          setDay={setDay}
          appointments={state.appointments}
          />

        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        
        {schedule}
        <Appointment key="last" time="7pm" />
      </section>

    </main>

  );
}
