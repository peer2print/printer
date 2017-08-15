import React from "react";

export default ({ balance }) => {
  return (
    <div>
      {isNaN(balance) ? balance : "Balance: " + balance + " Wei"}
    </div>
  );
};
