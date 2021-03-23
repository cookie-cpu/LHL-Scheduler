import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText } from "@testing-library/react";


import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {



  xit("renders without crashing", () => {
    render(<Application />);
  });




  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });



  // Render the Application.
  // Wait until the text "Archie Cohen" is displayed.
  // Click the "Add" button on the first empty appointment.
  // Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
  // Click the first interviewer in the list.
  // Click the "Save" button on that same appointment.
  // Check that the element with the text "Saving" is displayed.
  // Wait until the element with the text "Lydia Miller-Jones" is displayed.
  // Check that the DayListItem with the text "Monday" also has the text "no spots remaining".  

  it("loads data, books an interview and reduces the psots remaining for the first day by 1", async () => {

    const { container } = render(<Application />);


    await waitForElement(() => getByText(container, "Archie Cohen"))


    const appointments = getAllByTestId(container, "appointment");
    //console.log(prettyDOM(appointments));


    const appointment = getAllByTestId(container, "appointment")[0];
    //console.log(prettyDOM(appointment));  

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    console.log(prettyDOM(appointment));

  })



})

