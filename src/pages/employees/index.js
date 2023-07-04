import { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import Download01Icon from '@untitled-ui/icons-react/build/esm/Download01';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import Upload01Icon from '@untitled-ui/icons-react/build/esm/Upload01';
import { Box, Button, Card, Container, Dialog, Stack, SvgIcon, Typography } from '@mui/material';
import employeesApi from 'src/api/employees';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { EmployeeListSearch } from 'src/sections/employee/employee-list-search';
import { EmployeeListTable } from 'src/sections/employee/employee-list-table';
import { EmployeeEditForm } from 'src/sections/employee/employee-edit-form';

const useSearch = () => {
  const [search, setSearch] = useState({
    filters: {
      query: undefined,
      role: undefined,
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

const useEmployees = (search) => {
  const isMounted = useMounted();
  const [state, setState] = useState({
    employees: [],
    employeesCount: 0
  });

  const getEmployees = useCallback(async () => {
    try {
      const response = await employeesApi.getEmployees(search);
      console.log(response);

      if (isMounted()) {
        setState({
          employees: response.data,
          employeesCount: response.count
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [search,isMounted]);

  const deleteEmployee = useCallback(async (employeeId) => {
    try {
      await employeesApi.deleteEmployeeById(employeeId);
      // Refresh the employee list
      getEmployees();
    } catch (err) {
      console.error(err);
    }
  }, [getEmployees]);

  useEffect(() => {
    getEmployees();
  }, [search]);

  return {
    state,
    deleteEmployee
  };
};

const Page = () => {

  const [openModal, setOpenModal] = useState(false)
  const { search, updateSearch } = useSearch();
  const { state, deleteEmployee } = useEmployees(search);
  
  
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

  const handleDeleteEmployee = (employeeId) => {
    deleteEmployee(employeeId);
  } 

  const onCloseModel = () => {
      setOpenModal(false);
  }



  return (
    <>
      <Head>
        <title>
          Dashboard: Employees List | GymCenter
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
            <Card>
              <EmployeeListSearch
                onFiltersChange={handleFiltersChange}
                onSortChange={handleSortChange}
                sortBy={search.sortBy}
                sortDir={search.sortDir}
              />
              {state.employees && (
              <EmployeeListTable
                employees={state.employees}
                employeesCount={state.employeesCount}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                rowsPerPage={search.rowsPerPage}
                page={search.page}
                handleDeleteEmployee={handleDeleteEmployee}
              />
              )}
            </Card>
          </Stack>

          <Dialog 
              open={openModal} 
              onClose={(onCloseModel)} 
          >
            <EmployeeEditForm onClose={onCloseModel}  ></EmployeeEditForm>
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
