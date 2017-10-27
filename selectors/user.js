/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getUrl } from './url';

/**
 * Selects the isLoggedIn state from the user.
 * @param {Object} state The global state.
 * @return {boolean}
 */
export const isUserLoggedIn = state => state.user.login.isLoggedIn;

/**
 * Gets user data from the logged-in user.
 * @param {Object} state The application state.
 * @return {Object|null}
 */
export const getUserData = state => state.user.data;

/**
 * Gets the register url.
 * @param {Object} state The application state.
 * @return {string|null}
 */
export const getRegisterUrl = state => getUrl('register', state);
