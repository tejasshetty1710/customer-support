import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { People, Work } from '@mui/icons-material';

const Sidebar: React.FC = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' },
      }}
    >
      <List>
        <ListItem button component={Link} to="/customers">
          <ListItemIcon><People /></ListItemIcon>
          <ListItemText primary="Create a new job" />
        </ListItem>
        <ListItem button component={Link} to="/jobs">
          <ListItemIcon><Work /></ListItemIcon>
          <ListItemText primary="Jobs" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;