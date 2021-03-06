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
     // console.log(response)
     setState(previous => (
       {...previous,
        days:response[0].data,
        appointments:response[1].data,
        interviewers:response[2].data}))
    })
  }, [])


  /*
  Where is the value of "spots" stored for each day?
   //State.days

  When should that value change?
   //On creation and deletion 

  How can we calculate how many spots should be available?
  // during the setState
  */

  function spotUpdate(add, remove) {
   const changeDay = state.days.find(day => day.name === state.day)
   const newDays = [...state.days];
  
   if (remove){
     changeDay.spots++;
   } else if (add) {
     changeDay.spots--;
   }
   newDays[changeDay.id - 1] = changeDay;
   return newDays;
  }


  function bookInterview(id, interview){
    const add = !(state.appointments[id].interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    //console.log(`id: ${id}, interviewer: ${interview}`);

    return axios.put(`/api/appointments/${id}`, appointment)
    //.then(response =>console.log("PUT res:",response))
    .then(() =>{
      setState({
        ...state,
        appointments,
        days: spotUpdate(true, null)
      });
    })
    //.then(() =>{spotUpdate(id, true);});
  };

  
  function cancelInterview(id){
    const newAppointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = { ...state.appointments, [id]: newAppointment };
    
    //console.log(`id for delete: ${id}`);

    return axios.delete(`/api/appointments/${id}`, )
    //.then(response =>console.log("DELETE res:",response))
    .then(() =>{
      setState(() => ({
        ...state,
        appointments,
        days: spotUpdate(null, true),
      }));
    })
    //.then(() =>{spotUpdate(id, false);});
  }



  return { state, setDay, bookInterview, cancelInterview };



}