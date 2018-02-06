/**
 * Copyright (c) 2017-present, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { connect } from 'react-redux';
import {
  isFetching,
} from '@shopgate/pwa-common-commerce/favorites/selectors/index';
import {
  addFavorites,
  removeFavorites,
} from '@shopgate/pwa-common-commerce/favorites/actions/toggleFavorites';
import createToast from '@shopgate/pwa-common/actions/toast/createToast';

/**
 * Maps state to props.
 * @param {Object} state State.
 * @return {Object}
 */
const mapStateToProps = state => ({
  isFetching: isFetching(state),
});
/**
 * Connects the dispatch function to a callable function in the props.
 * @param {Function} dispatch The redux dispatch function.
 * @return {Object} The extended component props.
 */
const mapDispatchToProps = dispatch => ({
  addFavorites: productId => dispatch(addFavorites(productId)),
  showToast: productId => (dispatch(createToast({
    action: 'common.undo',
    actionOnClick: addFavorites(productId, true),
    message: 'favorites.removed',
    delay: 6000,
  }))),
  removeFavorites: productId => dispatch(removeFavorites(productId)),
});

export default connect(mapStateToProps, mapDispatchToProps);
