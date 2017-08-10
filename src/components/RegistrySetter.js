import React from "react";

const bindHandleChange = setRegistry => {
  return event => {
    setRegistry(event.target.value);
  };
};

const RegistrySetter = ({ registry, setRegistry }) => {
  return (
    <form>
      <label>Address</label>
      <input
        className="address-input"
        type="text"
        name="address"
        value={registry}
        onChange={bindHandleChange(setRegistry)}
      />
    </form>
  );
};

export default RegistrySetter;
