import { Box, Button, CircularProgress } from "@mui/material";
import { UseFormReturn } from "react-hook-form";
import {
  CustomDatePicker,
  CustomInput,
  CustomModal,
  CustomSelect,
} from "src/components/ui";
import {
  CreateArtistInput,
  defaultCreateArtistFields,
  useCreateArtist,
} from "./api/create-artist";
import { UpdateArtistInput, useUpdateArtist } from "./api/update-artist";

interface Props {
  open: boolean;
  onClose: () => void;
  methods: UseFormReturn<CreateArtistInput | UpdateArtistInput>;
  isEditMode: boolean;
}

export const ArtistFormModal: React.FC<Props> = ({
  open,
  onClose,
  methods,
  isEditMode,
}) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = methods;

  const { mutate: createArtist, isPending } = useCreateArtist();
  const { mutate: updateArtist, isPending: updatePending } = useUpdateArtist();

  const handleClose = () => {
    reset(defaultCreateArtistFields);
    onClose();
  };

  const submitHandler = (data: CreateArtistInput | UpdateArtistInput) => {
    if (isEditMode) {
      updateArtist(data as UpdateArtistInput, {
        onSuccess: () => {
          handleClose();
        },
      });
      return;
    }
    createArtist(data as CreateArtistInput, {
      onSuccess: () => {
        handleClose();
      },
    });
  };

  return (
    <CustomModal
      modalTitle={isEditMode ? "Edit Artist" : "Add Artist"}
      open={open}
      handleClose={handleClose}
      width="500px"
      footer={
        <>
          <Button type="submit" variant="contained" form="artist-form">
            {isPending || updatePending ? (
              <CircularProgress color="inherit" size={24} />
            ) : isEditMode ? (
              "Update"
            ) : (
              "Add"
            )}
          </Button>
          <Button
            type="button"
            color="error"
            variant="contained"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </>
      }
    >
      <Box
        component={"form"}
        sx={{ ".form-container + .form-container": { mt: "10px" } }}
        onSubmit={handleSubmit(submitHandler)}
        id="artist-form"
      >
        <Box className="form-container">
          <CustomInput
            name="name"
            title="Name"
            placeholder="Name"
            control={control}
            error={errors.name}
            required
          />
        </Box>

        <Box className="form-container">
          <CustomInput
            name="address"
            title="Address"
            placeholder="Address"
            control={control}
            error={errors.address}
            required
          />
        </Box>

        <Box
          className="form-container"
          sx={{
            display: "flex",
            gap: "8px",
            ".custom-select": { flexGrow: 1 },
          }}
        >
          <CustomSelect
            name="gender"
            title="Gender"
            data={[
              { value: "m", label: "Male" },
              { value: "f", label: "Female" },
              { value: "o", label: "Other" },
            ]}
            control={control}
            error={errors.gender}
            hideLegend
            required
          />

          <CustomDatePicker
            control={control}
            name={"dob"}
            label={"Date of Birth"}
            error={errors?.dob}
            format="YYYY-MM-DD"
            required
          />
        </Box>

        <Box className="form-container">
          <CustomInput
            name="first_release_year"
            title="First Release Year"
            placeholder="First Release Year"
            control={control}
            error={errors.first_release_year}
            required
          />
        </Box>

        <Box className="form-container">
          <CustomInput
            name="no_of_albums_released"
            title="Number of Albums Released"
            placeholder="Number of Albums Released"
            type="number"
            control={control}
            error={errors.no_of_albums_released}
            required
          />
        </Box>
      </Box>
    </CustomModal>
  );
};
