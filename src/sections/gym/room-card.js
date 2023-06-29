import NextLink from 'next/link';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Link,
  Stack,
  Typography
} from '@mui/material';
import { paths } from 'src/paths';

export const RoomCard = (props) => {
  const { room } = props;

  return (
    <Card variant="outlined">
      <CardMedia
        image={room.media}
        component={NextLink} 
        href={paths.gyms.details}
        sx={{ height: 180 }}
      />
      <CardContent >
        <Link
          color="text.primary"
          underline="none"
          variant="subtitle1"
          component={NextLink} 
          href={paths.gyms.details}
        >
          {room.title}
        </Link>
        <Typography
          color="text.secondary"
          sx={{ mt: 1 }}
          variant="body2"
        >
          {room.description}
        </Typography>
      </CardContent>
      <Stack
          direction={{
            xs: 'column',
            sm: 'row'
          }}
          flexWrap="wrap"
          spacing={3}
          sx={{ p: 3 }}
        >
          <Button
            variant="contained"
          >
            Edit
          </Button>
          <Button
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </Stack>
    </Card>
  );
};

RoomCard.propTypes = {
  room: PropTypes.object.isRequired
};
