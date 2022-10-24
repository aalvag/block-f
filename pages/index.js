import { useState } from "react";
import Head from "next/head";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import NavBar from "../components/NavBar";
import TableData from "../components/TableData";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import BasicModal from "../components/Modal";
import Deposits from "../components/Deposits";
import useSWR, { useSWRConfig } from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const { data, error } = useSWR("api/owner", fetcher);
  const { data: dataDeposits, error: errorDeposits } = useSWR("api/deposits", fetcher);
  const { mutate } = useSWRConfig();

  if (error) return <div>failed to load</div>;

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Head>
        <title>Manzana F 🍎</title>
        <meta name="description" content="Block F Mariano Acosta" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar open={open} toggleDrawer={toggleDrawer} />

      {/* 
      <Grid item xs={12} mt={2}>
        <TableData setOpenModal={setOpenModal} data={data} setSelected={setSelected} />
      </Grid> */}
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {/* Last news */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                  Última reunión 24/10/2022
                </Typography>
                {/* make a list with diferent points */}
                <Typography component="p" variant="body2">
                  - Agradecer a todos los estuvieron presentes. Seguir así
                </Typography>
                <Typography component="p" variant="body2">
                  - Seguimos empujando para hacer crecer el barrio
                </Typography>
                <Typography component="p" variant="body2">
                  - La seguridad es un fracaso total. Duerme en horas de trabajo, no se puede confiar en él. No cumple
                  con lo pactado. Noviembre se va a tener que ir. Se propuso a una nueva empresa de seguridad, se lo va
                  a entrevistar en proxima reunión y se va a votar (30/10/2022). Moreno pagararia un porcentaje.
                </Typography>
                <Typography component="p" variant="body2">
                  - La luz sigue siendo un problema. Lucas se va enganchar de la casa de Alfredo. Alfredo no sabe nada.
                  No hay luz al final del camino
                </Typography>
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 180,
                }}
              >
                <Deposits data={dataDeposits} error={errorDeposits} />
              </Paper>
            </Grid>
            {/* Table ingresos */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Grid sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
                  <Typography>Tabla de Propietarios</Typography>
                  <Button variant="contained" size="small" onClick={() => setOpenModal(true)}>
                    Agregar Propieatario
                  </Button>
                </Grid>
                <TableData setOpenModal={setOpenModal} data={data} setSelected={setSelected} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <BasicModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        selected={selected}
        setSelected={setSelected}
        mutate={mutate}
      />
    </Box>
  );
}

