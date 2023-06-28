import { useCallback, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Link,
  Stack,
  SvgIcon,
  TextField,
  Typography
} from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import { paths } from 'src/paths';

const initialValues = {
  email: 'demo@devias.io',
  password: 'Password123!',
  submit: null
};

const validationSchema = Yup.object({
    email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required')
});



const Page = () => {

  const router = useRouter();
  const auth = useAuth();
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        await auth.signIn(values.email, values.password);
        router.push('/');
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  const handleSkip = useCallback(
    () => {
      auth.skip();
      router.push('/dashboard/admin');
    },
    [auth, router]
  );

  const handleSubmit = 
    (e) => {
      console.log("Submit")
    };

  return (
      <Card elevation={16}>
        <CardHeader
          subheader={(
            <Typography
              color="text.secondary"
              variant="body2"
            >
              Don&apos;t have an account?
              &nbsp;
              <Link
                href="/auth/register"
                underline="hover"
                variant="subtitle2"
              >
                Register
              </Link>
            </Typography>
          )}
          sx={{ pb: 0 }}
          title="Log in"
        />
        <CardContent>
          <form
            noValidate
            onSubmit={formik.handleSubmit}
          >
            <Stack spacing={3}>
              <TextField
                 error={!!(formik.touched.email && formik.errors.email)}
                 fullWidth
                 helperText={formik.touched.email && formik.errors.email}
                 label="Email Address"
                 name="email"
                 onBlur={formik.handleBlur}
                 onChange={formik.handleChange}
                 type="email"
                 value={formik.values.email}
              />
              <TextField
                error={!!(formik.touched.password && formik.errors.password)}
                fullWidth
                helperText={formik.touched.password && formik.errors.password}
                label="Password"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.password}
              />
            </Stack>
            {formik.errors.submit && (
                  <Typography
                    color="error"
                    sx={{ mt: 3 }}
                    variant="body2"
                  >
                    {formik.errors.submit}
                </Typography>
              )}
            <Button
              fullWidth
              size="large"
              sx={{ mt: 2 }}
              type="submit"
              variant="contained"
            >
              Log In
            </Button>
            <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 2 }}
                  onClick={handleSkip}
                >
                  Skip authentication
                </Button>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: 3
              }}
            >
              <Link
                href="/auth/forgot-password"
                underline="hover"
                variant="subtitle2"
              >
                Forgot password?
              </Link>
            </Box>
          </form>
        </CardContent>
      </Card>
  );
};

Page.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default Page;
