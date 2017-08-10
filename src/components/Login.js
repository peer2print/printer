import React from "react";

const bindHandleChange = setUser => {
  return event => {
    setUser(event.target.value);
  };
};

const Login = ({ user, setUser }) =>
  <form>
    <label>Address</label>
    <br />
    <input
      className="address-input"
      type="text"
      name="address"
      value={user}
      onChange={bindHandleChange(setUser)}
    />
  </form>;

export default Login;
