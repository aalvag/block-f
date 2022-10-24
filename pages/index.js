import { useState } from "react";
import Head from "next/head";
import Button from "@mui/material/Button";
import AppBar from "../components/Header";
import TableData from "../components/TableData";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import BasicModal from "../components/Modal";
import useSWR, { useSWRConfig } from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const { data, error } = useSWR("api/owner", fetcher);
  const { mutate } = useSWRConfig();

  if (error) return <div>failed to load</div>;

  return (
    <div>
      <Head>
        <title>Manzana F 🍎</title>
        <meta name="description" content="Block F Mariano Acosta" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBar />
      <Grid sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
        <Typography>Tabla de Propietarios</Typography>
        <Button variant="contained" size="small" onClick={() => setOpen(true)}>
          Agregar Propieatario
        </Button>
      </Grid>
      <Grid item xs={12} mt={2}>
        <TableData setOpen={setOpen} data={data} setSelected={setSelected} />
      </Grid>
      <BasicModal open={open} setOpen={setOpen} selected={selected} setSelected={setSelected} mutate={mutate} />
    </div>
  );
}

