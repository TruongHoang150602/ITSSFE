import Head from 'next/head';
import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Stack,
  Dialog,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import Download01Icon from '@untitled-ui/icons-react/build/esm/Download01';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import Upload01Icon from '@untitled-ui/icons-react/build/esm/Upload01';
import { usePageView } from 'src/hooks/use-page-view';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { RoomCard } from 'src/sections/gym/room-card';
import { RoomAddForm } from 'src/sections/gym/room-add-form';

const useRooms = () => {
  return [
    {
      id: 'c3a2b7331eef8329e2a87c79',
      description: 'Introductory room for design and framework basics',
      media: '/assets/rooms/room-1.png',
      title: 'React and Redux Tutorial'
    },
    {
      id: '3f02f696f869ecd1c68e95a3',
      description: 'Introductory room for design and framework basics',
      media: '/assets/rooms/room-2.png',
      title: 'React and Express Tutorial'
    },
    {
      id: 'f6e76a6474038384cd9e032b',
      description: 'Introductory room for design and framework basics',
      media: '/assets/rooms/room-3.png',
      title: 'React Crash Room: Beginner'
    }
  ];
};

const Page = () => {
  const rooms = useRooms();
  const [openModal, setOpenModal] = useState(false)

  const onCloseModel = () => {
    setOpenModal(false);
  }
  usePageView();

  return (
    <>
      <Head>
        <title>
          Dashboard: Academy Dashboard | Devias Kit PRO
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
          <Container maxWidth="xl" >
          <Stack spacing={4}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Employees
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
                    color="inherit"
                    size="small"
                    startIcon={(
                      <SvgIcon>
                        <Upload01Icon />
                      </SvgIcon>
                    )}
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    size="small"
                    startIcon={(
                      <SvgIcon>
                        <Download01Icon />
                      </SvgIcon>
                    )}
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
              <Stack
                alignItems="center"
                direction="row"
                spacing={3}
              >
                <Button
                  startIcon={(
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                  onClick={() => {setOpenModal(true)}}
                >
                  Add
                </Button>
              </Stack>
              </Stack>
            <Grid container 
              spacing={{
                xs: 3,
                lg: 4
              }} >
              {rooms.map((room) => (
                <Grid
                  key={room.id}
                  xs={12}
                  md={4}
                >
                  <RoomCard room={room} />
                </Grid>
              ))}
            </Grid>
            </Stack>
            <Dialog 
              open={openModal} 
              onClose={(onCloseModel)} 
          >
            <RoomAddForm></RoomAddForm>
          </Dialog>
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
