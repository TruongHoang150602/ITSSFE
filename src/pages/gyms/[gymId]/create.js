import NextLink from 'next/link';
import Head from 'next/head';
import { Box, Breadcrumbs, Container, Link, Stack, Typography } from '@mui/material';
import { BreadcrumbsSeparator } from 'src/components/breadcrumbs-separator';
import { usePageView } from 'src/hooks/use-page-view';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { paths } from 'src/paths';
import { EquipmentCreateForm } from 'src/sections/equipment/equipment-create-form';

const EquipmentCreate = () => {
  usePageView();

  return (
    <>
      <Head>
        <title>
          Dashboard: Equipment Create | Devias Kit PRO
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
          <Stack spacing={3}>
            <Stack spacing={1}>
              <Typography variant="h4">
                Create a new equipment
              </Typography>
              <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                <Link
                  color="text.primary"
                  component={NextLink}
                  href={paths.dashboard.index}
                  variant="subtitle2"
                >
                  Dashboard
                </Link>
                <Link
                  color="text.primary"
                  component={NextLink}
                  href={paths.dashboard.equipments.index}
                  variant="subtitle2"
                >
                  Equipments
                </Link>
                <Typography
                  color="text.secondary"
                  variant="subtitle2"
                >
                  Create
                </Typography>
              </Breadcrumbs>
            </Stack>
            <EquipmentCreateForm />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

EquipmentCreate.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default EquipmentCreate;
