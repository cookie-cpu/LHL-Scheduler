

// finding the object in our state.days array who's name matches the provided day. 

// With this information we can now access that specific days appointment array.

// Once we have access to the appointment array for the given day, we'll need to iterate through it, 

// comparing where it's id matches the id of states.appointments and return that value.

// If there are no appointments on the given day, our days data will be empty we should return an empty array.


export default function getAppointmentsForDay(state, day) {
 
  const output = [];

  for (let appointDay of state.days){
    if (appointDay.name === day){
      for (const val of appointDay.appointments) {
        output.push(state.appointments[val]);
      }
    }
  }
  return output;
}