import PropTypes from "prop-types";
import { useCallback, useState, useEffect } from "react";
import { format } from "date-fns";
import { Button, Stack, TextField, Typography, Autocomplete, Box } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMounted } from "src/hooks/use-mounted";
import employeesApi from "src/api/employees";
import packagesApi from "src/api/packages";
import { toast } from "react-hot-toast";
import { createResourceId } from "src/utils/create-resource-id";

const useCoach = (coachName) => {
  const isMounted = useMounted();
  const [state, setState] = useState({
    coachSelect: [],
    coach: null,
  });

  const getEmployees = useCallback(async () => {
    try {
      const response = await employeesApi.getEmployees({
        filters: {
          query: undefined,
          role: "coach",
        },
        page: 0,
        rowsPerPage: 5,
        sortBy: "updatedAt",
        sortDir: "desc",
      });
      console.log(coachName);

      if (isMounted()) {
        const coachSelect = response.data;
        let filteredCoach = null;
        if (coachName) {
          coachSelect.filter((item) =>{
            if(coachName.toLowerCase().includes(item.first_name.toLowerCase()))
              filteredCoach = item;
        });
        }
        const result = { coachSelect: coachSelect, coach: filteredCoach };
        setState(result);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    getEmployees();
  }, []);

  return state;
};

const usePackages = () => {
  const isMounted = useMounted();
  const [state, setState] = useState();

  const getPackages = useCallback(async () => {
    try {
      const response = await packagesApi.getPackages();

      if (isMounted()) {
        setState(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    getPackages();
  }, []);

  return state;
};

const validationSchema = Yup.object().shape({
  customer: {
    name: Yup.string(),
    email: Yup.string(),
  },
  totalAmount: Yup.number(),
});

export const RegisEdit = (props) => {
  const { onCancel, regis, setIsEditing, createRegis, updateRegis } = props;
  const { coachSelect, coach } = useCoach(regis.coach);
  console.log(coach);
  const pack = usePackages();

  const formik = useFormik({
    initialValues: {
      customer: {
        name: regis.customer.name,
        email: regis.customer.email,
      },
      totalAmount: regis.totalAmount,
    },
    // validationSchema: validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        if (regis.id !== null) {
          const updateRegister = {
            ...regis,
            ...values,
            coach: document.getElementById("coachSelect").value,
            package: document.getElementById("packSelect").value,
            // totalAmount: document.getElementById('totalAmountField').value,
          };
          updateRegis(regis.id, updateRegister);
          await wait(500);
          helpers.setStatus({ success: true });
          helpers.setSubmitting(false);
          toast.success("Register updated");
        } else {
          const newRegis = {
            ...regis,
            ...values,
            id: createResourceId(),
            coach: document.getElementById("coachSelect").value,
            package: document.getElementById("packSelect").value,
            // totalAmount: document.getElementById('totalAmountField').value,
          };
          createRegis(newRegis);
          await wait(500);
          helpers.setStatus({ success: true });
          helpers.setSubmitting(false);
          toast.success("Register created");
        }
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong!");
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
      setIsEditing(false);
    },
  });

  const onChangePackage = (value) => {
    if (value) document.getElementById("totalAmountField").value = value.price;
    return;
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={3}>
        <Typography variant="h6">{(regis.id && "Edits") || "New register"}</Typography>
        <Stack spacing={3}>
          <TextField disabled fullWidth label="ID" name="id" value={regis.id} />
          <TextField
            disabled
            fullWidth
            label="Created By"
            name="createdBy"
            value={regis.createdBy}
          />
          <TextField disabled fullWidth label="Date" name="date" value={regis.createdAt} />
          <TextField
            fullWidth
            label="Customer name"
            name="customer.name"
            value={formik.values.customer.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.customer?.name && formik.errors.customer?.name}
            helperText={formik.touched.customer?.name && formik.errors.customer?.name}
          />
          <TextField
            fullWidth
            label="Email"
            name="customer.email"
            value={formik.values.customer.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.customer?.email && formik.errors.customer?.email}
            helperText={formik.touched.customer?.email && formik.errors.customer?.email}
          />
          <Autocomplete
            id="coachSelect"
            fullWidth
            options={coachSelect}
            defaultValue={coach}
            autoHighlight
            getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 }, borderRadius: "50%" }}
                {...props}
              >
                <img loading="lazy" width="40" src={option.avatar} alt="" />
                {`${option.first_name} ${option.last_name}`}
              </Box>
            )}
            renderInput={(params) => <TextField {...params} label="Coach" />}
          />
          <Autocomplete
            id="packSelect"
            fullWidth
            options={pack}
            autoHighlight
            getOptionLabel={(option) => option.name}
            onChange={(event, value) => onChangePackage(value)}
            // onBlur={formik.handleBlur}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 }, borderRadius: "50%" }}
                {...props}
              >
                {option.name}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Package"
                // error={formik.touched.package && formik.errors.package}
                // helperText={formik.touched.package && formik.errors.package}
              />
            )}
          />
          <TextField
            id="totalAmountField"
            fullWidth
            label="Total Amount"
            name="totalAmount"
            InputProps={{
              readOnly: true,
            }}
            value={formik.values.totalAmount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.totalAmount && formik.errors.totalAmount}
            helperText={formik.touched.totalAmount && formik.errors.totalAmount}
          />
        </Stack>
        <Stack alignItems="center" direction="row" flexWrap="wrap" spacing={2}>
          <Button color="primary" type="submit" size="small" variant="contained">
            Save changes
          </Button>
          <Button color="inherit" onClick={onCancel} size="small">
            Cancel
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

RegisEdit.propTypes = {
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  regis: PropTypes.object,
};
