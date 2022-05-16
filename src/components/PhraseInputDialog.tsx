import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import WalletContext from "../context/Wallet/Wallet.provider";
import { CircularProgress } from "@mui/material";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

export default function PhraseInputDialog() {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false);
  const { connectToExistingWallet } = React.useContext<any>(WalletContext);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [phrase, setPhrase] = React.useState<string>("");
  const navigate = useNavigate();

  const handleClickOpen = async () => {
    setOpen(true);
    // const phrase = await connectToNewWallet();
    setPhrase(phrase);
    console.log(phrase);
    setLoading(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: any) => {
    // automatically add space when length of phrare is divisible by 4
    let formattedText = e.target.value.split(" ").join("");
    if (formattedText.length > 0) {
      formattedText = formattedText.match(new RegExp(".{1,4}", "g")).join(" ");
    }

    setPhrase(formattedText);
  };

  const handleSubmit = () => {
    console.log({ phrase });
    const phraseArray = phrase.split(" ");
    if (phraseArray.length !== 12) {
      enqueueSnackbar("Please enter 12 words phrase", { variant: "error" });
      return;
    }
    connectToExistingWallet(phrase);
    navigate("/");
  };

  return (
    <>
      <Button
        variant="contained"
        size="small"
        onClick={() => handleClickOpen()}
      >
        Import Exisitng Wallet
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Please enter your phrase here!"}
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
              <input
                value={phrase}
                onChange={handleChange}
                className={
                  "py-[10px] px-2 outline-none border border-black rounded-md text-black text-base w-full"
                }
                // onPaste={(e) => {
                //   e.preventDefault();
                //   enqueueSnackbar("Copy and paste not allowed", {
                //     variant: "info",
                //   });
                //   return false;
                // }}
                // onCopy={(e) => {
                //   e.preventDefault();
                //   enqueueSnackbar("Copy and paste not allowed", {
                //     variant: "info",
                //   });
                //   return false;
                // }}
              />

              <div className="mt-2 text-xs">
                * Please enter your phrase in the above text box mantaing the
                correct order.
              </div>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button
            onClick={() => {
              handleSubmit();
            }}
            autoFocus
          >
            Import wallet
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
