import { useState } from "react";
import { CustomTable } from "src/components/ui";
import { useFetchUsers } from "./api/fetch-users";
import { useColumns } from "./columns";
import { Box, Button } from "@mui/material";

type ActiveModal = "none" | "add" | 'edit' | "delete"

export const UserPage = () => {
  const [page, setPage] = useState(1);
  const { data, isFetching } = useFetchUsers(page);
  const columns = useColumns()
  const [activeModal, setActiveModal] = useState<ActiveModal>("none")

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          sx={{ marginLeft: "auto" }}
          variant="contained"
          onClick={() => setActiveModal("add")}
        >
          Add
        </Button>
      </Box>
      <CustomTable
        rows={data?.data ?? []}
        columns={columns}
        rowCount={data?.meta.itemCount}
        setPage={setPage}
        isFetching={isFetching}
      />
    </>
  );
};
