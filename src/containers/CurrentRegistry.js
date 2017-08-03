import { connect } from "react-redux";
import Registry from "../components/Registry";
import { setRegistry } from "../actions";

const mapStateToProps = state => {
  return {
    registry: state.registry
  };
};

const mapDispatchToProps = dispatch => ({
  setRegistry(registry) {
    dispatch(setRegistry(registry));
  }
});

const CurrentRegistry = connect(mapStateToProps, mapDispatchToProps)(Registry);

export default CurrentRegistry;
