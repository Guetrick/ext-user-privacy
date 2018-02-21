/**
 * Copyright (c) 2017-present, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bin2hex } from '@shopgate/pwa-common/helpers/data';
import Portal from '@shopgate/pwa-common/components/Portal';
import * as portals from '@shopgate/pwa-common-commerce/category/constants/Portals';
import List from 'Components/List';
import connect from './connector';

/**
 * The category list component.
 * @param {Array} categories The categories to display.
 * @returns {JSX}
 */
const CategoryList = ({ categories }) => {
  if (!categories) {
    return null;
  }

  return (
    <List>
      {categories.map(category => (
        <Portal
          key={category.id}
          name={portals.CATEGORY_LIST_ITEM}
          props={{ categoryId: category.id }}
        >
          <List.Item
            link={`/category/${bin2hex(category.id)}`}
            title={category.name}
          />
        </Portal>
      ))}
    </List>
  );
};

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape()),
};

CategoryList.defaultProps = {
  categories: null,
};

export default connect(CategoryList);
