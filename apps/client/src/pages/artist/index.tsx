import { useState } from "react";
import { CustomTable } from "src/components/ui";
import { useFetchArtists } from "./api/fetch-artists";
import { useColumns } from "./columns";
import { Box, Button, Typography } from "@mui/material";
import { ActiveModal, IArtist } from "@libs/types";
import { ArtistFormModal } from "./artist-form-modal";
import { useForm } from "react-hook-form";
import {
  CreateArtistInput,
  createArtistSchema,
  defaultCreateArtistFields,
} from "./api/create-artist";
import { zodResolver } from "@hookform/resolvers/zod";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { UpdateArtistInput, updateArtistSchema } from "./api/update-artist";
import { ConfirmationModal } from "src/components/ui/confirmation-modal";
import { useDeleteArtist } from "./api/delete-artist";
import { useNavigate } from "react-router";
import { handleDownload } from "src/utils/helper-functions";
import { useImportArtist } from "./api/import-csv";

export const ArtistPage = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useFetchArtists(page);
  const [activeModal, setActiveModal] = useState<ActiveModal>("none");
  const [modalData, setModalData] = useState<IArtist | null>(null);
  const isEditMode = activeModal === "edit";
  const methods = useForm<CreateArtistInput | UpdateArtistInput>({
    mode: "onBlur",
    defaultValues: defaultCreateArtistFields,
    resolver: zodResolver(isEditMode ? updateArtistSchema : createArtistSchema),
  });
  const { mutate: deleteArtist, isPending: isDeleting } = useDeleteArtist();
  const { mutate: importArtist } = useImportArtist();

  const handleEdit = ({ row }: GridRenderCellParams<IArtist, any>) => {
    setModalData(row);
    methods.reset({
      name: row.name,
      gender: row.gender,
      dob: row.dob.toString(),
      address: row.address,
      first_release_year: row.first_release_year,
      no_of_albums_released: row.no_of_albums_released.toString(),
      id: row.id,
    });
    setActiveModal("edit");
  };

  const handleDelete = ({ row }: GridRenderCellParams<IArtist, any>) => {
    setModalData(row);
    setActiveModal("delete");
  };
  const onClose = () => {
    setModalData(null);
    setActiveModal("none");
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    if (e.target.files) {
      const file = e.target.files[0];
      formData.append("file", file);
    }
    importArtist(formData);
  };

  const columns = useColumns({ handleEdit, handleDelete });
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBlock: "1rem",
        }}
      >
        <Typography sx={{ fontWeight: 600, fontSize: "1.2rem" }}>
          Artist
        </Typography>

        <Box sx={{ display: "flex", gap: "0.5rem" }}>
          <Button component="label" htmlFor="file" variant="contained">
            Import CSV
            <input
              id="file"
              type="file"
              hidden
              accept="text/csv"
              onChange={handleImport}
            />
          </Button>
          <Button
            sx={{ marginLeft: "auto", fontWeight: 500 }}
            variant="contained"
            color="info"
            type="submit"
            onClick={() => handleDownload(`/artist/export/all`, "artist.csv")}
          >
            Export CSV
          </Button>
          <Button
            sx={{ marginLeft: "auto", fontWeight: 500 }}
            variant="contained"
            onClick={() => setActiveModal("add")}
          >
            Add
          </Button>
        </Box>
      </Box>

      <CustomTable
        rows={data?.data || []}
        columns={columns}
        rowCount={data?.meta.itemCount}
        setPage={setPage}
        isFetching={isLoading}
        onRowClick={(params) => navigate(`/artist/${params.id}/music`)}
      />
      <ArtistFormModal
        open={activeModal === "add" || activeModal === "edit"}
        onClose={onClose}
        methods={methods}
        isEditMode={isEditMode}
      />

      <ConfirmationModal
        open={activeModal === "delete"}
        onClose={onClose}
        title="Do you really want to delete this data?"
        isLoading={isDeleting}
        handleAction={() => deleteArtist(modalData!.id)}
      />
    </>
  );
};
