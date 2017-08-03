import React, { Component } from "react";
import setContractDefaults from "../utils/setContractDefaults.js";
const loadContract = require("core").loadContract;

export default class ProductionCreator extends Component {
  constructor(props) {
    super(props);
    this.state = { desc: "default", price: 42 };

    this.handleChange = this.handleChange.bind(this);
    this.createProduction = this.createProduction.bind(this);
  }
  render() {
    return (
      <form onSubmit={this.createProduction}>
        <label>
          Description:
          <input
            type="text"
            name="desc"
            value={this.state.desc}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={this.state.price}
            onChange={this.handleChange}
          />
          ETH
        </label>
        <br />
        <input type="submit" value="Create Production" />
      </form>
    );
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  createProduction(event) {
    event.preventDefault();
    if (!this.props.registry || !this.props.from) {
      alert("missing registry or from");
      return;
    }
    var Production = loadContract("Production");
    setContractDefaults(Production, { from: this.props.from });
    Production.new(this.state.desc, this.state.price).then(instance => {
      this.props.addProduction(instance);
      this.props.registry.addProduction(instance.address);
    });
  }
}
