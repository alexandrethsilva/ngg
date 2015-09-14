import getAllUsers from '../../queries/user/getAllUsers';
import {wrapConnectionField} from '../../uac';

export default refs => wrapConnectionField({
  type: refs.userConnection,
  resolve: () => getAllUsers(),
});
