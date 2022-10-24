import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const validationSchema = yup.object({
  batch: yup.string().required("Lote is requerido"),
  // email: yup.string("Ingrese su email").email("Ingrese un email valido").required("Email is requerido"),
  //name: yup.string().required("Nombre is requerido"),
  //phone: yup.string().required("Telefono is requerido"),
  //paymentMethods: yup.string().required("Metodo de pago is requerido"),
  //security: yup.boolean().required("Seguridad is requerido"),
  //payment: yup.boolean().required("Pago is requerido"),
});

export default function BasicModal({ openModal, setOpenModal, selected, setSelected, mutate }) {
  const [disabled, setDisabled] = useState(true);

  const updateOwner = async (id, data) => {
    const res = await fetch(`/api/owner/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res.json();
  };

  const formik = useFormik({
    initialValues: {
      batch: selected?.batch || "",
      email: selected?.email || "",
      name: selected?.name || "",
      phone: selected?.phone || "",
      paymentMethods: selected?.paymentMethods || "",
      status: selected?.status || "",
      security: selected?.security || false,
      payment: selected?.payment || 0,
    },
    validationSchema,
    onSubmit: async (values) => {
      if (selected) {
        await updateOwner(selected.id, values);
      } else {
        const res = await fetch("/api/owner", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        const data = await res.json();
      }

      setOpenModal(false);
      mutate("api/owner");
      mutate("api/deposits");
    },
    enableReinitialize: true,
  });

  const handleClose = () => {
    setSelected(null);
    setOpenModal(false);
  };
  const handleEdit = () => setDisabled(false);

  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <Dialog open={openModal} onClose={handleClose}>
            <form onSubmit={formik.handleSubmit}>
              <DialogTitle>
                <Button onClick={handleClose}>Cancel</Button>
              </DialogTitle>
              <DialogContent>
                <DialogContentText>Puede editar los datos de la persona</DialogContentText>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <TextField
                      margin="dense"
                      id="batch"
                      name="batch"
                      label="Lote"
                      type="text"
                      fullWidth
                      disabled={disabled}
                      value={formik.values.batch}
                      onChange={formik.handleChange}
                      error={formik.touched.batch && Boolean(formik.errors.batch)}
                      helperText={formik.touched.batch && formik.errors.batch}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      margin="dense"
                      id="email"
                      name="email"
                      label="Correo Electronico"
                      type="email"
                      fullWidth
                      disabled={disabled}
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      margin="dense"
                      id="name"
                      name="name"
                      label="Nombre"
                      type="text"
                      fullWidth
                      disabled={disabled}
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      margin="dense"
                      id="phone"
                      name="phone"
                      label="Telefono"
                      type="phone"
                      fullWidth
                      disabled={disabled}
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      error={formik.touched.phone && Boolean(formik.errors.phone)}
                      helperText={formik.touched.phone && formik.errors.phone}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      margin="dense"
                      id="paymentMethods"
                      name="paymentMethods"
                      label="Medio de Pago"
                      type="text"
                      fullWidth
                      disabled={disabled}
                      value={formik.values.paymentMethods}
                      onChange={formik.handleChange}
                      error={formik.touched.paymentMethods && Boolean(formik.errors.paymentMethods)}
                      helperText={formik.touched.paymentMethods && formik.errors.paymentMethods}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      margin="dense"
                      id="status"
                      name="status"
                      label="Observaciones"
                      type="text"
                      fullWidth
                      disabled={disabled}
                      value={formik.values.status}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      margin="dense"
                      id="payment"
                      name="payment"
                      label="Pago"
                      type="number"
                      fullWidth
                      disabled={disabled}
                      value={formik.values.payment}
                      onChange={formik.handleChange}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          id="security"
                          name="security"
                          checked={formik.values.security}
                          onChange={formik.handleChange}
                          color="success"
                          disabled={disabled}
                        />
                      }
                      label="Seguridad"
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button type="submit">Guardar</Button>
                <Button onClick={handleEdit}>Editar</Button>
              </DialogActions>
            </form>
          </Dialog>
        </div>
      </Modal>
    </div>
  );
}
