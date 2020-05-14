import update from "immutability-helper";
import { connect } from "react-redux";
import { applyScope } from "./utils";
import { pageSelector } from "./selectors";
import { createSelector } from "reselect";
//import parseData from "@utils/Parser";

const scope = "requestForHelpUpdate";

const initialState = {
  reset: 1,
  record: {},
};

export const types = applyScope(scope, [
  "SET_RESET",
  "SAVE",
  "FETCH_REQUEST_FOR_HELP_DETAIL",
  "SET_DATA",
]);

const requestForHelpUpdateReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_RESET:
      return update(state, {
        reset: { $set: state.reset + 1 },
      });
    case types.SET_DATA:
      return update(state, {
        record: { $set: action.record },
      });
  }
  return state;
};

// dispatch actions
const mapDispatchToProps = (dispatch) => ({
  setReset: () =>
    dispatch({
      type: types.SET_RESET,
    }),
  save: (formData) =>
    dispatch({
      type: types.SAVE,
      formData,
    }),
  getRequestForHelpDetail: (requestID) =>
    dispatch({
      type: types.FETCH_REQUEST_FOR_HELP_DETAIL,
      requestID,
    }),
  setData: (record) =>
    dispatch({
      type: types.SET_DATA,
      record,
    }),
});

const getResult = (state) => state[scope].record;
export const parsedResultSelector = createSelector([getResult], (record) => {
  const parsedResult = record && record.data ? record.data : {};
  return parsedResult;
});

// state from root state
//const mapStateToProps = pageSelector(scope);
const mapStateToProps = pageSelector(scope, { record: parsedResultSelector });

// connect
export const connecter = (vs) =>
  connect(mapStateToProps, mapDispatchToProps)(vs);

export default requestForHelpUpdateReducer;
