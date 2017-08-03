import React from "react";
import Identicon from "react-blockies";

const Registry = ({ registry, setRegistry, children }) => {
  return (
    <div>
      <div>
        <Identicon seed={registry} />
      </div>
      {React.cloneElement(children, {
        registry: registry,
        setRegistry: setRegistry
      })}
    </div>
  );
};

export default Registry;
