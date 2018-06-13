import React from 'react';
import PropTypes from 'prop-types';
import RatingStars from '@shopgate/pwa-ui-shared/RatingStars';
import RatingCount from 'Components/Reviews/components/RatingCount';
import Link from '@shopgate/pwa-common/components/Router/components/Link';
import { ITEM_PATH } from '@shopgate/pwa-common-commerce/product/constants';
import { bin2hex } from '@shopgate/pwa-common/helpers/data';
import { container } from './style';
import connect from './connector';

/**
 * The average rating and number of ratings for a product.
 * @param {Object} rating The rating values.
 * @returns {JSX}
 */
const AverageRating = ({ rating, productId }) => {
  if (!productId) {
    return null;
  }

  const { average = 0, count = 0 } = rating;
  const publicProductId = bin2hex(productId);

  return (
    <Link
      data-test-id="ratedStarsAverage"
      tagName="a"
      href={`${ITEM_PATH}/${publicProductId}/write_review`}
      className={container}
      itemProp="item"
      itemScope
      itemType="http://schema.org/Review"
    >
      <RatingStars value={average} display="large" />
      <RatingCount count={count} />
    </Link>
  )
};

AverageRating.propTypes = {
  rating: PropTypes.shape(),
  productId: PropTypes.string,
};

AverageRating.defaultProps = {
  rating: {
    average: 0,
    count: 0,
  },
  productId: null,
};

export default connect(AverageRating);
