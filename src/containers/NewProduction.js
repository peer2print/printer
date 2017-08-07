import { connect } from "react-redux";
import ProductionCreator from "../components/ProductionCreator";
import {
  createNewProduction,
  setNewProductionDescription,
  setNewProductionPrice
} from "../actions";

const mapStateToProps = state => state.user.newProduction;

const mapDispatchToProps = dispatch => ({
  createProduction: newProduction =>
    dispatch(createNewProduction(newProduction)),
  setDescription: desription =>
    dispatch(setNewProductionDescription(desription)),
  setPrice: price => dispatch(setNewProductionPrice(price))
});

const CurrentUser = connect(mapStateToProps, mapDispatchToProps)(
  ProductionCreator
);

export default CurrentUser;
