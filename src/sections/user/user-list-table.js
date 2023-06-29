import { useCallback, useEffect, useMemo, useState } from 'react';
import NextLink from 'next/link';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
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

const useSelectionModel = (users) => {
  const userIds = useMemo(() => {
    return users.map((user) => user.id);
  }, [users]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setSelected([]);
  }, [userIds]);

  const selectOne = useCallback((userId) => {
    setSelected((prevState) => [...prevState, userId]);
  }, []);

  const deselectOne = useCallback((userId) => {
    setSelected((prevState) => {
      return prevState.filter((id) => id !== userId);
    });
  }, []);

  const selectAll = useCallback(() => {
    setSelected([...userIds]);
  }, [userIds]);

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

export const UserListTable = (props) => {
  const {
    users,
    usersCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;
  const { deselectAll, selectAll, deselectOne, selectOne, selected } = useSelectionModel(users);

  const handleToggleAll = useCallback((event) => {
    const { checked } = event.target;

    if (checked) {
      selectAll();
    } else {
      deselectAll();
    }
  }, [selectAll, deselectAll]);

  const selectedAll = selected.length === users.length;
  const selectedSome = selected.length > 0 && selected.length < users.length;
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
                Location
              </TableCell>
              <TableCell>
                Orders
              </TableCell>
              <TableCell>
                Spent
              </TableCell>
              <TableCell align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => {
              const isSelected = selected.includes(user.id);
              const location = `${user.city}, ${user.state}, ${user.country}`;
              const totalSpent = numeral(user.totalSpent).format(`${user.currency}0,0.00`);

              return (
                <TableRow
                  hover
                  key={user.id}
                  selected={isSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={(event) => {
                        const { checked } = event.target;

                        if (checked) {
                          selectOne(user.id);
                        } else {
                          deselectOne(user.id);
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
                        src={user.avatar}
                        sx={{
                          height: 42,
                          width: 42
                        }}
                      >
                        {getInitials(user.name)}
                      </Avatar>
                      <div>
                        <Link
                          color="inherit"
                          component={NextLink}
                          href={paths.users.details}
                          variant="subtitle2"
                        >
                          {user.name}
                        </Link>
                        <Typography
                          color="text.secondary"
                          variant="body2"
                        >
                          {user.email}
                        </Typography>
                      </div>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    {location}
                  </TableCell>
                  <TableCell>
                    {user.totalOrders}
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {totalSpent}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      component={NextLink}
                      href={paths.users.edit}
                    >
                      <SvgIcon>
                        <Edit02Icon />
                      </SvgIcon>
                    </IconButton>
                    <IconButton
                      component={NextLink}
                      href={paths.users.details}
                    >
                      <SvgIcon>
                        <ArrowRightIcon />
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
        count={usersCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Box>
  );
};

UserListTable.propTypes = {
  users: PropTypes.array.isRequired,
  usersCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};
