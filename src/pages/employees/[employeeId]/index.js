import { useCallback, useEffect, useState } from 'react';
import NextLink from 'next/link';
import Head from 'next/head';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import ChevronDownIcon from '@untitled-ui/icons-react/build/esm/ChevronDown';
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Link,
  Stack,
  SvgIcon,
  Tab,
  Tabs,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { employeesApi } from 'src/api/employees';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { paths } from 'src/paths';
import { EmployeeBasicDetails } from 'src/sections/employee/employee-basic-details';
import { EmployeeDataManagement } from 'src/sections/employee/employee-data-management';
import { getInitials } from 'src/utils/get-initials';

const useEmployee = () => {
  const isMounted = useMounted();
  const [employee, setEmployee] = useState(null);

  const getEmployee = useCallback(async () => {
    try {
      const response = await employeesApi.getEmployee();
        
      if (isMounted()) {
        setEmployee(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
      getEmployee();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  return employee;
};

const Page = () => {
  const [currentTab, setCurrentTab] = useState('details');
  const employee = useEmployee();

  usePageView();

  const handleTabsChange = useCallback((event, value) => {
    setCurrentTab(value);
  }, []);

  if (!employee) {
    return null;
  }

  return (
    <>
      <Head>
        <title>
          Dashboard: Employee Details | GymCenter
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={4}>
            <Stack spacing={4}>
              <div>
                <Link
                  color="text.primary"
                  component={NextLink}
                  href={paths.employees.index}
                  sx={{
                    alignItems: 'center',
                    display: 'inline-flex'
                  }}
                  underline="hover"
                >
                  <SvgIcon sx={{ mr: 1 }}>
                    <ArrowLeftIcon />
                  </SvgIcon>
                  <Typography variant="subtitle2">
                    Employees
                  </Typography>
                </Link>
              </div>
              <Stack
                alignItems="flex-start"
                direction={{
                  xs: 'column',
                  md: 'row'
                }}
                justifyContent="space-between"
                spacing={4}
              >
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={2}
                >
                  <Avatar
                    src={employee.avatar}
                    sx={{
                      height: 64,
                      width: 64
                    }}
                  >
                    {getInitials(employee.name)}
                  </Avatar>
                  <Stack spacing={1}>
                    <Typography variant="h4">
                      {employee.name}
                    </Typography>
                    <Stack
                      alignItems="center"
                      direction="row"
                      spacing={1}
                    >
                      <Typography variant="subtitle2">
                        user_id:
                      </Typography>
                      <Chip
                        label={employee.id}
                        size="small"
                      />
                    </Stack>
                  </Stack>
                </Stack>
                  <Button
                    color="inherit"
                    component={NextLink}
                    endIcon={(
                      <SvgIcon>
                        <Edit02Icon />
                      </SvgIcon>
                    )}
                    href={paths.employees.edit}
                  >
                    Edit
                  </Button>
              </Stack>
            </Stack>
                    <EmployeeBasicDetails
                      address1={employee.address1}
                      address2={employee.address2}
                      country={employee.country}
                      email={employee.email}
                      isVerified={!!employee.isVerified}
                      phone={employee.phone}
                      state={employee.state}
                    />
                    <EmployeeDataManagement />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;

