import { connect } from "react-redux";
import ProductionList from "../components/ProductionList";
import {
  approveRequest,
  payCollateral,
  finishProduct,
  confirmExchange
} from "../actions";

const mapStateToProps = (state, filter) => {
  return {
    productions: Object.keys(state.productions).reduce((filtered, address) => {
      if (filter(state.user.address, state.productions[address]))
        filtered[address] = state.productions[address];
      return filtered;
    }, {}),
    updateError: state.registryUpdateError,
    user: state.user.address
  };
};

const mapDispatchToProps = dispatch => ({
  approveRequest: requestAddress => dispatch(approveRequest(requestAddress)),
  payCollateral: (requestAddress, amount) =>
    dispatch(payCollateral(requestAddress, amount)),
  finishProduct: productionAddress =>
    dispatch(finishProduct(productionAddress)),
  confirmExchange: (productionAddress, amount) => {
    dispatch(confirmExchange(productionAddress, amount));
  }
});

const ownRequestsFilter = (userAddress, production) =>
  userAddress === production.buyer;
const othersRequestsFilter = (userAddress, production) =>
  userAddress !== production.buyer;

const bindMSTPToFilter = filter => state => mapStateToProps(state, filter);

export const OwnProductions = connect(
  bindMSTPToFilter(ownRequestsFilter),
  mapDispatchToProps
)(ProductionList);
export const OthersProductions = connect(
  bindMSTPToFilter(othersRequestsFilter),
  mapDispatchToProps
)(ProductionList);
