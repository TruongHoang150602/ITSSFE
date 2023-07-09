import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import { Avatar, Box, Button, Chip, Container, Stack, Unstable_Grid2 as Grid } from "@mui/material";
import usersApi from "src/api/users";
import { useMounted } from "src/hooks/use-mounted";
import { usePageView } from "src/hooks/use-page-view";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { UserCalendar } from "src/sections/user/user-calendar-activity";
import { UserLogs } from "src/sections/user/user-logs";
import { useAuth } from "src/hooks/use-auth";

const useLogs = (userId) => {
  const isMounted = useMounted();
  const [logs, setLogs] = useState([]);

  const getLogs = useCallback(async () => {
    try {
      const response = await usersApi.getProcessById(1);
      console.log(response);
      if (isMounted()) {
        setLogs(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [userId, isMounted]);

  useEffect(
    () => {
      getLogs();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return logs;
};

const Page = () => {
  const user = useAuth().user;
  const logs = useLogs(user.id);

  usePageView();

  const handleTabsChange = useCallback((event, value) => {
    setCurrentTab(value);
  }, []);

  if (!user) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Dashboard: User Details | Devias Kit PRO</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={4}>
            <UserCalendar activity={logs} />
            <UserLogs logs={logs} />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
