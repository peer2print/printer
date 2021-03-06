import React from "react";
import Identicon from "react-blockies";

const Registry = props => {
  return (
    <div>
      {props.registry && <Identicon seed={props.registry} />}
      {React.Children.map(props.children, child =>
        React.cloneElement(child, { ...props, children: [] })
      )}
      {props.error || "Valid registry"}
    </div>
  );
};

export default Registry;
