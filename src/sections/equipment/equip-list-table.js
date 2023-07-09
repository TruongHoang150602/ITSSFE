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
  MenuItem,
  Stack,
  SvgIcon,
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

const categoryOptions = [
  {
    label: 'Strength',
    value: 'Strength'
  },
  {
    label: 'Cardio',
    value: 'Cardio'
  }
];

export const EquipmentListTable = (props) => {
  const {
    onPageChange,
    onRowsPerPageChange,
    page,
    equipments,
    equipmentsCount,
    rowsPerPage,
    editEquip,
    deleteEquip,
    ...other
  } = props;
  const [currentEquipment, setCurrentEquipment] = useState(null);

  const handleEquipmentToggle = useCallback((equipmentId) => {
    console.log(currentEquipment);
    setCurrentEquipment((prevEquipmentId) => {
      if (prevEquipmentId === equipmentId) {
        return null;
      }
      return equipmentId;
    });
  }, []);

  const handleEquipmentClose = useCallback(() => {
    setCurrentEquipment(null);
  }, []);

  const handleEquipmentUpdate = useCallback(() => {

    setCurrentEquipment(null);
    toast.success('Equipment updated');
  }, []);

  const handleEquipmentDelete = useCallback((equipId) => {
    deleteEquip(equipId);
    setCurrentEquipment(null);
    toast.error('Equipment cannot be deleted');
  }, []);

  return (
    <div {...other}>
      <Scrollbar>
        <Table sx={{ minWidth: 1200 }}>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell >
                Name
              </TableCell>
              <TableCell >
                Price
              </TableCell>
              <TableCell>
               Purchase Date
              </TableCell>
              <TableCell>
               Warranty Period
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {equipments.map((equipment) => {
              const isCurrent = equipment.id === currentEquipment;
              const price = numeral(equipment.price).format(`${equipment.currency}0,0.00`);
              return (
                <Fragment key={equipment.id}>
                  <TableRow
                    hover
                    key={equipment.id}
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
                      
                    >
                      <IconButton onClick={() => handleEquipmentToggle(equipment.id)}>
                        <SvgIcon>
                          {isCurrent ? <ChevronDownIcon /> : <ChevronRightIcon />}
                        </SvgIcon>
                      </IconButton>
                    </TableCell>
                    <TableCell >
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        {equipment.image
                          ? (
                            <Box
                              sx={{
                                alignItems: 'center',
                                backgroundColor: 'neutral.50',
                                backgroundImage: `url(${equipment.image})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                borderRadius: 1,
                                display: 'flex',
                                height: 80,
                                justifyContent: 'center',
                                overflow: 'hidden',
                                width: 80
                              }}
                            />
                          )
                          : (
                            <Box
                              sx={{
                                alignItems: 'center',
                                backgroundColor: 'neutral.50',
                                borderRadius: 1,
                                display: 'flex',
                                height: 80,
                                justifyContent: 'center',
                                width: 80
                              }}
                            >
                              <SvgIcon>
                                <Image01Icon />
                              </SvgIcon>
                            </Box>
                          )}
                        <Box
                          sx={{
                            cursor: 'pointer',
                            ml: 2
                          }}
                        >
                          <Typography variant="subtitle2">
                            {equipment.name}
                          </Typography>
                          <Typography
                            color="text.secondary"
                            variant="body2"
                          >
                            in {equipment.category}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {price}
                    </TableCell>
                    <TableCell>
                      {new Date().toISOString().slice(0, 10)}
                    </TableCell>
                    <TableCell>
                     {` ${equipment.warrantyPeriod} year`}
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
                        <CardContent >
                          <Grid
                            container
                            spacing={3}
                            sx={{
                              width: "98%"
                            }}
                          >
                            <Grid
                              item
                              md={6}
                              xs={12}
                            >
                              <Typography variant="h6">
                                Basic details
                              </Typography>
                              <Divider sx={{ my: 2 }} />
                              <Grid
                                container
                                spacing={3}
                              >
                                <Grid
                                  item
                                  md={6}
                                  xs={12}
                                >
                                  <TextField
                                    defaultValue={equipment.name}
                                    fullWidth
                                    label="Equipment name"
                                    name="name"
                                  />
                                </Grid>
                    
                                <Grid
                                  item
                                  md={6}
                                  xs={12}
                                >
                                  <TextField
                                    defaultValue={equipment.category}
                                    fullWidth
                                    label="Category"
                                    select
                                  >
                                    {categoryOptions.map((option) => (
                                      <MenuItem
                                        key={option.value}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </MenuItem>
                                    ))}
                                  </TextField>
                                </Grid>
                               
                              </Grid>
                            </Grid>
                            <Grid
                              item
                              md={6}
                              xs={12}
                            >
                              <Typography variant="h6">
                                Pricing
                              </Typography>
                              <Divider sx={{ my: 2 }} />
                              <Grid
                                container
                                spacing={3}
                              >
                                <Grid
                                  item
                                  md={6}
                                  xs={12}
                                >
                                  <TextField
                                    defaultValue={equipment.price || new Date().toISOString().slice(0, 10)}
                                    fullWidth
                                    label="Price"
                                    name="price"
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment position="start">
                                          {equipment.currency}
                                        </InputAdornment>
                                      )
                                    }}
                                    type="number"
                                  />
                                </Grid>
                                <Grid
                                  item
                                  md={6}
                                  xs={12}
                                >
                                  <TextField
                                    defaultValue={equipment.purchaseDate}
                                    fullWidth
                                    label="Purchase Date"
                                    name="purchaseDate"
                                    type="date"
                                  />
                                </Grid>
                                <Grid
                                  item
                                  md={6}
                                  xs={12}
                                  sx={{
                                    alignItems: 'center',
                                    display: 'flex'
                                  }}
                                >
                                <TextField
                                    defaultValue={equipment.warrantyPeriod}
                                    fullWidth
                                    label="warranty Period"
                                    name="warrantyPeriod"
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment position="start">
                                           year
                                        </InputAdornment>
                                      )
                                    }}
                                    type="number"
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </CardContent>
                        <Divider />
                        <Stack
                          alignItems="center"
                          direction="row"
                          justifyContent="space-between"
                          sx={{ p: 2 , width: '95%'}}
                        >
                          <Stack
                            alignItems="center"
                            direction="row"
                            spacing={2}
                          >
                            <Button
                              onClick={handleEquipmentUpdate}
                              type="submit"
                              variant="contained"
                            >
                              Update
                            </Button>
                            <Button
                              color="inherit"
                              onClick={handleEquipmentClose}
                            >
                              Cancel
                            </Button>
                          </Stack>
                          <div>
                            <Button
                              onClick={() => {handleEquipmentDelete(equipment.id)}}
                              color="error"
                            >
                              Delete equipment
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
        count={equipmentsCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

EquipmentListTable.propTypes = {
  equipments: PropTypes.array.isRequired,
  equipmentsCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};
