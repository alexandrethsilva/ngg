import {AppComponent} from 'common/components/AppComponent';

// Matches any JS file inside a 'routes' folder.
const req: Function = require.context(
  'modules', true, /^\.\/[a-z]+\/routes\/[a-z]+\.js$/i
);

export default [
  {
    component: AppComponent,
    childRoutes: req.keys().map(req),
  },
];
