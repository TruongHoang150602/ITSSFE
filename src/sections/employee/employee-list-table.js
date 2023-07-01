import { useCallback, useEffect, useMemo, useState } from 'react';
import NextLink from 'next/link';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  IconButton,
  Link,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { paths } from 'src/paths';
import { getInitials } from 'src/utils/get-initials';

const useSelectionModel = (employees) => {
  const employeeIds = useMemo(() => {
    return employees.map((employee) => employee.id);
  }, [employees]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setSelected([]);
  }, [employeeIds]);

  const selectOne = useCallback((employeeId) => {
    setSelected((prevState) => [...prevState, employeeId]);
  }, []);

  const deselectOne = useCallback((employeeId) => {
    setSelected((prevState) => {
      return prevState.filter((id) => id !== employeeId);
    });
  }, []);

  const selectAll = useCallback(() => {
    setSelected([...employeeIds]);
  }, [employeeIds]);

  const deselectAll = useCallback(() => {
    setSelected([]);
  }, []);

  return {
    deselectAll,
    deselectOne,
    selectAll,
    selectOne,
    selected
  };
};

export const EmployeeListTable = (props) => {
  const {
    employees,
    employeesCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;
  const { deselectAll, selectAll, deselectOne, selectOne, selected } = useSelectionModel(employees);

  const handleToggleAll = useCallback((event) => {
    const { checked } = event.target;

    if (checked) {
      selectAll();
    } else {
      deselectAll();
    }
  }, [selectAll, deselectAll]);

  const selectedAll = selected.length === employees.length;
  const selectedSome = selected.length > 0 && selected.length < employees.length;
  const enableBulkActions = selected.length > 0;

  return (
    <Box
      sx={{ position: 'relative' }}
      {...other}>
      {enableBulkActions && (
        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: 'center',
            backgroundColor: (theme) => theme.palette.mode === 'dark'
              ? 'neutral.800'
              : 'neutral.50',
            display: enableBulkActions ? 'flex' : 'none',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            px: 2,
            py: 0.5,
            zIndex: 10
          }}
        >
          <Checkbox
            checked={selectedAll}
            indeterminate={selectedSome}
            onChange={handleToggleAll}
          />
          <Button
            color="inherit"
            size="small"
          >
            Delete
          </Button>
          <Button
            color="inherit"
            size="small"
          >
            Edit
          </Button>
        </Stack>
      )}
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={handleToggleAll}
                />
              </TableCell>
              <TableCell>
                Name
              </TableCell>
              <TableCell>
                Address
              </TableCell>
              <TableCell>
                Phone
              </TableCell>
              <TableCell align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => {
              const isSelected = selected.includes(employee.id);
              return (
                <TableRow
                  hover
                  key={employee.id}
                  selected={isSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={(event) => {
                        const { checked } = event.target;

                        if (checked) {
                          selectOne(employee.id);
                        } else {
                          deselectOne(employee.id);
                        }
                      }}
                      value={isSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Stack
                      alignItems="center"
                      direction="row"
                      spacing={1}
                    >
                      <Avatar
                        src={employee.avatar}
                        sx={{
                          height: 42,
                          width: 42
                        }}
                      >
                        {getInitials(employee.name)}
                      </Avatar>
                      <div>
                        <Link
                          color="inherit"
                          component={NextLink}
                          href={paths.employees.details(employee.id)}
                          variant="subtitle2"
                        >
                          {employee.name}
                        </Link>
                        <Typography
                          color="text.secondary"
                          variant="body2"
                        >
                          {employee.email}
                        </Typography>
                      </div>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    {employee.address}
                  </TableCell>
                  <TableCell>
                    {employee.phone}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      component={NextLink}
                      href={paths.employees.edit(employee.id)}
                    >
                      <SvgIcon>
                        <Edit02Icon />
                      </SvgIcon>
                    </IconButton>
                    <IconButton
                    >
                      <SvgIcon>
                        <DeleteOutlineOutlinedIcon />
                      </SvgIcon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={employeesCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Box>
  );
};

EmployeeListTable.propTypes = {
  employees: PropTypes.array.isRequired,
  employeesCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};
