import React, { useContext, useEffect, useState } from "react";
import { Header } from "../Header";
import { GiCardPickup } from "react-icons/gi";
import { FaLocationArrow } from "react-icons/fa";
import { CircularProgress, Divider } from "@mui/material";
import { SelectItem } from "./SelectItem";
import { Location } from "./Location";
import OrderContext from "../../context/UserOrderContext/Order.provider";
import ProductsContext from "../../context/Products/Products.provider";
import { useSnackbar } from "notistack";

interface PickUpProps {}

type activeState = "select" | "location";

export const PickUp: React.FC<PickUpProps> = ({}) => {
  const { loading, products, getAllProducts } =
    useContext<any>(ProductsContext);
  const { addOrder } = useContext<any>(OrderContext);
  const { enqueueSnackbar } = useSnackbar();

  const [pickupData, setPickupData] = useState<any>({
    items: [
      {
        _id: "",
        quantity: 0,
      },
    ],
    location: {
      name: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
    },
  });
  const [geoLocation, setGeoLocation] = useState<any>({
    type: "Point",
    coordinates: [0, 0],
  });
  const [active, setActive] = useState<activeState>("select");

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setGeoLocation({
        type: "Point",
        coordinates: [position.coords.longitude, position.coords.latitude],
      });
    });
  }, []);

  const handleItemUpdate = (item: any, index: any) => {
    let newOrder = pickupData.items;
    newOrder[index]._id = item._id;
    newOrder[index].quantity = item.quantity;
    setPickupData({
      ...pickupData,
      items: [...newOrder, { _id: "", quantity: 0 }],
    });
  };

  const handleInputChange = (e: any) => {
    console.log(e.target.value, e.target.name);
    setPickupData({
      ...pickupData,
      location: {
        ...pickupData.location,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleGeolocation = (e: any) => {
    setGeoLocation({
      type: "Point",
      coordinates: [e.lng, e.lat],
    });
  };

  const handleAddItem = () => {
    console.log({ pickupData });
    let items = pickupData.items;
    let filtedItems = items.filter((item: any) => item._id !== "");
    if (filtedItems.length === 0) {
      enqueueSnackbar("Please select atleast one item", { variant: "error" });
      return;
    }
    let data = {
      items: filtedItems,
      location: {
        ...pickupData.location,
        geoLocation: {
          ...geoLocation,
        },
      },
    };
    console.log({ data });
    // addOrder(data);
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center">
        {loading ? (
          <CircularProgress />
        ) : (
          <div className="shadow-2xl shadow-slate-500 rounded-md py-2 m-auto mb-4 mt-10 flex items-center flex-col lg:flex-row lg:py-8 justify-center w-3/4 schedule-bg relative">
            {active === "location" && (
              <div className="absolute right-0 bottom-0 m-2 flex items-center justify-center">
                <button
                  className="bg-secondary rounded-md text-white text-sm p-1 mx-2"
                  onClick={() => handleAddItem()}
                >
                  Done
                </button>
              </div>
            )}
            <div className="w-full flex-[0.2] h-full rounded-tl-md rounded-bl-md py-4 px-8">
              <div className="w-full sm:w-full md:w-full lg:w-full flex lg:items-start lg:justify-start item-center justify-evenly flex-row text-black lg:text-white lg:flex-col  m-auto">
                <div
                  className={`flex items-center justify-center cursor-pointer py-1 px-1 rounded-md schedule-click ${
                    active === "select" ? "schedule-active" : ""
                  }`}
                  onClick={() => setActive("select")}
                >
                  <GiCardPickup />
                  <p className="ml-4">Select Item</p>
                </div>
                <div className="my-4 w-3/4 hidden md:hidden lg:block">
                  <Divider sx={{ borderColor: "white" }} />
                </div>
                <div
                  className={`flex items-center cursor-pointer  py-1 px-1 rounded-md  schedule-click ${
                    active === "location" ? "schedule-active" : ""
                  }`}
                  onClick={() => setActive("location")}
                >
                  <FaLocationArrow />
                  <p className="ml-4">Pickup Location</p>
                </div>
              </div>
            </div>
            <div className="w-full flex-[0.8] h-full rounded-tl-md rounded-bl-md p-4">
              <div className="m-auto w-4/5">
                {active === "select" ? (
                  <>
                    {pickupData.items.map((item: any, index: number) => {
                      return (
                        <SelectItem
                          key={index}
                          item={item}
                          handleItemUpdate={handleItemUpdate}
                          products={products}
                          index={index}
                        />
                      );
                    })}
                  </>
                ) : (
                  <Location
                    data={geoLocation}
                    handleInputChange={handleInputChange}
                    handleGeolocation={handleGeolocation}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
