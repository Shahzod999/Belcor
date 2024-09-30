import SearchIcon from "@mui/icons-material/Search";
import ScubaDivingIcon from "@mui/icons-material/ScubaDiving";
import { Box, Button, Input } from "@mui/material";
import { useEffect, useState } from "react";
import { searchParams } from "../../app/features/searchSlice";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../app/hooks/hooks";
import useDebounce from "../../app/hooks/debounce";

const SearchBar = () => {
  const { register, watch } = useForm();
  const dispatch = useAppDispatch();
  const [searchOpen, setSearchOpen] = useState(false);

  const searchParam = watch("searchParam");

  const debouncedSearchParam = useDebounce(searchParam, 900);

  useEffect(() => {
    if (debouncedSearchParam) {
      dispatch(searchParams(debouncedSearchParam));
    }
  }, [debouncedSearchParam, dispatch]);

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

  const handleSearchParam = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchOpen(false);
  };

  return (
    <form onSubmit={handleSearchParam}>
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
