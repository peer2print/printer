import React from "react";
import Identicon from "react-blockies";
import Balance from "./Balance";
import Login from "./Login";

const User = props => {
  return (
    <div>
      {props.address && !props.error && <Identicon seed={props.address} />}
      <Login user={props.address} setUser={props.setUser} />
      {props.error || <Balance balance={props.balance} />}
    </div>
  );
};

export default User;
