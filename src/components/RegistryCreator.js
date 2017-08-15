import React from "react";

export default ({ createRegistry }) =>
  <form
    onSubmit={event => {
      event.preventDefault();
      createRegistry();
    }}
  >
    <label>
      <button>Create registry</button>
    </label>
  </form>;
