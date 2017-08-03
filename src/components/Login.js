import React from "react";
import CurrentBalance from "../containers/CurrentBalance";

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
      {user && <CurrentBalance />}
    </form>
  );
};

export default Login;
