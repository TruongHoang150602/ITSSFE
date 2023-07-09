import { useCallback, useEffect, useState } from "react";
import NextLink from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import ChevronDownIcon from "@untitled-ui/icons-react/build/esm/ChevronDown";
import Edit02Icon from "@untitled-ui/icons-react/build/esm/Edit02";
import { useCallback, useEffect, useState } from "react";
import NextLink from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import ChevronDownIcon from "@untitled-ui/icons-react/build/esm/ChevronDown";
import Edit02Icon from "@untitled-ui/icons-react/build/esm/Edit02";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Link,
  Stack,
  SvgIcon,
  Tab,
  Tabs,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import employeesApi from "src/api/employees";
import { useMounted } from "src/hooks/use-mounted";
import { usePageView } from "src/hooks/use-page-view";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { paths } from "src/paths";
import { EmployeeBasicDetails } from "src/sections/employee/employee-basic-details";
import { EmployeeDataManagement } from "src/sections/employee/employee-data-management";
import { getInitials } from "src/utils/get-initials";
  Unstable_Grid2 as Grid,
} from "@mui/material";
import employeesApi from "src/api/employees";
import { useMounted } from "src/hooks/use-mounted";
import { usePageView } from "src/hooks/use-page-view";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { paths } from "src/paths";
import { EmployeeBasicDetails } from "src/sections/employee/employee-basic-details";
import { EmployeeDataManagement } from "src/sections/employee/employee-data-management";
import { getInitials } from "src/utils/get-initials";

const useEmployee = () => {
  const route = useRouter();
  const isMounted = useMounted();
  const [employee, setEmployee] = useState(null);

  const getEmployee = useCallback(async () => {
    try {
      const { employeeId } = route.query;
      const { employeeId } = route.query;
      const response = await employeesApi.getEmployeeById(employeeId);
      console.log(response);
      console.log(response);
      if (isMounted()) {
        setEmployee(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
  useEffect(
    () => {
      getEmployee();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
    []
  );

  return employee;
};

const Page = () => {
  const [currentTab, setCurrentTab] = useState("details");
  const [currentTab, setCurrentTab] = useState("details");
  const employee = useEmployee();
  console.log(employee);

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
        <title>Dashboard: Employee Details</title>
        <title>Dashboard: Employee Details</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
          py: 8,
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
                    alignItems: "center",
                    display: "inline-flex",
                    alignItems: "center",
                    display: "inline-flex",
                  }}
                  underline="hover"
                >
                  <SvgIcon sx={{ mr: 1 }}>
                    <ArrowLeftIcon />
                  </SvgIcon>
                  <Typography variant="subtitle2">Employees</Typography>
                  <Typography variant="subtitle2">Employees</Typography>
                </Link>
              </div>
              <Stack
                alignItems="flex-start"
                direction={{
                  xs: "column",
                  md: "row",
                  xs: "column",
                  md: "row",
                }}
                justifyContent="space-between"
                spacing={4}
              >
                <Stack alignItems="center" direction="row" spacing={2}>
                <Stack alignItems="center" direction="row" spacing={2}>
                  <Avatar
                    src={employee.avatar}
                    sx={{
                      height: 64,
                      width: 64,
                      width: 64,
                    }}
                  >
                    {getInitials(`${employee.first_name} ${employee.last_name}`)}
                  </Avatar>
                  <Stack spacing={1}>
                    <Typography variant="h4">
                      {employee.first_name} {employee.last_name}
                      {employee.first_name} {employee.last_name}
                    </Typography>
                    <Stack alignItems="center" direction="row" spacing={1}>
                      <Typography variant="subtitle2">user_id:</Typography>
                      <Chip label={employee.id} size="small" />
                    <Stack alignItems="center" direction="row" spacing={1}>
                      <Typography variant="subtitle2">user_id:</Typography>
                      <Chip label={employee.id} size="small" />
                    </Stack>
                  </Stack>
                </Stack>
                <Button
                  color="inherit"
                  component={NextLink}
                  href={paths.employees.edit(employee.id)}
                  endIcon={
                    <SvgIcon>
                      <Edit02Icon />
                    </SvgIcon>
                  }
                >
                  Edit
                </Button>
                <Button
                  color="inherit"
                  component={NextLink}
                  href={paths.employees.edit(employee.id)}
                  endIcon={
                    <SvgIcon>
                      <Edit02Icon />
                    </SvgIcon>
                  }
                >
                  Edit
                </Button>
              </Stack>
            </Stack>
            <EmployeeBasicDetails
              gender={employee.gender}
              birthday={employee.birthday}
              email={employee.email}
              phone={employee.phone}
              role={employee.role}
            />
            <EmployeeDataManagement id={employee.id} />
            <EmployeeBasicDetails
              gender={employee.gender}
              birthday={employee.birthday}
              email={employee.email}
              phone={employee.phone}
              role={employee.role}
            />
            <EmployeeDataManagement id={employee.id} />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
