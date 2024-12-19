import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { CustomModal } from "./custom-modal";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  isLoading?: boolean;
  handleAction?: ()=> void;
};

export const ConfirmationModal: React.FC<Props> = ({
  open,
  onClose,
  title,
  handleAction,
  isLoading = false,
}) => {

  const handleClick = ()=>{
    handleAction?.()
    onClose()
  }

  return (
    <CustomModal handleClose={onClose} open={open} width="350px">
      <Box sx={{ padding: "20px" }}>
        <Typography fontWeight={500} fontSize={"16px"}>
          {title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
            marginTop: "15px",
          }}
        >
          <Button variant="contained" color={"error"} onClick={handleClick}>
            {isLoading ? (
              <CircularProgress color="inherit" size={24} />
            ) : (
              "Delete"
            )}
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Close
          </Button>
        </Box>
      </Box>
    </CustomModal>
  );
};
