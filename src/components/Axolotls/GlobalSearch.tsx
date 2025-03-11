import React from "react";
import { TextField } from "@mui/material";

interface GlobalSearchProps {
  search: string;
  setSearch: (value: string) => void;
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({ search, setSearch }) => {
  return (
    <TextField
      label="Buscar"
      variant="outlined"
      size="small"
      sx={{ minWidth: 500 }}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

export default GlobalSearch;
