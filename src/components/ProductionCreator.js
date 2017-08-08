import React from "react";

export default ({
  description,
  price,
  error,
  createProduction,
  setDescription,
  setPrice
}) =>
  <form
    onSubmit={event => {
      event.preventDefault();
      createProduction();
    }}
  >
    <label>
      Description:
      <input
        type="text"
        name="desc"
        value={description}
        onChange={event => setDescription(event.target.value)}
      />
    </label>
    <br />
    <label>
      Price:
      <input
        type="number"
        name="price"
        value={price || 0}
        onChange={event => setPrice(event.target.value)}
      />{" "}
      Wei
    </label>
    <br />
    <input type="submit" value="Create Production" />
    {error}
  </form>;
