import { useCallback, useState } from "react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import {
  Box,
  Button,
  MenuItem,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import usersApi from "src/api/customers";
import { useRouter } from "next/navigation";

const initialValues = (user) => {
  if (user)
    return {
      first_name: user.first_name,
      last_name: user.last_name,
      gender: user.gender,
      birthday: user.birthday,
      email: user.email,
      phone: user.phone,
      submit: null,
    };
  return {
    first_name: "",
    gender: "male",
    birthday: new Date().toISOString().slice(0, 10),
    email: "",
    last_name: "",
    phone: "",
    submit: null,
  };
};

export const AccountProfileDetails = (props) => {
  const { user, ...other } = props;
  const router = useRouter();
  const formik = useFormik({
    initialValues: initialValues(user),
    validationSchema: Yup.object({
      first_name: Yup.string().max(255),
      gender: Yup.string(),
      birthday: Yup.string(),
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      last_name: Yup.string().max(255),
      phone: Yup.string().max(15),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const updateUser = {
          ...user,
          ...values,
        };
        console.log(updateUser);
        usersApi.updateUserById(user.id, updateUser);
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        toast.success("User updated");
        router.push("/");
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong!");
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  error={!!(formik.touched.last_name && formik.errors.last_name)}
                  fullWidth
                  helperText={formik.touched.last_name && formik.errors.last_name}
                  label="First name"
                  name="first_name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  required
                  value={formik.values.first_name}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  error={!!(formik.touched.last_name && formik.errors.last_name)}
                  fullWidth
                  helperText={formik.touched.last_name && formik.errors.last_name}
                  label="Last name"
                  name="last_name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.last_name}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email address"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  required
                  value={formik.values.email}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  error={!!(formik.touched.phone && formik.errors.phone)}
                  fullWidth
                  helperText={formik.touched.phone && formik.errors.phone}
                  label="Phone number"
                  name="phone"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  select
                  error={!!(formik.touched.gender && formik.errors.gender)}
                  fullWidth
                  helperText={formik.touched.gender && formik.errors.gender}
                  label="Gender"
                  name="gender"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.gender}
                >
                  <MenuItem key={"male"} value={"male"}>
                    male
                  </MenuItem>
                  <MenuItem key={"female"} value={"female"}>
                    female
                  </MenuItem>
                </TextField>
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  error={!!(formik.touched.birthday && formik.errors.birthday)}
                  fullWidth
                  helperText={formik.touched.birthday && formik.errors.birthday}
                  label="Birthday"
                  name="birthday"
                  type="date"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.birthday}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button type="submit" variant="contained">
            Save changes
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
