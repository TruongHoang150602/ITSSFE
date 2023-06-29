import { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  Container,
  Link,
  Stack,
  SvgIcon,
  Typography
} from '@mui/material';
import { equipmentsApi } from 'src/api/equipments';
import { BreadcrumbsSeparator } from 'src/components/breadcrumbs-separator';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { paths } from 'src/paths';
import { EquipmentListSearch } from 'src/sections/equipment/equip-list-search';
import { EquipmentListTable } from 'src/sections/equipment/equip-list-table';

const useSearch = () => {
  const [search, setSearch] = useState({
    filters: {
      name: undefined,
      category: [],
      status: [],
      inStock: undefined
    },
    page: 0,
    rowsPerPage: 5
  });

  return {
    search,
    updateSearch: setSearch
  };
};

const useEquipments = (search) => {
  const isMounted = useMounted();
  const [state, setState] = useState({
    equipments: [],
    equipmentsCount: 0
  });

  const getEquipments = useCallback(async () => {
    try {
      const response = await equipmentsApi.getEquipments(search);

      if (isMounted()) {
        setState({
          equipments: response.data,
          equipmentsCount: response.count
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [search, isMounted]);

  useEffect(() => {
      getEquipments();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [search]);

  return state;
};

const EquipmentList = () => {
  const { search, updateSearch } = useSearch();
  const { equipments, equipmentsCount } = useEquipments(search);

  usePageView();

  const handleFiltersChange = useCallback((filters) => {
    updateSearch((prevState) => ({
      ...prevState,
      filters
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

  return (
    <>
      <Head>
        <title>
          Dashboard: Equipment List | Devias Kit PRO
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
                  Equipments
                </Typography>
                <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                  <Link
                    color="text.primary"
                    component={NextLink}
                    href={paths.dashboard.admin}
                    variant="subtitle2"
                  >
                    Dashboard
                  </Link>
                  <Link
                    color="text.primary"
                    component={NextLink}
                    href={paths.gyms.index}
                    variant="subtitle2"
                  >
                    Equipments
                  </Link>
                  <Typography
                    color="text.secondary"
                    variant="subtitle2"
                  >
                    List
                  </Typography>
                </Breadcrumbs>
              </Stack>
              <Stack
                alignItems="center"
                direction="row"
                spacing={3}
              >
                <Button
                  component={NextLink}
                  href={paths.gyms.create}
                  startIcon={(
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Add
                </Button>
              </Stack>
            </Stack>
            <Card>
              <EquipmentListSearch onFiltersChange={handleFiltersChange} />
              <EquipmentListTable
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                page={search.page}
                equipments={equipments}
                equipmentsCount={equipmentsCount}
                rowsPerPage={search.rowsPerPage}
              />
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

EquipmentList.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default EquipmentList;
