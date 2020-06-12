import { connect } from "react-redux";
import { applyScope } from "./utils";
import { pageSelector } from "./selectors";
import { createSelector } from "reselect";
import {
  generateReportDispatcher,
  generateReportReducer,
} from "./helpers/reducer";
import { reportTypes } from "./helpers/types";
import { reportInitState } from "./helpers/initialState";

const scope = "subrequestReport";

const initialState = reportInitState;
export const types = applyScope(scope, reportTypes);

// reducer actions, pass callback function for custom actions
const subrequestReportReducer = generateReportReducer(types, initialState);

// dispatch actions, pass custom actions if any
const mapDispatchToProps = generateReportDispatcher(types);

// state with selectors
const mapStateToProps = pageSelector(scope, {
  result: generateResultSelector(scope),
});

// generates selector for parsing report results
function generateResultSelector(scope) {
  // get result
  const getResult = (state) => (state[scope] ? state[scope].result : {});

  // prase result
  const parsedResultSelector = createSelector([getResult], (result) => {
    return result;
  });

  return parsedResultSelector;
}

// connect
export const connecter = (Report) =>
  connect(mapStateToProps, mapDispatchToProps)(Report);

export default subrequestReportReducer;
