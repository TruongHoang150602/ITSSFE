import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import XIcon from "@untitled-ui/icons-react/build/esm/X";
import { Box, Drawer, IconButton, Stack, SvgIcon, Typography, useMediaQuery } from "@mui/material";
import { RegisDetails } from "./regis-details";
import { RegisEdit } from "./regis-edit";

const valueRegis = (regis) => {
  if (regis) return regis;
  else
    return {
      createAt: "",
      id: "",
      createdAt: "",
      customer: {
        address: "",
        email: "",
        name: "",
        phone: "",
      },
      package: "",
      number: "",
      paymentMethod: "",
      totalAmount: 0,
    };
};

export const RegisDrawer = (props) => {
  const { container, onClose, open, edit, regis } = props;
  const [isEditing, setIsEditing] = useState(edit);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));


  const handleEditOpen = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleEditCancel = useCallback(() => {
    setIsEditing(false);
  }, []);

  let content = null;
  
  const register = valueRegis(regis);

    content = (
      <div>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          sx={{
            px: 3,
            py: 2,
          }}
        >
          <Typography color="inherit" variant="h6">
            {register.number}
          </Typography>
          <IconButton color="inherit" onClick={onClose}>
            <SvgIcon>
              <XIcon />
            </SvgIcon>
          </IconButton>
        </Stack>
        <Box
          sx={{
            px: 3,
            py: 4,
          }}
        >
          {!isEditing ? (
            <RegisDetails
              onApprove={onClose}
              onEdit={handleEditOpen}
              onReject={onClose}
              regis={register}
            />
          ) : (
            <RegisEdit onCancel={handleEditCancel} onSave={handleEditCancel} regis={register} />
          )}
        </Box>
      </div>
    );

  if (lgUp) {
    return (
      <Drawer
        anchor="right"
        open={open}
        PaperProps={{
          sx: {
            position: "relative",
            width: 500,
          },
        }}
        SlideProps={{ container }}
        variant="persistent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      hideBackdrop
      ModalProps={{
        container,
        sx: {
          pointerEvents: "none",
          position: "absolute",
        },
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          maxWidth: "100%",
          width: 400,
          pointerEvents: "auto",
          position: "absolute",
        },
      }}
      SlideProps={{ container }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

RegisDrawer.propTypes = {
  container: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  // @ts-ignore
  regis: PropTypes.object,
};
