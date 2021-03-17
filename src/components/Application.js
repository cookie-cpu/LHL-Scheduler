import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from 'components/DayList'
import Appointment from './Appointment'
const axios = require('axios');



const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Sylvia Palmer",
      interviewer: {
        id: 1,
        name: "Lydia Miller-Jones",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
  },
  {
    id: 6,
    time: "6pm",
    interview: {
      student: "Sylvia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Lydia Palmer",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  }
];

export default function Application(props) {

const [days, setDays] = useState([]);

const [day, setDay] = useState("Monday");

  useEffect(() => {
    axios.get('http://localhost:8001/api/days')
    .then((response) => {
      setDays([...response.data]);
    })
   
  }, [])

  

  const listOfAppointments = appointments.map((appointment)=>{
    return (
      <Appointment key={appointment.id} {...appointment} />
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
          days={days}
          day={day}
          setDay={setDay}
          />

        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        {listOfAppointments}
        <Appointment key="last" time="7pm" />
      </section>

    </main>

  );
}
