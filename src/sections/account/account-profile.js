import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

const initialValues = (user) => {
  if (user)
    return {
      address: user.address,
      gender: user.gender,
      birthday: user.birthday,
      email: user.email,
      name: user.name,
      phone: user.phone,
      avatar: user.avatar,
      role: user.role,
    };
  return {
    address: "",
    gender: "",
    birthday: "",
    email: "",
    name: "",
    phone: "",
    avatar: "",
    role: "",
  };
};

export const AccountProfile = (props) => {
  const { user, ...other } = props;
  const initUser = initialValues(user);
  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            src={initUser.avatar}
            sx={{
              height: 80,
              mb: 2,
              width: 80,
            }}
          />
          <Typography gutterBottom variant="h5">
            {initUser.name}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {initUser.email}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {initUser.role}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button fullWidth variant="text">
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
};
