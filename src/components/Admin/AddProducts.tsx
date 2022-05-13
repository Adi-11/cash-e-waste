import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import SelectBox from "../../Helpers/SelectBox";
import { EWasteTypes } from "./Admin";
import { CircularProgress, SelectChangeEvent } from "@mui/material";
import ProductsContext from "../../context/Products/Products.provider";
import { useSnackbar } from "notistack";

export const AddProduct: React.FC<any> = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { loading, addProduct } = useContext<any>(ProductsContext);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [name, setName] = useState("");
  const [productData, setProductData] = useState({
    company: "",
    price: 0,
    coins: 0,
    avatar: "",
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setName(event.target.value as string);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductData({
      ...productData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSave = () => {
    if (productData.company === "") {
      enqueueSnackbar("Please select a company", {
        variant: "error",
      });
      return;
    }
    if (productData.price === 0) {
      enqueueSnackbar("Please enter a price", {
        variant: "error",
      });
      return;
    }

    if (productData.coins === 0) {
      enqueueSnackbar("Please enter a coins", {
        variant: "error",
      });
      return;
    }

    if (productData.avatar === "") {
      enqueueSnackbar("Please select an avatar", {
        variant: "error",
      });
      return;
    }

    addProduct({ ...productData, name });
    setOpen(false);
  };

  return (
    <div className="absolute bottom-4 right-4 p-4">
      <Button variant="contained" onClick={handleClickOpen}>
        Add Product
      </Button>
      <Dialog
        fullScreen={fullScreen}
        fullWidth={true}
        maxWidth={"md"}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        }}
      >
        <DialogTitle id="responsive-dialog-title">{"Add Product"}</DialogTitle>
        <DialogContent>
          <div className="flex items-center justify-center mt-4">
            <div className="shadow-2xl shadow-slate-500 rounded-md py-2 mx-auto flex items-center justify-center  bg-white w-full">
              <div className="m-auto w-full px-4">
                <div
                  className={
                    "feild w-full flex items-start justify-center flex-col mb-2"
                  }
                >
                  <div className={"w-4/5 mb-3"}>
                    <p>Type of product</p>
                  </div>

                  <SelectBox
                    data={EWasteTypes}
                    label="Product Type"
                    value={name}
                    onChange={handleSelectChange}
                  />
                </div>
                <div
                  className={
                    "feild w-full flex items-start justify-start flex-col"
                  }
                >
                  <div className={"w-4/5 mb-2"}>
                    <p>Company name</p>
                  </div>
                  <input
                    className={
                      "py-[10px] px-2 outline-none border border-black rounded-md text-black text-base w-full"
                    }
                    type="text"
                    name="company"
                    placeholder="Name of company"
                    required
                    onChange={onChange}
                    value={productData.company}
                  />
                </div>
                <div
                  className={
                    "feild w-full flex items-start justify-start flex-col"
                  }
                >
                  <div className={"w-4/5 mb-2"}>
                    <p>Item price</p>
                  </div>
                  <input
                    className={
                      "py-[10px] px-2 outline-none border border-black rounded-md text-black text-base w-full"
                    }
                    type="number"
                    name="price"
                    placeholder="product price"
                    required
                    onChange={onChange}
                    value={productData.price}
                  />
                </div>
                <div
                  className={
                    "feild w-full flex items-start justify-start flex-col"
                  }
                >
                  <div className={"w-4/5 mb-2"}>
                    <p>Coins</p>
                  </div>
                  <input
                    className={
                      "py-[10px] px-2 outline-none border border-black rounded-md text-black text-base w-full"
                    }
                    type="number"
                    name="coins"
                    placeholder="Coins"
                    required
                    onChange={onChange}
                    value={productData.coins}
                  />
                </div>
                <div
                  className={
                    "feild w-full flex items-start justify-start flex-col"
                  }
                >
                  <div className={"w-4/5 mb-2"}>
                    <p>Product Aavatar</p>
                  </div>
                  <input
                    className={
                      "py-[10px] px-2 outline-none border border-black rounded-md text-black text-base w-full"
                    }
                    type="text"
                    name="avatar"
                    placeholder="Avatar URL"
                    required
                    onChange={onChange}
                    value={productData.avatar}
                  />
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            className={"btn-sm"}
            onClick={() => handleSave()}
            disabled={loading}
          >
            Add product
            {loading && (
              <CircularProgress
                size={20}
                color={"primary"}
                className={"loader"}
              />
            )}
          </button>
          <button
            className={"btn-sm"}
            onClick={() => handleClose()}
            disabled={loading}
          >
            Cancel
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
