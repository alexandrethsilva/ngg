import {routerStateReducer} from 'redux-react-router';
import {reducer as formReducer} from 'redux-form';

// Regex matching any JS file inside a reducers folder.
const matchPattern: RegExp = /^\.\/[a-z]+\/reducers\/([a-z]+)\.js$/i;

const req: Function = require.context(
  '../../', true, /^\.\/[a-z]+\/reducers\/([a-z]+)\.js$/i
);

export default req.keys().reduce((accumulator, key) => {
  const reducer = matchPattern.exec(key)[1];

  accumulator[reducer] = req(key);

  return accumulator;
}, {router: routerStateReducer, form: formReducer});
