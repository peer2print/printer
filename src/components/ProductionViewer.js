import React from "react";
import Identicon from "react-blockies";

const RequestSent = "0";
const RequestApproved = "1";
const CollateralPaid = "2";
const ProductFinished = "3";

const stateToString = state => {
  switch (state) {
    case RequestSent:
      return "Request sent";
    case RequestApproved:
      return "Waiting for collateral";
    case CollateralPaid:
      return "Collateral paid";
    case ProductFinished:
      return "Product finished";
    case "4":
      return "Product exchanged";
    case "5":
      return "Seller paid";
    default:
      return "Unknown";
  }
};

const buyer = 0;
const seller = 1;

const userIsBuyerOrSeller = (userAddress, production) => {
  if (userAddress === production.buyer || userAddress === production.seller)
    return true;
  else return false;
};

const userConfirmedExchange = (userAddress, production) => {
  if (
    userAddress === production.buyer &&
    production.exchangeConfirmations[buyer]
  )
    return true;
  else if (
    userAddress === production.seller &&
    production.exchangeConfirmations[seller]
  )
    return true;
  else return false;
};

export default ({
  production,
  user,
  approveRequest,
  payCollateral,
  finishProduct,
  confirmExchange
}) =>
  <div>
    {production.address && <Identicon seed={production.address} />}
    <br />
    {production.description}
    <br />
    {production.price && production.price.toString() + " Wei"}
    <br />
    {"Minimum collateral: " + production.minimumCollateral + " Wei"}
    {production.buyer !== user
      ? <div>
          {"Buyer: " + production.buyer}
        </div>
      : <br />}
    {stateToString(production.state)}
    <br />
    {user === production.buyer &&
      <div>
        Paid: {production.balance.toString()} Wei
      </div>}
    {production.state === RequestSent &&
      user !== production.buyer &&
      <div>
        <br />
        <button onClick={approveRequest}>Approve request</button>
      </div>}
    {production.state === RequestApproved &&
      user === production.seller &&
      "You approved this request"}
    {production.state === RequestApproved &&
      user !== production.seller &&
      "Seller: " + production.seller}
    {production.state === RequestApproved &&
      user === production.buyer &&
      <div>
        <button onClick={payCollateral}>Pay collateral</button>
      </div>}
    {production.state === CollateralPaid &&
      user === production.buyer &&
      "Waiting for the product to be finished"}
    {production.state === CollateralPaid &&
      user === production.seller &&
      <button onClick={finishProduct}>Set product as finished</button>}
    {production.state === ProductFinished &&
      userIsBuyerOrSeller(user, production) &&
      !userConfirmedExchange(user, production) &&
      <button onClick={confirmExchange}>Confirm exchange</button>}
    {production.state === ProductFinished &&
      user === production.buyer &&
      production.exchangeConfirmations[seller] &&
      <div>The seller confirmed the exchange</div>}
    {production.state === ProductFinished &&
      user === production.seller &&
      production.exchangeConfirmations[buyer] &&
      <div>The buyer confirmed the exchange</div>}
  </div>;
