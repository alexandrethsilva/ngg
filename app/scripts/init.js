//Matches any file with the name actionCreators.js
//or any JS file inside a folder called actionCreator with the name index.js
const req: Function = require.context(
  './modules', true, /^\.\/[a-z]+\/actions\/[a-z]+ActionCreators(\/index)?\.js$/i
);

const moduleInits: object = req
  .keys()
  .map(key => req(key).init)
  .filter(moduleInit => !!moduleInit);

export default function init(): any {
  return async (dispatch) => {
    for (let moduleInit in moduleInits) { // eslint-disable-line prefer-const
      await dispatch(moduleInit());
    }
  };
}
