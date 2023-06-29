import { Box, Button, Card, CardContent, CardHeader, Typography, Stack } from '@mui/material';

export const EmployeeDataManagement = (props) => (
  <Card {...props}>
    <CardHeader title="Employee Management" />
    <CardContent sx={{ pt: 0 }}>
      <Stack 
        direction="row" 
        spacing={2}
      >
        <Button
          variant="outlined"
        >
          Reset password
        </Button>

        <Button
          color="error"
          variant="outlined"
        >
          Delete Account
        </Button>
        </Stack>
    </CardContent>
  </Card>
);
