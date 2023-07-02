import { Fragment, useCallback, useState } from 'react';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
import ChevronDownIcon from '@untitled-ui/icons-react/build/esm/ChevronDown';
import ChevronRightIcon from '@untitled-ui/icons-react/build/esm/ChevronRight';
import DotsHorizontalIcon from '@untitled-ui/icons-react/build/esm/DotsHorizontal';
import Image01Icon from '@untitled-ui/icons-react/build/esm/Image01';
import {
  Box,
  Button,
  CardContent,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  MenuItem,
  Stack,
  SvgIcon,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';

const categoryOptions = [
  {
    label: 'Healthcare',
    value: 'healthcare'
  },
  {
    label: 'Makeup',
    value: 'makeup'
  },
  {
    label: 'Dress',
    value: 'dress'
  },
  {
    label: 'Skincare',
    value: 'skincare'
  },
  {
    label: 'Jewelry',
    value: 'jewelry'
  },
  {
    label: 'Blouse',
    value: 'blouse'
  }
];

export const PackageListTable = (props) => {
  const {
    onPageChange,
    onRowsPerPageChange,
    page,
    packages,
    packagesCount,
    rowsPerPage,
    ...other
  } = props;
  const [currentPackage, setCurrentPackage] = useState(null);

  const handlePackageToggle = useCallback((packageId) => {
    setCurrentPackage((prevPackageId) => {
      if (prevPackageId === packageId) {
        return null;
      }

      return packageId;
    });
  }, []);

  const handlePackageClose = useCallback(() => {
    setCurrentPackage(null);
  }, []);

  const handlePackageUpdate = useCallback(() => {
    setCurrentPackage(null);
    toast.success('Package updated');
  }, []);

  const handlePackageDelete = useCallback(() => {
    toast.error('Package cannot be deleted');
  }, []);

  return (
    <div {...other}>
      <Scrollbar>
        <Table >
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell >
                Name
              </TableCell>
              <TableCell>
                Price
              </TableCell>
              <TableCell>
                Description
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {packages.map((pack) => {
              const isCurrent = pack.id === currentPackage;
              const price = numeral(pack.price).format(`${pack.currency}0,0.00`);
        
              return (
                <Fragment key={pack.id}>
                  <TableRow
                    hover
                    key={pack.id}
                  >
                    <TableCell
                      padding="checkbox"
                      sx={{
                        ...(isCurrent && {
                          position: 'relative',
                          '&:after': {
                            position: 'absolute',
                            content: '" "',
                            top: 0,
                            left: 0,
                            backgroundColor: 'primary.main',
                            width: 3,
                            height: 'calc(100% + 1px)'
                          }
                        })
                      }}
                      width="25%"
                    >
                      <IconButton onClick={() => handlePackageToggle(pack.id)}>
                        <SvgIcon>
                          {isCurrent ? <ChevronDownIcon /> : <ChevronRightIcon />}
                        </SvgIcon>
                      </IconButton>
                    </TableCell>
                    <TableCell width="25%">
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        <Box
                          sx={{
                            cursor: 'pointer',
                            ml: 2
                          }}
                        >
                          <Typography variant="subtitle2">
                            {pack.name}
                          </Typography>
                          {/* <Typography
                            color="text.secondary"
                            variant="body2"
                          >
                            in {pack.category}
                          </Typography> */}
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {price}
                    </TableCell>
                    <TableCell>
                      {pack.description}
                    </TableCell>
                  </TableRow>
                  {isCurrent && (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        sx={{
                          p: 0,
                          position: 'relative',
                          '&:after': {
                            position: 'absolute',
                            content: '" "',
                            top: 0,
                            left: 0,
                            backgroundColor: 'primary.main',
                            width: 3,
                            height: 'calc(100% + 1px)'
                          }
                        }}
                      >
                        <CardContent>
                          <Grid
                            container
                            spacing={3}
                          >
                             <Grid
                              item
                              md={12}
                              xs={12}
                            >
                               <Typography variant="h6">
                                Basic details
                              </Typography>
                              <Divider sx={{ my: 2 }} />
                            </Grid>
                            <Grid
                              item
                              md={6}
                              xs={12}
                            >
                             
                              <Stack
                                container
                                spacing={3}
                              >
                              
                                  <TextField
                                    defaultValue={pack.name}
                                    fullWidth
                                    label="Package name"
                                    name="name"
                                  />
                                  <TextField
                                    defaultValue={pack.price}
                                    fullWidth
                                    label="Price"
                                    name="price"
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment position="start">
                                          {pack.currency}
                                        </InputAdornment>
                                      )
                                    }}
                                    type="number"
                                  />
                                
                              </Stack>
                            </Grid>
                            <Grid
                              item
                              md={6}
                              xs={12}
                            >
                                  <TextField
                                    defaultValue={pack.description}
                                    fullWidth
                                    label="Description"
                                    name="description"
                                    multiline
                                    rows={4}
                                  />
                                </Grid>
                               
                               
                            
                          </Grid>
                        </CardContent>
                        <Divider />
                        <Stack
                          alignItems="center"
                          direction="row"
                          justifyContent="space-between"
                          sx={{ p: 2 }}
                        >
                          <Stack
                            alignItems="center"
                            direction="row"
                            spacing={2}
                          >
                            <Button
                              onClick={handlePackageUpdate}
                              type="submit"
                              variant="contained"
                            >
                              Update
                            </Button>
                            <Button
                              color="inherit"
                              onClick={handlePackageClose}
                            >
                              Cancel
                            </Button>
                          </Stack>
                          <div>
                            <Button
                              onClick={handlePackageDelete}
                              color="error"
                            >
                              Delete package
                            </Button>
                          </div>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={packagesCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

PackageListTable.propTypes = {
  packages: PropTypes.array.isRequired,
  packagesCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};