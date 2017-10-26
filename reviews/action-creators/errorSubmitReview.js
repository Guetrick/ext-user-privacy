/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ERROR_SUBMIT_REVIEW } from '../constants';

/**
 * Dispatches the ERROR_SUBMIT_REVIEW action.
 * @returns {Object} The ERROR_SUBMIT_REVIEW action
 */
const errorSubmitReview = () => ({
  type: ERROR_SUBMIT_REVIEW,
});

export default errorSubmitReview;
