import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Button,
  Card,
  CardContent,
  MenuItem,
  Stack,
  TextField,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
// import { FileDropzone } from 'src/components/file-dropzone';
import { QuillEditor } from "src/components/quill-editor";
import { paths } from "src/paths";
import roomsApi from "src/api/rooms";

const categoryOptions = [
  {
    label: "Strength",
    value: "Strength",
  },
  {
    label: "Cardio",
    value: "Cardio",
  },
];

const initialValues = {
  name: "",
  category: "",
  description: "",
  images: "",
  price: 0,
  purchaseDate: new Date().toISOString().slice(0, 10),
  warrantyPeriod: 0,
  submit: null,
};

const validationSchema = Yup.object({
  name: Yup.string().max(255).required(),
  description: Yup.string().max(5000),
  images: Yup.string(),
  price: Yup.number().min(0),
  purchaseDate: Yup.string(),
  warrantyPeriod: Yup.number().min(0),
  category: Yup.string().max(255),
});

export const EquipmentCreateForm = (props) => {
  const { gymId, ...other } = props;
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        roomsApi.addEquipToRoomById(gymId, formik.values);
        toast.success("Equipment created");
        router.push(paths.gyms.details(gymId));
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong!");
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} {...props}>
      <Stack spacing={4}>
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid xs={12} md={4}>
                <Typography variant="h6">Basic details</Typography>
              </Grid>
              <Grid xs={12} md={8}>
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.name && formik.errors.name)}
                    fullWidth
                    helperText={formik.touched.name && formik.errors.name}
                    label="Equipment Name"
                    name="name"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                  <TextField
                    error={!!(formik.touched.description && formik.errors.description)}
                    fullWidth
                    helperText={formik.touched.description && formik.errors.description}
                    label="Description"
                    name="description"
                    multiline
                    rows={4}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.description}
                  />
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid xs={12} md={4}>
                <Stack spacing={1}>
                  <Typography variant="h6">Images</Typography>
                  <Typography color="text.secondary" variant="body2">
                    Images will appear in the store front of your website.
                  </Typography>
                </Stack>
              </Grid>
              <Grid xs={12} md={8}>
                <TextField
                  error={!!(formik.touched.media && formik.errors.media)}
                  fullWidth
                  disabled
                  helperText={formik.touched.media && formik.errors.media}
                  name="media"
                  type="file"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid xs={12} md={4}>
                <Typography variant="h6">Pricing</Typography>
              </Grid>
              <Grid xs={12} md={8}>
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.price && formik.errors.price)}
                    fullWidth
                    label="Price"
                    name="price"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="number"
                    value={formik.values.price}
                  />
                  <TextField
                    error={!!(formik.touched.purchaseDate && formik.errors.purchaseDate)}
                    fullWidth
                    label="Purchase Date"
                    name="purchaseDate"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="date"
                    value={formik.values.purchaseDate}
                  />
                  <TextField
                    error={!!(formik.touched.warrantyPeriod && formik.errors.warrantyPeriod)}
                    fullWidth
                    label="Warranty Period"
                    name="warrantyPeriod"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="number"
                    value={formik.values.warrantyPeriod}
                  />
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid xs={12} md={4}>
                <Typography variant="h6">Category</Typography>
              </Grid>
              <Grid xs={12} md={8}>
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.category && formik.errors.category)}
                    fullWidth
                    label="Category"
                    name="category"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    select
                    value={formik.values.category}
                  >
                    {categoryOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Stack alignItems="center" direction="row" justifyContent="flex-end" spacing={1}>
          <Button color="inherit">Cancel</Button>
          <Button type="submit" variant="contained">
            Create
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};
