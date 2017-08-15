import { connect } from "react-redux";
import Registry from "../components/Registry";
import { setRegistry, createRegistry } from "../actions";

const mapStateToProps = state => {
  return {
    registry: state.registry.address,
    error: state.registry.error
  };
};

const mapDispatchToProps = dispatch => ({
  setRegistry: registry => dispatch(setRegistry(registry)),
  createRegistry: () => dispatch(createRegistry())
});

const CurrentRegistry = connect(mapStateToProps, mapDispatchToProps)(Registry);

export default CurrentRegistry;
