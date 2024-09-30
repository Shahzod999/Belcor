import { Typography, TableCell } from "@mui/material";
import { OrderState, OrderStatusState } from "../../app/types/basketSendOrder";
import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks";
import { selectedUserInfo } from "../../app/features/userInfoSlice";
import { useState } from "react";
import { useUpdateOrderMutation } from "../../app/api/ordersApi";
import UniversalModal from "../modal/Modal";
import { toggleSnackBar } from "../../app/features/snackBarSlice";

const RenderStatusIndicator = ({
  status,
  product,
}: {
  status: OrderStatusState | undefined;
  product: OrderState;
}) => {
  const dispatch = useAppDispatch();
  const userAdmin = useAppSelector(selectedUserInfo);
  const [updateOrder, { isLoading }] = useUpdateOrderMutation();

  const [currentStatus, setCurrentStatus] = useState(
    status || {
      received: false,
      shipped: false,
      delivered: false,
    },
  );
  const [changedOrder, setChangedOrder] = useState(product);
  const [openModal, setOpenModal] = useState(false);

  const handleStatusClick = (status: "shipped" | "received" | "delivered") => {
    if (!userAdmin?.isAdmin) return;

    const newStatus = { ...currentStatus };

    if (status === "received" && !newStatus.shipped && !newStatus.delivered) {
      newStatus.received = !newStatus.received;
    } else if (
      status === "shipped" &&
      !newStatus.delivered &&
      newStatus.received
    ) {
      newStatus.shipped = !newStatus.shipped;
    } else if (
      status === "delivered" &&
      newStatus.received &&
      newStatus.shipped
    ) {
      newStatus.delivered = !newStatus.delivered;
    } else {
      return alert("Неверный порядок изменения статуса");
    }
    setCurrentStatus(newStatus);
    setChangedOrder({ ...changedOrder, orderStatus: newStatus });
    setOpenModal(true);
  };

  const handleConfirmChange = async () => {
    const res = await updateOrder(changedOrder).unwrap();
    dispatch(toggleSnackBar({ isActive: true, text: "Status changed" }));
    console.log(res);
    setOpenModal(false);
  };

  const handleCloseModal = () => {
    setCurrentStatus(status || currentStatus);
    setOpenModal(false);
  };

  return (
    <>
      <TableCell>
        <Typography
          variant="body2"
          color="orange"
          sx={{ cursor: "pointer", opacity: currentStatus.received ? 1 : 0.5 }}
          onClick={() => handleStatusClick("received")}>
          📦 Order received
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          variant="body2"
          color="blue"
          sx={{ cursor: "pointer", opacity: currentStatus.shipped ? 1 : 0.2 }}
          onClick={() => handleStatusClick("shipped")}>
          ➡ Order shipped
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          variant="body2"
          color="green"
          sx={{ cursor: "pointer", opacity: currentStatus.delivered ? 1 : 0.5 }}
          onClick={() => handleStatusClick("delivered")}>
          ✔ Order delivered
        </Typography>
      </TableCell>

      <UniversalModal
        open={openModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmChange}
        title="Вы уверены, что хотите изменить статус?"
        isLoading={isLoading}>
        <Typography variant="body2">
          Are you agree to change the order status?
        </Typography>
      </UniversalModal>
    </>
  );
};

export default RenderStatusIndicator;
