import React from "react";
import CurrentBalance from "../containers/CurrentBalance";

const bindHandleChange = setRegistry => {
  return event => {
    setRegistry(event.target.value);
  };
};

const RegistrySetter = ({ registry, setRegistry }) => {
  return (
    <form>
      <label>
        Address:
        <input
          type="text"
          name="address"
          value={registry}
          onChange={bindHandleChange(setRegistry)}
        />
      </label>
    </form>
  );
};

export default RegistrySetter;
