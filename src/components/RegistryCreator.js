import React from "react";

export default ({ createRegistry }) =>
  <form
    onSubmit={event => {
      event.preventDefault();
      createRegistry();
    }}
  >
    <br />
    <label>
      <button className="btn btn-default">Create registry</button>
    </label>
  </form>;
