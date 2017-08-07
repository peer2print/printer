import { connect } from "react-redux";
import ProductionList from "../components/ProductionList";

const mapStateToProps = (state, filter) => {
  return {
    productions: Object.keys(state.productions).reduce((filtered, address) => {
      if (filter(state.user.address, state.productions[address]))
        filtered[address] = state.productions[address];
      return filtered;
    }, {}),
    updateError: state.registryUpdateError
  };
};

const ownRequestsFilter = (userAddress, production) =>
  userAddress === production.buyer;
const othersRequestsFilter = (userAddress, production) =>
  userAddress !== production.buyer;

const bindMSTPToFilter = filter => state => mapStateToProps(state, filter);

export const OwnProductions = connect(bindMSTPToFilter(ownRequestsFilter))(
  ProductionList
);
export const OthersProductions = connect(
  bindMSTPToFilter(othersRequestsFilter)
)(ProductionList);
