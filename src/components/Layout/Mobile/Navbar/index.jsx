import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import useStyles from './styles';

/**
 * This component renders a common mobile layout for application
 * @returns common mobile layout
 */
export default function MobileNavbarLayout({
  mainContainer,
  bottomNavBar,
  value,
  setValue,
}) {
  MobileNavbarLayout.propTypes = {
    mainContainer: PropTypes.shape().isRequired,
    bottomNavBar: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    value: PropTypes.number.isRequired,
    setValue: PropTypes.func.isRequired,
  };
  const classes = useStyles();

  const getNavComponent = () => {
    if (value === 0) {
      return null;
    }
    return (
      <div
        className={classNames(
          classes.navComponentWrapper,
          bottomNavBar[value - 1].navContainer.className
        )}
      >
        {bottomNavBar[value - 1].navContainer.children}
      </div>
    );
  };

  return (
    <div className={classes.wrapper}>
      <div
        className={classNames(
          classes.mainContainerWrapper,
          mainContainer.className
        )}
      >
        {getNavComponent()}
        {mainContainer.children}
      </div>

      <BottomNavigation
        className={classes.nav}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label={mainContainer.label}
          icon={mainContainer.icon}
        />
        {bottomNavBar.map((buttonAction) => (
          <BottomNavigationAction
            key={buttonAction.label}
            label={buttonAction.label}
            icon={buttonAction.icon}
          />
        ))}
      </BottomNavigation>
    </div>
  );
}
