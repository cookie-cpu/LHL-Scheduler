import React from "react";

import {
  render, cleanup, waitForElement,
  fireEvent, getByText, prettyDOM,
  getAllByTestId, getByAltText, getByPlaceholderText, queryByText,
} from "@testing-library/react";

import Application from "components/Application";

import axios from "axios";

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


  it("loads data, books an interview and reduces the psots remaining for the first day by 1", async () => {
    // Render the Application.
    const { container, debug } = render(<Application />);

    // Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Monday"))
    //debug()

    const appointments = getAllByTestId(container, "appointment");
    //console.log(prettyDOM(appointments));
    // const appointment = getAllByTestId(container, "appointment")[0];
    const appointment = appointments[0];

    //console.log(prettyDOM(appointments));  
    //return

    // Click the "Add" button on the first empty appointment.
    fireEvent.click(getByAltText(appointment, "Add"));


    // Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    // Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    // Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));


    // Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // Wait until the element with the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));


    // Check that the DayListItem with the text "Monday" also has the text "no spots remaining". 
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  })



  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"))

    const appointments = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );


    // 3. Click the "Delete" button on the booked appointment.
    fireEvent.click(getByAltText(appointments, "Delete"));

    // 4. Check that the confirmation message is shown.

    expect(getByText(appointments, "DELETING")).toBeInTheDocument();


    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointments, "Confirm"))

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointments, "Deleting")).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointments, "Add"));


    // 8. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining".
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();


  });




  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {

    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"))
    
    const appointments = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );


    // 3. Click the "Edit" button on the booked appointment.
    fireEvent.click(getByAltText(appointments, "Edit"));

    // 4. Edit the value field with a new name
    fireEvent.change(getByPlaceholderText(appointments, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    // 5. Ensure an interviewer is selected
    fireEvent.click(getByAltText(appointments, "Sylvia Palmer"));


    // 6. Click the "save" button on the confirmation.
    fireEvent.click(getByText(appointments, "Save"))

  

    // 6. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointments, "Saving")).toBeInTheDocument();


    // 7. Wait until the element with the new name is displayed.
    await waitForElement(() => getByText(appointments, "Lydia Miller-Jones"));


    // 8. Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );


    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  })




  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"))
    
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
 

    fireEvent.click(getByAltText(appointment, "Edit"));

    
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"))

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(()=>queryByText(appointment, 'Error'))

    expect(queryByText(appointment, 'Error'))



  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.put.mockRejectedValueOnce();

     const { container, debug } = render(<Application />);
     await waitForElement(() => getByText(container, "Archie Cohen"))

 
     const appointment = getAllByTestId(container, "appointment").find(
       appointment => queryByText(appointment, "Archie Cohen")
     );
 
     fireEvent.click(getByAltText(appointment, "Delete"));
 
     expect(getByText(appointment, "DELETING")).toBeInTheDocument();
 
     fireEvent.click(getByText(appointment, "Confirm"))
 
     expect(getByText(appointment, "Deleting")).toBeInTheDocument();
 
      waitForElement(()=>queryByText(appointment, 'Error'))

      expect(queryByText(appointment, 'Error'))
  });




})



