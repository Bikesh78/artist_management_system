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
  children: ReactNode;
  modalTitle?: string;
  footer?: ReactNode;
  width?: string;
}

export const CustomModal: React.FC<Props> = ({
  open,
  handleClose,
  modalTitle,
  children,
  footer,
  width,
}) => {
  return (
    <>
      <Dialog onClose={handleClose} aria-labelledby={modalTitle} open={open}>
        {modalTitle && (
          <DialogTitle sx={{ m: 0, p: 2 }} id={modalTitle}>
            {modalTitle}
          </DialogTitle>
        )}
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
        <DialogContent sx={{ width }} dividers>
          {children}
        </DialogContent>
        {footer && <DialogActions>{footer}</DialogActions>}
      </Dialog>
    </>
  );
};
