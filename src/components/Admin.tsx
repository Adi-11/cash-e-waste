import { SelectChangeEvent } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import ProductsContext from "../context/Products/Products.provider";
import SelectBox from "../Helpers/SelectBox";
import { Header } from "./Header";

interface AdminProps {}

const EWasteTypes = [
  "Fridges, freezers and other cooling equipment",
  "Computers and telecommunications equipment",
  "Consumer electronic devices and solar panels",
  "TVs, monitors and screens",
  "LED bulbs",
  "Vending machines",
];

export const Admin: React.FC<AdminProps> = ({}) => {
  const { loading, getAllProducts, getCompanies } =
    useContext<any>(ProductsContext);
  const [name, setName] = useState("");
  const [productData, setProductData] = useState({
    company: "",
    price: 0,
    coins: 0,
    avatar: "",
  });

  useEffect(() => {
    getAllProducts();
    getCompanies();
  }, []);

  const handleSelectChange = (event: SelectChangeEvent) => {
    setName(event.target.value as string);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductData({
      ...productData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center mt-4">
        <div className="shadow-2xl shadow-slate-500 rounded-md py-8 mx-auto flex items-center justify-center  bg-white sm:mx-6 md:w-3/4 sm:w-full w-full lg:w-1/2">
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
              className={"feild w-full flex items-start justify-start flex-col"}
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
              className={"feild w-full flex items-start justify-start flex-col"}
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
              className={"feild w-full flex items-start justify-start flex-col"}
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
              className={"feild w-full flex items-start justify-start flex-col"}
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
    </>
  );
};
