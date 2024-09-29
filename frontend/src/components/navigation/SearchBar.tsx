import SearchIcon from "@mui/icons-material/Search";
import ScubaDivingIcon from "@mui/icons-material/ScubaDiving";
import { Box, Button, Input } from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { searchParams } from "../../app/features/searchSlice";
import { useForm } from "react-hook-form";

const SearchBar = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useAppDispatch();
  const [searchOpen, setSearchOpen] = useState(false);

  const boxStyles = (searchOpen: boolean) => ({
    display: "flex",
    justifyContent: searchOpen ? "space-between" : "initial",
    alignItems: searchOpen ? "center" : "initial",
    borderRadius: searchOpen ? 10 : "initial",
    mx: searchOpen ? 7 : "initial",
    padding: searchOpen ? 2 : "initial",
    color: searchOpen ? "black" : "initial",
    bgcolor: searchOpen ? "white" : "initial",
    position: searchOpen ? "absolute" : "initial",
    top: searchOpen ? "110%" : "initial",
    left: searchOpen ? 0 : "initial",
    right: searchOpen ? 0 : "initial",
  });

  const handleSearchParam = (data: any) => {
    dispatch(searchParams(data.searchParam));
    setSearchOpen(false);
  };

  return (
    <form onSubmit={handleSubmit(handleSearchParam)}>
      <Box sx={boxStyles(searchOpen)}>
        <SearchIcon onClick={() => setSearchOpen(true)} style={{ color: searchOpen ? "black" : "white" }} />
        <Input {...register("searchParam")} placeholder="Type something…" sx={{ display: searchOpen ? "block" : "none", border: "red" }} fullWidth />
        <Button type="submit">
          <ScubaDivingIcon style={{ display: searchOpen ? "block" : "none" }} />
        </Button>
      </Box>
    </form>
  );
};

export default SearchBar;
