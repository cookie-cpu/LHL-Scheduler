
export function getAppointmentsForDay(state, day) {
 
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

export function getInterview(state, interview){
   if (!interview) {
    return null;
  }

  const output = {};
  output.student = interview.student;
  output.interviewer = state.interviewers[interview.interviewer];

  return output;
}