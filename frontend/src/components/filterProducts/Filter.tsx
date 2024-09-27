import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";

interface FilterProps {
  categoryList: string[];
  filters: {
    category: string;
    price: string;
    name: string;
  };
  pageFilter: {
    price: string;
    name: string;
  };
  onFilterChange: (type: string) => (event: SelectChangeEvent<string>) => void;
  onPageFilterChange: (type: string) => (event: SelectChangeEvent<string>) => void;
}

const Filter: React.FC<FilterProps> = ({ categoryList, filters, pageFilter, onFilterChange, onPageFilterChange }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2, mt: 4, color: "white", bgcolor: "#171717", borderRadius: 1, p: 1, flexWrap: "wrap", width: "100%" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <FormControl variant="outlined" sx={{ minWidth: 85, border: "0.5px solid gray", borderRadius: 1, color: "white" }}>
          <InputLabel sx={{ color: "white" }}>Категория</InputLabel>
          <Select value={filters.category} onChange={onFilterChange("category")} label="Категория" sx={{ color: "white" }}>
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {categoryList.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="outlined" sx={{ minWidth: 85, border: "0.5px solid gray", borderRadius: 1, color: "white" }}>
          <InputLabel sx={{ color: "white" }}>Price</InputLabel>
          <Select value={filters.price} onChange={onFilterChange("price")} label="Цена" sx={{ color: "white" }}>
            <MenuItem value="">
              <em>No filter</em>
            </MenuItem>
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined" sx={{ minWidth: 85, border: "0.5px solid gray", borderRadius: 1, color: "white" }}>
          <InputLabel sx={{ color: "white" }}>Name</InputLabel>
          <Select value={filters.name} onChange={onFilterChange("name")} label="Название" sx={{ color: "white" }}>
            <MenuItem value="">
              <em>No filter</em>
            </MenuItem>
            <MenuItem value="asc">A-Z</MenuItem>
            <MenuItem value="desc">Z-A</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography>Page filter</Typography>
        <FormControl variant="outlined" sx={{ minWidth: 85, border: "0.5px solid gray", borderRadius: 1, color: "white" }}>
          <InputLabel sx={{ color: "white" }}>Price</InputLabel>
          <Select value={pageFilter.price} onChange={onPageFilterChange("price")} label="Цена" sx={{ color: "white" }}>
            <MenuItem value="">
              <em>No filter</em>
            </MenuItem>
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined" sx={{ minWidth: 85, border: "0.5px solid gray", borderRadius: 1, color: "white" }}>
          <InputLabel sx={{ color: "white" }}>Name</InputLabel>
          <Select value={pageFilter.name} onChange={onPageFilterChange("name")} label="Название" sx={{ color: "white" }}>
            <MenuItem value="">
              <em>No filter</em>
            </MenuItem>
            <MenuItem value="asc">A-Z</MenuItem>
            <MenuItem value="desc">Z-A</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default Filter;
