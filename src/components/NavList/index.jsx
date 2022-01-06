import { List, ListItem, ListItemButton } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import Typography from '../Typography';

export default function NavList({ title, list }) {
  NavList.propTypes = {
    title: PropTypes.string.isRequired,
    list: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  };

  return (
    <List
      subheader={
        <div style={{ padding: 15 }}>
          <Typography variant="body">{title}</Typography>
        </div>
      }
    >
      {list.map((item) => (
        <ListItem key={item.id} component="div" disablePadding>
          <ListItemButton
            onClick={() =>
              document.getElementById(item.id).scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest',
              })
            }
          >
            <Typography variant="body">{item.value}</Typography>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
