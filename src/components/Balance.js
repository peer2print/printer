import React from "react";

export default ({ balance }) => {
  return (
    <div>
      {isNaN(balance)
        ? balance
        : <div>
            Balance<br />
            {balance + " Wei"}
          </div>}
    </div>
  );
};
