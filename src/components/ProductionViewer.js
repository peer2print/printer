import React from "react";
import Identicon from "react-blockies";

export default ({ production }) =>
  <p>
    {production.address && <Identicon seed={production.address} />}
    <br />
    Address:
    {production.address}
    <br />
    Description:
    {production.description}
    <br />
    Price:
    {production.price && production.price.toString()}
    ETH
    <br />
    Buyer:
    {production.buyer}
  </p>;
