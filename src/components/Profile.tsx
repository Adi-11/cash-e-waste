import {
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
  Button,
  CardActions,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import AuthContext from "../context/Authentication/Auth.provider";
import { Header } from "./Header";
import { IoMdAddCircleOutline } from "react-icons/io";
import { BiImport } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Orders from "./Orders";
import WalletContext from "../context/Wallet/Wallet.provider";
import PhraseInputDialog from "./PhraseInputDialog";
interface ProfileProps {}

export const Profile: React.FC<ProfileProps> = ({}) => {
  const { getUserProfile, user, loading, token } = useContext<any>(AuthContext);
  const { getBalance } = useContext<any>(WalletContext);
  const navigate = useNavigate();
  useEffect(() => {
    getUserProfile();
    if (user.wallet) {
      getBalance();
    }
    console.log(user);
  }, []);

  return (
    <>
      <Header />
      {loading && (
        <div className=" flex items-center justify-center h-screen m-auto">
          <CircularProgress size={50} color={"inherit"} className={"loader"} />
        </div>
      )}
      {!user.wallet ? (
        <div className="flex flex-col justify-center items-center mt-44 opacity-80">
          <h3 className="text-2xl mb-5 font-extrabold">
            Hello {user.name}!!! New to Cash-e-waste?
          </h3>
          <div className="flex space-x-5 justify-center items-center">
            <Card
              sx={{ minWidth: 275 }}
              className="flex text-center items-center justify-center flex-col p-5"
            >
              <CardContent className="flex justify-center items-center flex-col space-y-5">
                <IoMdAddCircleOutline size={50} />
                <Typography variant="body2" sx={{ fontSize: 25 }}>
                  Yes! I want to create a new wallet
                </Typography>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  This will create a new wallet and generate a new phrase
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => navigate("/profile/createNewWallet")}
                >
                  Create New Wallet
                </Button>
              </CardActions>
            </Card>
            <Card
              sx={{ minWidth: 275 }}
              className="flex text-center items-center justify-center flex-col p-5"
            >
              <CardContent className="flex justify-center items-center flex-col space-y-5">
                <BiImport size={50} />
                <Typography variant="body2" sx={{ fontSize: 25 }}>
                  No! I already have an existing wallet
                </Typography>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Import your existing wallet using your Secret Recovery Phrase
                </Typography>
              </CardContent>
              <CardActions>
                <PhraseInputDialog />
              </CardActions>
            </Card>
          </div>
        </div>
      ) : (
        <>
          <div className="text-center m-2">
            <Typography variant="h4">My Wallet</Typography>
          </div>

          <Orders />
        </>
      )}
    </>
  );
};
