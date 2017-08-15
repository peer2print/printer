import { connect } from "react-redux";
import Balance from "../components/Balance";

const mapStateToProps = state => {
  return {
    balance: state.balance
  };
};

const CurrentBalance = connect(mapStateToProps)(Balance);

export default CurrentBalance;
