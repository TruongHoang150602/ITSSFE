import {Box,  Button, Card, CardActions, CardHeader, CardContent, Divider, useMediaQuery, Stack, Typography } from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export const UserCalendar = (props) => {
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const date = new Date();

  const onChange = (selectedDate) => {
    // setDate(selectedDate);
  };

  const markedDates = ['2023-06-15', '2023-06-20', '2023-06-25'];

  const tileContent = ({ date }) => {
    // Kiểm tra xem ngày hiện tại có trong mảng markedDates không
    if (markedDates.includes(date.toISOString().slice(0, 10))) {
      return <div style={{ backgroundColor: 'red', borderRadius: '50%', width: '80%', height: '80%', margin: '10%' }} />;
    }
  };

  return (
    <Card {...props}>
      <CardHeader title="Calendar" />
      <Stack 
          container 
          spacing={4}>
      <Box 
        display="flex" 
        justifyContent="center"  >
        <Calendar
          value={date}
          onChange={onChange}
          tileContent={tileContent}
        />
        
     
      </Box>
      <Typography variant="body1" 
            align="center">
          This month you have trained 3 sessions. Let&apos;s keep trying !
        </Typography>
        </Stack>
    </Card>
  );
};
