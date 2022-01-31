import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import PropTypes from 'prop-types';
import React from 'react';

import Typography from '../Typography';
import useStyles from './styles';

/**
 * This component renders a Breadcrumb
 * @returns Breadcrumb
 */
export default function Breadcrumb({ items, onClickItem }) {
  const classes = useStyles();

  return (
    <div className={classes.breadcrumb}>
      {items.map((item, index) => {
        const itemComponent = (
          <div
            role="button"
            key={item}
            tabIndex={0}
            style={{ cursor: 'pointer' }}
            onClick={() => onClickItem({ item, index })}
            onKeyDown={() => onClickItem({ item, index })}
          >
            <Typography
              className={
                index > 0 ? classes.secondaryItem : classes.principalItem
              }
            >
              {item}
            </Typography>
          </div>
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
  onClickItem: PropTypes.func.isRequired,
};
