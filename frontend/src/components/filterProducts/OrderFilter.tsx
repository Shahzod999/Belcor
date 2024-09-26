import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface OrderFilterProps {
  statusFilters: string[];
  status: string;
  onStatusChange: (event: SelectChangeEvent<string>) => void;
}

const OrderFilter = ({ statusFilters, status, onStatusChange }: OrderFilterProps) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 4 }}>
      <FormControl variant="outlined" sx={{ minWidth: 120 }}>
        <InputLabel>Status</InputLabel>
        <Select value={status} onChange={onStatusChange} label="Status">
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          {statusFilters.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default OrderFilter;
