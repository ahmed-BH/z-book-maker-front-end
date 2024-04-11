import { useState } from 'react';
import PropTypes from 'prop-types';

import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { listClasses } from '@mui/material/List';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

export default function ButtonAsSelect({ menuItems, startIcon, onItemSelected, tooltipText = ''}) {
  const [open, setOpen] = useState(null);
  const [selectedItem, setSelectedItem] = useState(menuItems.find((item) => item.isSelected));

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const onClickMenuItem = (item) => {
    setOpen(null);
    onItemSelected(item.value);
    setSelectedItem(item);
  };

  return (
    <>
    <Tooltip title={tooltipText}>
      <Button
        disableRipple
        color="inherit"
        onClick={handleOpen}
        endIcon={<Iconify icon={open ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}>
          {startIcon}
          <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
            {selectedItem?.label || 'None'}
          </Typography>
        </Stack>
      </Button>
    </Tooltip>

      <Menu
        open={!!open}
        anchorEl={open}
        onClose={() => setOpen(null) }
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              [`& .${listClasses.root}`]: {
                p: 0,
              },
            },
          },
        }}
      >
        {menuItems.map((option) => (
          <MenuItem key={option.value} selected={option.value === selectedItem?.value} onClick={() => onClickMenuItem(option) }>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

ButtonAsSelect.propTypes = {
  menuItems: PropTypes.array,
  startIcon: PropTypes.element,
  onItemSelected: PropTypes.func,
  tooltipText: PropTypes.string,
};

