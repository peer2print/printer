import React from "react";

const descriptionLabel = "newProductionDescription";
const priceLabel = "newProductionPrice";

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
    <div className="form-group">
      <label for={descriptionLabel} className="control-label">
        Description:
      </label>
      <input
        className="form-control"
        id={descriptionLabel}
        type="text"
        name="desc"
        value={description}
        onChange={event => setDescription(event.target.value)}
      />
    </div>
    <div className="form-group">
      <label for={priceLabel}>Price:</label>
      <input
        className="form-control-inline"
        id={priceLabel}
        type="number"
        name="price"
        value={price || 0}
        onChange={event => setPrice(event.target.value)}
      />{" "}
      Wei
    </div>
    <button className="btn btn-default" type="submit">
      Create Production
    </button>
    {error}
  </form>;
