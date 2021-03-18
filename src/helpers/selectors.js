export function getInterview(state, interview){
   if (!interview) {
    return null;
  }

  const output = {};
  output.student = interview.student;
  output.interviewer = state.interviewers[interview.interviewer];

  return output;
}

export function getAppointmentsForDay(state, day) {
  let output = [];

  for (let appointDay of state.days){
    if (appointDay.name === day){
      for (const val of appointDay.appointments) {
        output.push(state.appointments[val]);
      }
    }
  }
  return output;
}

export function getInterviewersForDay(state, day) {

  let output = [];

  let currentDay = state.days.filter(item => item.name === day);

  if (currentDay.length === 0){
    return [];
  }

  output = currentDay[0].interviewers.map(name => state.interviewers[name]);
  
  return output;
}