/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  PRODUCT_LIFETIME,
  REQUEST_PRODUCT_OPTIONS,
  RECEIVE_PRODUCT_OPTIONS,
  ERROR_PRODUCT_OPTIONS,
  OPTION_TYPE_TEXT,
} from '../constants';

/**
 * Stores product options by the ID of the related parent product.
 * @param {Object} [state={}] The current state.
 * @param {Object} action The action object.
 * @return {Object} The new state.
 */
export default function optionsByProductId(state = {}, action) {
  switch (action.type) {
    case REQUEST_PRODUCT_OPTIONS:
      return {
        ...state,
        [action.productId]: {
          ...state[action.productId],
          isFetching: true,
          expires: 0,
        },
      };
    case RECEIVE_PRODUCT_OPTIONS: {
      const options = action.options.map((option) => {
        let { values } = option;
        const { type } = option;

        if (values) {
          values = values.map(value => ({
            ...value,
            unitPriceModifier: value.unitPriceModifier || 0,
          }));
        }

        let unitPriceModifier;

        if (type === OPTION_TYPE_TEXT) {
          unitPriceModifier = option.unitPriceModifier || 0;
        }

        return {
          ...option,
          unitPriceModifier,
          values,
        };
      });

      return {
        ...state,
        [action.productId]: {
          ...state[action.productId],
          options,
          isFetching: false,
          expires: Date.now() + PRODUCT_LIFETIME,
        },
      };
    }

    case ERROR_PRODUCT_OPTIONS:
      return {
        ...state,
        [action.productId]: {
          ...state[action.productId],
          isFetching: false,
        },
      };
    default:
      return state;
  }
}
