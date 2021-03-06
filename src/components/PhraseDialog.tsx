import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import WalletContext from "../context/Wallet/Wallet.provider";
import { CircularProgress } from "@mui/material";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

export default function PhraseDialog() {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false);
  const { connectToNewWallet } = React.useContext<any>(WalletContext);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [phrase, setPhrase] = React.useState<string>("");
  const navigate = useNavigate();

  const handleClickOpen = async () => {
    setOpen(true);
    const phrase = await connectToNewWallet();
    setPhrase(phrase);
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
          {"Here is your Secret Recovery Phrase"}
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
            <>
              <div className="font-semibold text-lg p-4 rounded-md border-[1px] bg-white">
                {phrase}
              </div>
              <div className="mt-2 text-xs">
                * Please save this phrase in a safe place. Once closed, you will
                never see this phrase again.
              </div>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(phrase);
              enqueueSnackbar("Copied to clipboard", {
                variant: "success",
              });
              setOpen(false);
              navigate("/profile");
            }}
            autoFocus
          >
            copy to clipboard
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
