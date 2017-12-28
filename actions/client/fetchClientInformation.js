/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { logger } from '@shopgate/pwa-core/helpers';
import { getWebStorageEntry } from '@shopgate/pwa-core/commands/webStorage';
import * as actions from '../../action-creators/client';

/**
 * Requests the client information from the web storage.
 * @return {Function} A redux thunk.
 */
const fetchClientInformation = () => (dispatch) => {
  dispatch(actions.requestClientInformation());

  getWebStorageEntry({ name: 'clientInformation' })
    .then(response => dispatch(actions.receiveClientInformation(response.value)))
    .catch((error) => {
      logger.error(error);
      dispatch(actions.errorClientInformation());
    });
};

export default fetchClientInformation;
