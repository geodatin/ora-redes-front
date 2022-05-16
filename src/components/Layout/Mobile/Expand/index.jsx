import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Collapse, IconButton } from '@mui/material';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { useTheme } from 'react-jss';

import useStyles from './styles';

/**
 * This component renders a common mobile expand layout for application
 * @returns common mobile expand layout
 */
export default function MobileExpandLayout({
  upRowBar,
  expandable,
  mainContainer,
}) {
  MobileExpandLayout.propTypes = {
    upRowBar: PropTypes.shape().isRequired,
    expandable: PropTypes.shape().isRequired,
    mainContainer: PropTypes.shape().isRequired,
  };

  const [open, setOpen] = React.useState(false);

  const classes = useStyles();
  const theme = useTheme();

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.subWrapper}>
        <div className={classNames(classes.bar, upRowBar.className)}>
          {upRowBar.children}
          <IconButton
            onClick={handleClick}
            aria-label="expand list"
            component="span"
          >
            {open ? (
              <ExpandLessIcon
                style={{ fontSize: 20, color: theme.secondary.dark }}
              />
            ) : (
              <ExpandMoreIcon
                style={{ fontSize: 20, color: theme.secondary.dark }}
              />
            )}
          </IconButton>
        </div>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <div
            className={classNames(
              classes.expandableWrapper,
              expandable.className
            )}
          >
            {expandable.children}
          </div>
        </Collapse>

        <div
          className={classNames(
            classes.mainContainerWrapper,
            mainContainer.className
          )}
        >
          {mainContainer.children}
        </div>
      </div>
    </div>
  );
}
