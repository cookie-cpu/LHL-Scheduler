import React from 'react';

function Empty(props) {
  return (
    <main className="appointment__add">
    <img
      className="appointment__add-button"
      src="images/add.png"
      alt="Add"
      onClick={props.onAdd}
      data-testid="Add"
    />
  </main>
  );
}

export default Empty;