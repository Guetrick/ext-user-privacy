/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest';
import { logger } from '@shopgate/pwa-core/helpers';
import requestSubmitReview from '../action-creators/requestSubmitReview';
import receiveSubmitReview from '../action-creators/receiveSubmitReview';
import errorSubmitReview from '../action-creators/errorSubmitReview';

/**
 * Request a user review for a product from server.
 * @param {string} review The review data
 * @param {boolean} update Indicate whether the update pipeline be called or not.
 * @returns {Function} The dispatched action.
 */
const submitReview = (review, update = false) => (dispatch) => {
  dispatch(requestSubmitReview(review));
  let Pipeline;
  if (update) {
    Pipeline = new PipelineRequest('updateProductReview');
  } else {
    Pipeline = new PipelineRequest('addProductReview');
  }
  const request = Pipeline
    .setInput(review)
    .dispatch();

  request
    .then(result => dispatch(receiveSubmitReview(result)))
    .catch((error) => {
      logger.error(error);
      dispatch(errorSubmitReview());
    });

  return request;
};

export default submitReview;
