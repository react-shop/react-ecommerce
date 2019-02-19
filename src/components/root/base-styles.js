import { injectGlobal } from 'styled-components'
import reset from 'styled-reset'

const baseStyles = () => injectGlobal`
    ${reset};
    html { font-family: sans-serif; };
    * { box-sizing: border-box; };
`;

export default baseStyles