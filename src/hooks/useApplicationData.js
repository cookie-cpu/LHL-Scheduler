import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useApplicationData (){
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });
  

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
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


  function bookInterview(id, interview){
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState({
      ...state,
      appointments
    });

    console.log(`id: ${id}, interviewer: ${interview}`);
    return axios.put(`/api/appointments/${id}`, appointment)
    .then(response =>console.log("PUT res:",response))
  };

  
  function cancelInterview(id){
    const newAppointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = { ...state.appointments, [id]: newAppointment };
    
    console.log(`id for delete: ${id}`);

    return axios.delete(`/api/appointments/${id}`, )
    .then(response =>console.log("DELETE res:",response))
    .then(() =>{
      setState(() => ({
        ...state,
        appointments
      }));
    })
  }



  return { state, setDay, bookInterview, cancelInterview };
}