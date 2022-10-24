import { Grid, Button } from "@mui/material";
import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import logo from "../images/google.png";

function Login({ providers }) {
  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "black",
        height: "100vh",
        width: "100%",
        justifyContent: "center",
      }}
    >
      {Object.values(providers).map((provider) => (
        <Button key={provider.name} onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
          <Grid sx={{ borderRadius: 50, backgroundColor: "white", p: 3.5, maxWidth: 180 }}>
            <Image alt="Google Logo" width={250} height={250} src={logo} priority={true} />
            Login with {provider.name}
          </Grid>
        </Button>
      ))}
    </Grid>
  );
}

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
