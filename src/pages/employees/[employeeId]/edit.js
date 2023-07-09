import { useCallback, useEffect, useState } from "react";
import NextLink from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import { Avatar, Box, Chip, Container, Link, Stack, SvgIcon, Typography } from "@mui/material";
import employeesApi from "src/api/employees";
import { useMounted } from "src/hooks/use-mounted";
import { usePageView } from "src/hooks/use-page-view";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { paths } from "src/paths";
import { EmployeeEditForm } from "src/sections/employee/employee-edit-form";
import { getInitials } from "src/utils/get-initials";

const useEmployee = () => {
  const route = useRouter();
  const isMounted = useMounted();
  const [employee, setEmployee] = useState(null);

  const getEmployee = useCallback(async () => {
    try {
      const { employeeId } = route.query;
      const response = await employeesApi.getEmployeeById(employeeId);

      if (isMounted()) {
        setEmployee(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      getEmployee();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return employee;
};

const Page = () => {
  const employee = useEmployee();

  usePageView();

  if (!employee) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Dashboard: Employee Edit | Devias Kit PRO</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
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
                  }}
                  underline="hover"
                >
                  <SvgIcon sx={{ mr: 1 }}>
                    <ArrowLeftIcon />
                  </SvgIcon>
                  <Typography variant="subtitle2">Employees</Typography>
                </Link>
              </div>
              <Stack
                alignItems="flex-start"
                direction={{
                  xs: "column",
                  md: "row",
                }}
                justifyContent="space-between"
                spacing={4}
              >
                <Stack alignItems="center" direction="row" spacing={2}>
                  <Avatar
                    src={employee.avatar}
                    sx={{
                      height: 64,
                      width: 64,
                    }}
                  ></Avatar>
                  <Stack spacing={1}>
                    <Typography variant="h4">
                      {employee.first_name} {employee.last_name}
                    </Typography>
                    <Stack alignItems="center" direction="row" spacing={1}>
                      <Typography variant="subtitle2">employee_id:</Typography>
                      <Chip label={employee.id} size="small" />
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
            <EmployeeEditForm employee={employee} />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
