import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PaginationRounded({ total, handlePagination }: { total: number | undefined; handlePagination: (page: number) => void }) {
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    handlePagination(value - 1); // Вызываем переданную функцию при изменении страницы
  };
  return (
    <Stack spacing={2}>
      <Pagination
        count={total}
        variant="outlined"
        shape="rounded"
        onChange={handlePageChange}
        sx={{
          color: "#fff",
          position: "fixed",
          bottom: 0,
          button: {
            color: "#fff",
            backgroundColor: "#252525",
            borderColor: "#8c8c8c",
            "&:hover": {
              backgroundColor: "#999",
            },
          },
          ".Mui-selected": {
            backgroundColor: "#fff",
            color: "#000",
            borderColor: "#000",
          },
        }}
      />
    </Stack>
  );
}
