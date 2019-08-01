import FormStore from './form-store'; // 业务容器
import FormUI from './form-ui'; // ui
import FormUIAdapter from './form-ui-adapter'; // ui适配器
const WrapperedForm = FormStore(FormUIAdapter(FormUI));

export default WrapperedForm;
