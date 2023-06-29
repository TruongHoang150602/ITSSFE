import NextLink from 'next/link';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Switch,
  TextField,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { paths } from 'src/paths';
import { wait } from 'src/utils/wait';

const initialValues = {
  name: '',
  address: '',
  square: 0,
  submit: null
};

export const RoomAddForm = (props) => {
  const { employee, ...other } = props;
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      address: Yup.string().max(255),
      name: Yup
        .string()
        .max(255)
        .required('Name is required'),
      square: Yup.number().max(15),
    }),
    onSubmit: async (values, helpers) => {
      try {
        // NOTE: Make API request
        await wait(500);
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        toast.success('Employee updated');
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong!');
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      {...other}>
      <Card sx={{width: '400px'}}>
        <CardHeader title="Add room" />
        <CardContent sx={{ pt: 0 }}>
          <Stack
            container
            spacing={3}
          >
              <TextField
                error={!!(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                label="Room name"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
              />
              <TextField
                error={!!(formik.touched.address && formik.errors.address)}
                fullWidth
                helperText={formik.touched.address && formik.errors.address}
                label="Address"
                name="address"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
              />
              <TextField
                error={!!(formik.touched.square && formik.errors.square)}
                fullWidth
                helperText={formik.touched.square && formik.errors.square}
                label="Square"
                name="square"
                type="number"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
          </Stack>
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
            disabled={formik.isSubmitting}
            type="submit"
            variant="contained"
          >
            Add
          </Button>
          <Button
            color="inherit"
            component={NextLink}
            disabled={formik.isSubmitting}
            href={paths.employees.details}
          >
            Cancel
          </Button>
        </Stack>
      </Card>
    </form>
  );
};

RoomAddForm.propTypes = {
  employee: PropTypes.object.isRequired
};
