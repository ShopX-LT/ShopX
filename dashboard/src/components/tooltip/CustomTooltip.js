import React from 'react';
import { Tooltip } from '@mui/material';

const CustomTooltip = ({ children, title, placement = 'top-end' }) => {
  return (
    <Tooltip
      title={title}
      placement={placement}
      slotProps={{
        tooltip: {
          sx: {
            fontSize: '12px',
          },
        },
        popper: {
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 4],
              },
            },
          ],
        },
      }}
    >
      {children}
    </Tooltip>
  );
};

export default CustomTooltip;
