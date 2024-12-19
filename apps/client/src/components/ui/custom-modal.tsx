import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { ReactNode } from "react";

interface Props {
  open: boolean;
  handleClose: () => void;
  modalTitle: string;
  children: ReactNode;
  footer: ReactNode;
}

export const CustomModal: React.FC<Props> = ({
  open,
  handleClose,
  modalTitle,
  children,
  footer,
}) => {
  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {modalTitle}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>{children}</DialogContent>
        <DialogActions>
          {footer}
        </DialogActions>
      </Dialog>
    </>
  );
};
