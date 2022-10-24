import Image from "next/image";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSession, signIn, signOut } from "next-auth/react";

const AuthBtn = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const isLoggedIn = session?.user;
  const isLoggedOut = !isLoggedIn && !loading;

  // if (status === "loading") {
  //   return (
  //     <div className="auth-btn">
  //       <div className="auth-info">Loading.....</div>
  //     </div>
  //   );
  // }
  // if (status === "unauthenticated") {
  //   return (
  //     <div className="auth-btn">
  //       <button onClick={() => signIn()}>Login</button>
  //     </div>
  //   );
  // }
  const handleLogin = () => {
    if (isLoggedOut) {
      signIn();
    } else {
      signOut();
    }
  };

  return (
    // <div className="auth-btn">
    //   <div className="auth-info pr-2">
    //     <Image src={session.user.image} alt={session.user.name} width={30} height={30} className="rounded-full" />
    //     <p>Hi, {session.user.name}</p>
    //   </div>
    //   <div className="dropdown">
    //     <button className="dropdown-btn !py-1">
    //       ICONO
    //       {/* <ChevronDownIcon className="icon" /> */}
    //     </button>
    //     <ul className="dropdown-list opacity-0 invisible">
    //       <li className="dropdown-item">
    //         <button onClick={() => signOut()} className="cta">
    //           Logout
    //         </button>
    //       </li>
    //     </ul>
    //   </div>
    // </div>
    <>
      {/* <LoadingButton onClick={handleLogin} loading={true}>
        <Avatar alt={session?.user.name} src={session?.user.image} />
      </LoadingButton> */}
      <Tooltip title="Open settings">
        <IconButton onClick={handleLogin} sx={{ p: 0 }}>
          <Avatar src={session?.user.image} alt={session?.user.name} width={30} height={30} />
        </IconButton>
      </Tooltip>
    </>
  );
};
export default AuthBtn;
