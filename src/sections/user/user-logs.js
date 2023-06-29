import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { MoreMenu } from 'src/components/more-menu';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';

export const UserLogs = (props) => {
  const { logs = [], ...other } = props;

  return (
    <Card {...other}>
      <CardHeader
        action={<MoreMenu />}
        title="Recent Activity"
      />
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                Coach
              </TableCell>
              <TableCell>
                Status
              </TableCell>
              <TableCell>
                Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map((log) => {
              const statusColor = log.status >= 200 && log.status < 300 ? 'success' : 'error';
              const createdAt = format(log.createdAt, 'yyyy/MM/dd HH:mm:ss');

              return (
                <TableRow key={log.id}>
                  <TableCell >
                    <Typography
                      color="text.secondary"
                      variant="caption"
                    >
                      {log.method}
                    </Typography>
                  </TableCell>
                  <TableCell >
                    <SeverityPill color={statusColor}>
                      {log.status}
                    </SeverityPill>
                  </TableCell>
                  <TableCell>
                    {createdAt}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={logs.length}
        onPageChange={() => { }}
        onRowsPerPageChange={() => { }}
        page={0}
        rowsPerPage={10}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

UserLogs.propTypes = {
  logs: PropTypes.array
};
