import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import WalletContext from "../context/Wallet/Wallet.provider";
import { CircularProgress } from "@mui/material";

export default function PhraseDialog() {
  const [open, setOpen] = React.useState(false);
  const { connectToNewWallet } = React.useContext<any>(WalletContext);
  const [loading, setLoading] = React.useState<boolean>(true);

  const handleClickOpen = async () => {
    setOpen(true);
    const phrase = await connectToNewWallet();
    console.log(phrase);
    setLoading(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        className="w-1/2 mx-auto"
        onClick={() => handleClickOpen()}
      >
        Generate Secret Recovery Phrase
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          {loading ? (
            <div className=" flex items-center justify-center m-auto">
              <CircularProgress
                size={50}
                color={"success"}
                className={"loader"}
              />
            </div>
          ) : (
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
