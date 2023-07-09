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
  Divider,
  Link,
  Stack,
  SvgIcon,
  Tab,
  Tabs,
  Typography,
<<<<<<< HEAD
  Unstable_Grid2 as Grid
} from '@mui/material';
import usersApi  from 'src/api/users';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { paths } from 'src/paths';
import { UserBasicDetails } from 'src/sections/user/user-basic-details';
import { UserDataManagement } from 'src/sections/user/user-data-management';
import { UserCalendar } from 'src/sections/user/user-calendar-activity';
import { UserInvoices } from 'src/sections/user/user-invoices';
import { UserMember } from 'src/sections/user/user-member';
import { UserLogs } from 'src/sections/user/user-logs';
import { getInitials } from 'src/utils/get-initials';
import { useAuth } from 'src/hooks/use-auth';
=======
  Unstable_Grid2 as Grid,
} from "@mui/material";
import usersApi from "src/api/users";
import { useMounted } from "src/hooks/use-mounted";
import { usePageView } from "src/hooks/use-page-view";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { paths } from "src/paths";
import { UserBasicDetails } from "src/sections/user/user-basic-details";
import { UserDataManagement } from "src/sections/user/user-data-management";
import { UserCalendar } from "src/sections/user/user-calendar-activity";
import { UserInvoices } from "src/sections/user/user-invoices";
import { UserMember } from "src/sections/user/user-member";
import { UserLogs } from "src/sections/user/user-logs";
import { getInitials } from "src/utils/get-initials";
>>>>>>> 09c0717cfcb3f8eb7795dcf47c307ace14f0e4f2

const tabs = [
  { label: "Details", value: "details" },
  { label: "Activity", value: "logs" },
];

const useUser = () => {
  const route = useRouter();
  const isMounted = useMounted();
  const [user, setUser] = useState(null);

  const getUser = useCallback(async () => {
    try {
      const { userId } = route.query;
      const response = await usersApi.getUserById(userId);

      if (isMounted()) {
        setUser(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      getUser();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return user;
};

const useLogs = () => {
  const route = useRouter();
  const isMounted = useMounted();
  const [logs, setLogs] = useState([]);

  const getLogs = useCallback(async () => {
    try {
      const { userId } = route.query;
      const response = await usersApi.getProcessById(userId);
      if (isMounted()) {
        setLogs(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

<<<<<<< HEAD
  const addLog = useCallback(async (newLog) => {
    try {
      const {userId} = route.query;
      const response = await usersApi.addProcessById(userId, newLog);
      getLogs();
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
=======
  useEffect(
    () => {
>>>>>>> 09c0717cfcb3f8eb7795dcf47c307ace14f0e4f2
      getLogs();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return {logs, addLog};
};

const Page = () => {
  const [currentTab, setCurrentTab] = useState("details");
  const user = useUser();
  const {logs, addLog} = useLogs();
  const role = useAuth().user.role;

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
<<<<<<< HEAD
        <title>
          Dashboard: User Details
        </title>
=======
        <title>Dashboard: User Details | Devias Kit PRO</title>
>>>>>>> 09c0717cfcb3f8eb7795dcf47c307ace14f0e4f2
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
                  <Typography variant="subtitle2">Users</Typography>
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
                    src={user.avatar}
                    sx={{
                      height: 64,
                      width: 64,
                    }}
                  >
                    {getInitials(user.name)}
                  </Avatar>
                  <Stack spacing={1}>
<<<<<<< HEAD
                    <Typography variant="h4">
                    {user.first_name} {user.last_name}
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
                        label={user.id}
                        size="small"
                      />
                    </Stack>
                  </Stack>
                </Stack>
                { role === "admin" &&
                (
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={2}
                >
=======
                    <Typography variant="h4">{user.email}</Typography>
                    <Stack alignItems="center" direction="row" spacing={1}>
                      <Typography variant="subtitle2">user_id:</Typography>
                      <Chip label={user.id} size="small" />
                    </Stack>
                  </Stack>
                </Stack>
                <Stack alignItems="center" direction="row" spacing={2}>
>>>>>>> 09c0717cfcb3f8eb7795dcf47c307ace14f0e4f2
                  <Button
                    color="inherit"
                    component={NextLink}
                    endIcon={
                      <SvgIcon>
                        <Edit02Icon />
                      </SvgIcon>
                    }
                    href={paths.users.edit(user.id)}
                  >
                    Edit
                  </Button>
<<<<<<< HEAD
=======
                  <Button
                    endIcon={
                      <SvgIcon>
                        <ChevronDownIcon />
                      </SvgIcon>
                    }
                    variant="contained"
                  >
                    Actions
                  </Button>
>>>>>>> 09c0717cfcb3f8eb7795dcf47c307ace14f0e4f2
                </Stack>
                )}
              </Stack> 
              <div>
                <Tabs
                  indicatorColor="primary"
                  onChange={handleTabsChange}
                  scrollButtons="auto"
                  sx={{ mt: 3 }}
                  textColor="primary"
                  value={currentTab}
                  variant="scrollable"
                >
                  {tabs.map((tab) => (
                    <Tab key={tab.value} label={tab.label} value={tab.value} />
                  ))}
                </Tabs>
                <Divider />
              </div>
            </Stack>
            {currentTab === "details" && (
              <div>
                <Stack container spacing={4}>
                  <UserBasicDetails
                    address={user.address}
                    gender={user.gender}
                    birthday={user.birthday}
                    email={user.email}
                    phone={user.phone}
                    role={user.role}
                  />
                  <UserMember />
                  <UserDataManagement id={user.id} />
                </Stack>
              </div>
            )}
<<<<<<< HEAD
            {currentTab === 'logs' && 
              <Stack 
                container 
                spacing={4} >
                  <UserCalendar activity = {logs} />
                <UserLogs logs={logs} addLog={addLog} />
              </Stack>}
=======
            {currentTab === "logs" && (
              <Stack container spacing={4}>
                <UserCalendar activity={logs} />
                <UserLogs logs={logs} />
              </Stack>
            )}
>>>>>>> 09c0717cfcb3f8eb7795dcf47c307ace14f0e4f2
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
