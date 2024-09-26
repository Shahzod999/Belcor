import React from "react";
import { Box, Modal, Typography, Button } from "@mui/material";
import Loader from "../Loader";

interface UniversalModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  isLoading?: boolean;
  children: React.ReactNode;
}

const UniversalModal: React.FC<UniversalModalProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  isLoading,
  children,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          outline: "none",
          gap: 2,
        }}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Typography variant="h6" mb={2}>
              {title}
            </Typography>
            {children}
            <Button variant="contained" color="primary" onClick={onConfirm}>
              Подтвердить
            </Button>
            <Button variant="outlined" color="secondary" onClick={onClose}>
              Отменить
            </Button>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default UniversalModal;
