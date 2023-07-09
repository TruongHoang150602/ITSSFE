import PropTypes from "prop-types";
import { parseISO, format } from "date-fns";
import {
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { MoreMenu } from "src/components/more-menu";
import { Scrollbar } from "src/components/scrollbar";

export const UserLogs = (props) => {
  const { logs = [], ...other } = props;
  process = logs.process;
  return (
    <Card {...other}>
      <CardHeader action={<MoreMenu />} title="Recent Activity" />
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell>Coach</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {process.map((option) => {
              const tmp = parseISO(option.createdAt);
              const createdAt = format(tmp, "yyyy/MM/dd HH:mm:ss");

              return (
                <TableRow key={option.id}>
                  <TableCell>
                    <Typography>{logs.coach.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{option.content}</Typography>
                  </TableCell>
                  <TableCell>{createdAt}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={process.length}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
        page={0}
        rowsPerPage={10}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

UserLogs.propTypes = {
  logs: PropTypes.array,
};
