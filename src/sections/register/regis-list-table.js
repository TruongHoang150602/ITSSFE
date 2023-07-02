import PropTypes from 'prop-types';
import { format } from 'date-fns';
import numeral from 'numeral';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { SeverityPill } from 'src/components/severity-pill';

const statusMap = {
  complete: 'success',
  pending: 'info',
  canceled: 'warning',
  rejected: 'error'
};

export const RegisListTable = (props) => {
  const {
    onRegisSelect,
    onPageChange,
    onRowsPerPageChange,
    regiss,
    regissCount,
    page,
    rowsPerPage,
    ...other
  } = props;

  return (
    <div {...other}>
      <Table>
        <TableBody>
          {regiss.map((regis) => {
            const createdAtMonth = format(regis.createdAt, 'LLL').toUpperCase();
            const createdAtDay = format(regis.createdAt, 'd');
            const totalAmount = numeral(regis.totalAmount).format(`${regis.currency}0,0.00`);
            const statusColor = statusMap[regis.status] || 'warning';

            return (
              <TableRow
                hover
                key={regis.id}
                onClick={() => onRegisSelect?.(regis.id)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell
                  sx={{
                    alignItems: 'center',
                    display: 'flex'
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: (theme) => theme.palette.mode === 'dark'
                        ? 'neutral.800'
                        : 'neutral.200',
                      bregisRadius: 2,
                      maxWidth: 'fit-content',
                      ml: 3,
                      p: 1
                    }}
                  >
                    <Typography
                      align="center"
                      variant="subtitle2"
                    >
                      {createdAtMonth}
                    </Typography>
                    <Typography
                      align="center"
                      variant="h6"
                    >
                      {createdAtDay}
                    </Typography>
                  </Box>
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="subtitle2">
                      {regis.number}
                    </Typography>
                    <Typography
                      color="text.secondary"
                      variant="body2"
                    >
                      Total of
                      {' '}
                      {totalAmount}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <SeverityPill color={statusColor}>
                    {regis.status}
                  </SeverityPill>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={regissCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

RegisListTable.propTypes = {
  onRegisSelect: PropTypes.func,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  regiss: PropTypes.array.isRequired,
  regissCount: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};