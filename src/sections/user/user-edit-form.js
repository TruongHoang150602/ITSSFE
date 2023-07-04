import NextLink from 'next/link';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
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
import usersApi from 'src/api/users';

const ROLE = [{
    label: "Admin",
    value: 1
},
{
  label: "Caring staff",
  value: 2
},
{
  label: "Coach",
  value: 3
},
{
  label: "Sale",
  value: 4
},
{
  label: "Member",
  value: 5
},

]

const initialValues = (user) => {
  if(user) return {
    address: user.address || '',
    gender: user.gender || 'male',
    birthday: user.birthday || new Date().toISOString().slice(0, 10),
    email: user.email || '',
    name: user.name || '',
    phone: user.phone || '',
    role: 1,
    submit: null
  }
  return {
    address: '',
    gender: 'male',
    birthday: new Date().toISOString().slice(0, 10),
    email: '',
    name: '',
    phone: '',
    role: 1,
    submit: null
  }
}

export const UserEditForm = (props) => {
  const { user, onClose, ...other } = props;
  const router = useRouter();
  const formik = useFormik({
    initialValues:initialValues(user),
    validationSchema: Yup.object({
      address: Yup.string().max(255),
      gender: Yup.string(),
      birthday: Yup.string(),
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      name: Yup
        .string()
        .max(255)
        .required('Name is required'),
      phone: Yup.string().max(15),
      role: Yup.number().required('Role is required'),
    }),
    onSubmit: async (values, helpers) => {
      try {
        if (user){
          usersApi.updateUserById(user.id, formik.values);
          await wait(500);
          helpers.setStatus({ success: true });
          helpers.setSubmitting(false);
          toast.success('User updated');
          router.push(paths.users.index);
        }
        else{
          usersApi.createUser(formik.values);
          await wait(500);
          helpers.setStatus({ success: true });
          helpers.setSubmitting(false);
          toast.success('User created');
          onClose();
        }
        
        
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
      <Card>
        <CardHeader title="Edit User" />
        <CardContent sx={{ pt: 0 }}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                error={!!(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                label="Full name"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.name}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                error={!!(formik.touched.address && formik.errors.address)}
                fullWidth
                helperText={formik.touched.address && formik.errors.address}
                label="Address"
                name="address"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.address}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
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
           
            <Grid
              xs={12}
              md={6}
            >
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
            <Grid
              xs={12}
              md={6}
            >
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
                <MenuItem key={'male'} 
                  value={'male'}>
                  male</MenuItem>
                <MenuItem key={'female'} 
                  value={'female'}>
                  female</MenuItem>
              </TextField>
             
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
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
          
            <Grid
              xs={12}
              md={6}
            >
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
              <MenuItem 
                key={option.value} 
                value={option.value}>
              {option.label}
              </MenuItem>
              ))}
              </TextField>
            </Grid>
          </Grid>
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
            Save Changes
          </Button>
          { user ? ( <Button
            color="inherit"
            component={NextLink}
            disabled={formik.isSubmitting}
            href={paths.users.details(user.id)}
          >
            Cancel
          </Button>) :  ( <Button
            color="inherit"
            disabled={formik.isSubmitting}
            onClick={onClose}
          >
            Cancel
          </Button>)}
         
        </Stack>
      </Card>
    </form>
  );
};

UserEditForm.propTypes = {
  user: PropTypes.object,
  onClose:  PropTypes.func
};
