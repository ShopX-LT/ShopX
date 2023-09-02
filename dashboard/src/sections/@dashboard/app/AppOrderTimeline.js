// @mui
import PropTypes from 'prop-types';
import { Card, Typography, CardHeader, CardContent } from '@mui/material';
import { Timeline, TimelineDot, TimelineItem, TimelineContent, TimelineSeparator, TimelineConnector } from '@mui/lab';
// utils
import { fToNow } from '../../../utils/formatTime';
import { fCurrency } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

AppOrderTimeline.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default function AppOrderTimeline({ title, subheader, list, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <CardContent
        sx={{
          '& .MuiTimelineItem-missingOppositeContent:before': {
            display: 'none',
          },
        }}
      >
        <Timeline>
          {list.map((item, index) => (
            <OrderItem key={item.id} item={item} isLast={index === list.length - 1 || index === 5} />
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------

// OrderItem.propTypes = {
//   isLast: PropTypes.bool,
//   item: PropTypes.shape({
//     time: PropTypes.instanceOf(Date),
//     title: PropTypes.string,
//     type: PropTypes.string,
//   }),
// };

function OrderItem({ item, isLast }) {
  const { orderedBy, total, dateOrdered, deliveryAddress } = item;
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot color={'error'} />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {fToNow(dateOrdered)}
        </Typography>
        <Typography variant="subtitle2">{fCurrency(total)}</Typography>
        {/* <Typography variant="subtitle2">{orderedBy}</Typography> */}
        <Typography variant="subtitle2">
          {deliveryAddress.city}, {deliveryAddress.state}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}
