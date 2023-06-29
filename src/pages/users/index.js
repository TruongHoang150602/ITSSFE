import { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import Download01Icon from '@untitled-ui/icons-react/build/esm/Download01';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import Upload01Icon from '@untitled-ui/icons-react/build/esm/Upload01';
import { Box, Button, Card, Container, Dialog, Stack, SvgIcon, Typography } from '@mui/material';
import { usersApi } from 'src/api/users';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { UserListSearch } from 'src/sections/user/user-list-search';
import { UserListTable } from 'src/sections/user/user-list-table';
import { UserEditForm } from 'src/sections/user/user-edit-form';

const useSearch = () => {
  const [search, setSearch] = useState({
    filters: {
      query: undefined,
      hasAcceptedMarketing: undefined,
      isProspect: undefined,
      isReturning: undefined
    },
    page: 0,
    rowsPerPage: 5,
    sortBy: 'updatedAt',
    sortDir: 'desc'
  });

  return {
    search,
    updateSearch: setSearch
  };
};

const useUsers = (search) => {
  const isMounted = useMounted();
  const [state, setState] = useState({
    users: [],
    usersCount: 0
  });

  const getUsers = useCallback(async () => {
    try {
      const response = await usersApi.getUsers(search);

      if (isMounted()) {
        setState({
          users: response.data,
          usersCount: response.count
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [search, isMounted]);

  useEffect(() => {
      getUsers();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [search]);

  return state;
};

const Page = () => {

  const [openModal, setOpenModal] = useState(false)
  const { search, updateSearch } = useSearch();
  const { users, usersCount } = useUsers(search);

  usePageView();

  const handleFiltersChange = useCallback((filters) => {
    updateSearch((prevState) => ({
      ...prevState,
      filters
    }));
  }, [updateSearch]);

  const handleSortChange = useCallback((sort) => {
    updateSearch((prevState) => ({
      ...prevState,
      sortBy: sort.sortBy,
      sortDir: sort.sortDir
    }));
  }, [updateSearch]);

  const handlePageChange = useCallback((event, page) => {
    updateSearch((prevState) => ({
      ...prevState,
      page
    }));
  }, [updateSearch]);

  const handleRowsPerPageChange = useCallback((event) => {
    updateSearch((prevState) => ({
      ...prevState,
      rowsPerPage: parseInt(event.target.value, 10)
    }));
  }, [updateSearch]);

  const onCloseModel = () => {
      setOpenModal(false);
  }

  return (
    <>
      <Head>
        <title>
          Dashboard: Users List | GymCenter
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
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Users
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
            <Card>
              <UserListSearch
                onFiltersChange={handleFiltersChange}
                onSortChange={handleSortChange}
                sortBy={search.sortBy}
                sortDir={search.sortDir}
              />
              <UserListTable
                users={users}
                usersCount={usersCount}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                rowsPerPage={search.rowsPerPage}
                page={search.page}
              />
            </Card>
          </Stack>

          <Dialog 
              open={openModal} 
              onClose={(onCloseModel)} 
          >
            <UserEditForm></UserEditForm>
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
