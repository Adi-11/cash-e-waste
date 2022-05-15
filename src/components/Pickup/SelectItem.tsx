import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useState } from "react";

interface SelectItemProps {
  item: any;
  handleItemUpdate: any;
  products: any[];
  index: number;
}

export const SelectItem: React.FC<SelectItemProps> = ({
  item,
  handleItemUpdate,
  products,
  index,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState<any>({
    _id: "",
    quantity: item.quantity,
  });

  const handleInputChange = (e: any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddItem = () => {
    if (data.quantity === 0) {
      enqueueSnackbar("Please enter a valid quantity", { variant: "error" });
      return;
    }
    if (data._id === "") {
      enqueueSnackbar("Please select a product", { variant: "error" });
      return;
    }
    handleItemUpdate(data, index);
  };

  return (
    <>
      <div className="absolute right-0 bottom-0 m-2 flex items-center justify-center">
        <button
          className="bg-secondary rounded-md text-white text-sm p-1 mx-2"
          onClick={() => handleAddItem()}
        >
          Save & Add More
        </button>
      </div>
      <div className="w-full flex items-center justify-center my-2">
        <div className="w-4/5">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              {"Select Product"}
            </InputLabel>
            <Select
              value={data._id}
              label={"Select Product"}
              onChange={handleInputChange}
              name="_id"
            >
              {products.map((item: any, index: number) => {
                return (
                  <MenuItem key={index} value={item._id}>
                    {item.company} | {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className="w-1/4 mx-2">
          <TextField
            id="outlined-basic"
            label="Product Quantity"
            variant="outlined"
            name="quantity"
            value={data.quantity}
            onChange={handleInputChange}
            type="number"
          />
        </div>
      </div>
    </>
  );
};
