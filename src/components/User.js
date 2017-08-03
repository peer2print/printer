import React from "react";
import Identicon from "react-blockies";

const User = ({ user, setUser, children }) => {
  return (
    <div>
      <div>
        <Identicon seed={user} />
      </div>
      {React.cloneElement(children, { user: user, setUser: setUser })}
    </div>
  );
};

export default User;
