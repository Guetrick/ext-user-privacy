import { css } from 'glamor';
import colors from 'Styles/colors';

const disabled = css({
  color: `${colors.shade4} !important`,
}).toString();

const shippingInfoValue = css({
  fontSize: '0.875rem',
  color: colors.shade9,
  textAlign: 'right',
}).toString();

export default {
  disabled,
  shippingInfoValue,
};
