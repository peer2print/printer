import React from "react";

const bindHandleChange = setUser => {
  return event => {
    setUser(event.target.value);
  };
};

const Login = ({ user, setUser }) => {
  return (
    <form>
      <label>
        Address:
        <input
          type="text"
          name="address"
          value={user}
          onChange={bindHandleChange(setUser)}
        />
      </label>
    </form>
  );
};

export default Login;
