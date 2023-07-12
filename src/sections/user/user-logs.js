import PropTypes from "prop-types";
import { useState } from "react";
import { parseISO, format } from "date-fns";
import {
  Card,
  CardHeader,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TextField,
  Stack,
  Button,
  TableHead,
  TablePagination,
  TableRow,
  Dialog,
  IconButton,
  Typography,
  Grid,
} from "@mui/material";
import { MoreMenu } from "src/components/more-menu";
import { Scrollbar } from "src/components/scrollbar";
import AddIcon from "@mui/icons-material/Add";
// import { useAuth } from "src/hooks/use-auth";
import { createResourceId } from "src/utils/create-resource-id";

export const UserLogs = (props) => {
  const { logs = [], addLog, ...other } = props;
  const [openModal, setOpenModal] = useState(false);
  const role = "ADMIN";
  let process = null;
  if (logs && logs.process) process = logs.process;

  const onCloseModel = () => {
    setOpenModal(false);
  };

  const onClickAdd = () => {
    const newLog = {
      id: createResourceId(),
      created_at: new Date().toISOString(),
      content: document.getElementById("activity").value,
      register_id: 0,
    };
    addLog(newLog);
    setOpenModal(false);
  };
  return (
    <Card {...other}>
      <CardHeader
        action={
          <Grid container spacing={2}>
            {role === "ADMIN" && (
              <IconButton
                aria-label="delete"
                color="primary"
                onClick={() => {
                  setOpenModal(true);
                }}
              >
                <AddIcon />
              </IconButton>
            )}
            <MoreMenu />
          </Grid>
        }
        title="Recent Activity"
      />
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell>Coach</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          {process && (
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
          )}
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={process ? process.length : 0}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
        page={0}
        rowsPerPage={10}
        rowsPerPageOptions={[5, 10, 25]}
      />
      <Dialog open={openModal} onClose={onCloseModel}>
        <Card sx={{ width: "400px" }}>
          <CardHeader title="Add activity" />
          <CardContent sx={{ pt: "20px" }}>
            <TextField label="ActivityfullWidth" name="activity" id="activity" />
          </CardContent>
          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            flexWrap="wrap"
            spacing={3}
            sx={{ p: 3 }}
          >
            <Button variant="contained" onClick={onClickAdd}>
              Add
            </Button>
            <Button color="inherit" onClick={onCloseModel}>
              Cancel
            </Button>
          </Stack>
        </Card>
      </Dialog>
    </Card>
  );
};

UserLogs.propTypes = {
  logs: PropTypes.array,
  logs: PropTypes.array,
};
