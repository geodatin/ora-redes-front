import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import PropTypes from 'prop-types';
import React from 'react';

import Typography from '../Typography';
import useStyles from './styles';

/**
 * This component renders a Breadcrumb
 * @returns Breadcrumb
 */
export default function Breadcrumb({ items }) {
  const classes = useStyles();

  return (
    <div className={classes.breadcrumb}>
      {items.map((item, index) => {
        const itemComponent = (
          <Typography
            key={item}
            className={
              index > 0 ? classes.secondaryItem : classes.principalItem
            }
          >
            {item}
          </Typography>
        );

        if (index + 1 < items.length) {
          return (
            <div key={`${item}-div`} className={classes.itemWithSeparator}>
              {itemComponent}{' '}
              <ArrowForwardIosRoundedIcon
                key={`${item}-separator`}
                className={classes.separator}
                style={{ fontSize: 12 }}
              />
            </div>
          );
        }

        return itemComponent;
      })}
    </div>
  );
}

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};
