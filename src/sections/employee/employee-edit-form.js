import NextLink from "next/link";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  MenuItem,
  Stack,
  Switch,
  TextField,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { paths } from 'src/paths';
import { wait } from 'src/utils/wait';
import employeesApi from 'src/api/employees';
import { createResourceId } from 'src/utils/create-resource-id';

const ROLE = [
  {
    label: "Admin",
    value: "admin",
  },
  {
    label: "Customer Care",
    value: "caring",
  },
  {
    label: "Train",
    value: "train",
  },
  {
    label: "Sale",
    value: "sale",
  },
];

const initialValues = (employee) => {
  if(employee) return {
    last_name: employee.last_name || '',
    first_name: employee.first_name || '',
    gender: employee.gender || 'male',
    birthday: employee.birthday.slice(0, 10),
    email: employee.email || '',
    phone: employee.phone || '',
    role: "admin",
    submit: null
  }
  return {
    first_name: '',
    last_name: '',
    gender: 'male',
    birthday: new Date().toISOString().slice(0, 10),
    email: '',
    phone: '',
    role: "admin",
    submit: null,
  };
};

export const EmployeeEditForm = (props) => {
  const { employee, onClose, ...other } = props;
  const router = useRouter();
  const formik = useFormik({
    initialValues: initialValues(employee),
    validationSchema: Yup.object({
      gender: Yup.string(),
      birthday: Yup.string(),
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      first_name: Yup
        .string()
        .max(255)
        .required('Name is required'),
      last_name: Yup.string().max(255),
      phone: Yup.string().max(15),
      role: Yup.string().required("Role is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        if (employee){
          const updateEmployee = {
            ... employee,
            ...values
          }
          employeesApi.updateEmployeeById(employee.id, updateEmployee);
          await wait(500);
          helpers.setStatus({ success: true });
          helpers.setSubmitting(false);
          toast.success("Employee updated");
          router.push(paths.employees.index);
        }
        else{
          const newEmployee = {
            createdAt: new Date().toISOString,
            password: '1234567',
            id: createResourceId(),
            ... values
          }
          employeesApi.createEmployee(newEmployee);
          await wait(500);
          helpers.setStatus({ success: true });
          helpers.setSubmitting(false);
          toast.success("Employee created");
          onClose();
        }
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
    <form onSubmit={formik.handleSubmit} {...other}>
      <Card>
        <CardHeader title="Edit Employee" />
        <CardContent sx={{ pt: 0 }}>
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.first_name && formik.errors.first_name)}
                fullWidth
                helperText={formik.touched.first_name && formik.errors.first_name}
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
                type='date'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.birthday}
              />
            </Grid>

            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                select
                id="role"
                name="role"
                label="Role"
                value={formik.values.role}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.role && Boolean(formik.errors.role)}
                helperText={formik.touched.role && formik.errors.role}
              >
                {ROLE.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          flexWrap="wrap"
          spacing={3}
          sx={{ p: 3 }}
        >
          <Button disabled={formik.isSubmitting} type="submit" variant="contained">
            Save Changes
          </Button>
          {employee ? (
            <Button
              color="inherit"
              component={NextLink}
              disabled={formik.isSubmitting}
              href={paths.employees.details(employee.id)}
            >
              Cancel
            </Button>
          ) : (
            <Button color="inherit" disabled={formik.isSubmitting} onClick={onClose}>
              Cancel
            </Button>
          )}
        </Stack>
      </Card>
    </form>
  );
};

EmployeeEditForm.propTypes = {
  employee: PropTypes.object,
  onClose: PropTypes.func,
};
