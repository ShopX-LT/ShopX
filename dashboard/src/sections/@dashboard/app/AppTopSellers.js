import React from 'react';
// @mui
import PropTypes from 'prop-types';
import { Box, Stack, Link, Card, Button, Divider, Typography, CardHeader } from '@mui/material';
import Scrollbar from '../../../components/scrollbar';
import { fNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

function AppTopSellers({ title, subheader, list = [], ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3 }}>
          {list.map((item, index) => (
            <Item key={item.id} item={item} index={index} />
          ))}
        </Stack>
      </Scrollbar>
    </Card>
  );
}

AppTopSellers.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array,
};

//  ------------------------
function Item({ item, index }) {
  const { imagesUrl, title, sales } = item;

  return (
    <Stack direction={'row'} alignItems={'center'} spacing={2} justifyContent={'space-between'} py={1}>
      <Stack direction={'row'} justifyContent={'start'} alignItems={'center'}>
        <Box
          component="img"
          alt={title}
          src={imagesUrl[0]}
          mr={2}
          sx={{ width: 80, height: 80, borderRadius: 1.5, flexShrink: 0, objectFit: 'cover' }}
        />
        <Box sx={{ maxWidth: 240, flexGrow: 1 }}>
          <Typography variant="subtitle2">{title}</Typography>
        </Box>
      </Stack>

      <Stack direction={'column'} alignItems={'center'}>
        <Typography variant="body1" fontWeight={600} sx={{ color: 'text.success' }}>
          {fNumber(sales)}
        </Typography>
        <Typography variant="caption">sales</Typography>
      </Stack>
    </Stack>
  );
}
export default AppTopSellers;
