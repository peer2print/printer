import { connect } from "react-redux";
import User from "../components/User";
import { setUser } from "../actions";

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => ({
  setUser(user) {
    dispatch(setUser(user));
  }
});

const CurrentUser = connect(mapStateToProps, mapDispatchToProps)(User);

export default CurrentUser;
