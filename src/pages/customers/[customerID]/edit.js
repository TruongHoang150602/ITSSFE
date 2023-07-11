import { useCallback, useEffect, useState } from "react";
import NextLink from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
<<<<<<< HEAD:src/pages/users/[userId]/edit.js
import { Avatar, Box, Chip, Container, Link, Stack, SvgIcon, Typography, Dialog } from "@mui/material";
import usersApi from "src/api/users";
=======
import { Avatar, Box, Chip, Container, Link, Stack, SvgIcon, Typography } from "@mui/material";
import customersApi from "src/api/customers";
>>>>>>> 7e3026b4720b9fa153bf01586e71d122ef8b3fdb:src/pages/customers/[customerID]/edit.js
import { useMounted } from "src/hooks/use-mounted";
import { usePageView } from "src/hooks/use-page-view";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { paths } from "src/paths";
import { UserEditForm } from "src/sections/user/user-edit-form";
import { getInitials } from "src/utils/get-initials";

const useCustomer = () => {
  const route = useRouter();
  const isMounted = useMounted();
  const [customer, setCustomer] = useState(null);

  const getCustomer = useCallback(async () => {
    try {
      const { customerId } = route.query;
      const response = await customersApi.getCustomerById(customerId);

      if (isMounted()) {
        setCustomer(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      getCustomer();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return customer;
};

const Page = () => {
  const customer = useCustomer();

  usePageView();

  if (!customer) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Dashboard: Customer Edit | Devias Kit PRO</title>
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
                  href={paths.users.index}
                  sx={{
                    alignItems: "center",
                    display: "inline-flex",
                  }}
                  underline="hover"
                >
                  <SvgIcon sx={{ mr: 1 }}>
                    <ArrowLeftIcon />
                  </SvgIcon>
                  <Typography variant="subtitle2">Customers</Typography>
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
                    src={customer.avatar}
                    sx={{
                      height: 64,
                      width: 64,
                    }}
                  >
                    {getInitials(customer.name)}
                  </Avatar>
                  <Stack spacing={1}>
                    <Typography variant="h4">{customer.email}</Typography>
                    <Stack alignItems="center" direction="row" spacing={1}>
                      <Typography variant="subtitle2">customer_id:</Typography>
                      <Chip label={customer.id} size="small" />
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
            <UserEditForm user={customer} />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
