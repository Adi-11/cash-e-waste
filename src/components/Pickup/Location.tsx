import { Grid } from "@mui/material";
import React, { useState } from "react";
import MapPicker from "react-google-map-picker";

interface LocationProps {
  data: any;
  handleGeolocation: any;
  handleInputChange: any;
}

export const Location: React.FC<LocationProps> = ({
  data,
  handleInputChange,
  handleGeolocation,
}) => {
  const [zoom, setZoom] = useState(15);

  const handleChangeZoom = (newZoom: any) => {
    setZoom(newZoom);
  };

  const handleChangeLocation = (lat: any, lng: any) => {
    handleGeolocation({ lat, lng });
  };

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      <Grid item sm={2} xs={12} md={12}>
        <div
          className={
            "feild w-full flex items-start justify-center flex-col mb-2"
          }
        >
          <div className={"w-4/5 mb-2"}>
            <p>Name</p>
          </div>
          <input
            className={
              "py-[10px] px-2 outline-none border border-black rounded-md text-black text-base w-full bg-transparent"
            }
            type="text"
            name="name"
            placeholder="Your name"
            required
            onChange={handleInputChange}
            value={data.name}
          />
        </div>
      </Grid>
      <Grid item sm={2} xs={12} md={12}>
        <div
          className={
            "feild w-full flex items-start justify-center flex-col mb-2"
          }
        >
          <div className={"w-4/5 mb-2"}>
            <p>Address</p>
          </div>
          <input
            className={
              "py-[10px] px-2 outline-none border border-black rounded-md text-black text-base w-full bg-transparent"
            }
            type="text"
            name="address"
            placeholder="Address"
            required
            onChange={handleInputChange}
            value={data.address}
          />
        </div>
      </Grid>
      <Grid item sm={2} xs={12} md={4}>
        <div
          className={
            "feild w-full flex items-start justify-center flex-col mb-2"
          }
        >
          <div className={"w-4/5 mb-2"}>
            <p>City</p>
          </div>
          <input
            className={
              "py-[10px] px-2 outline-none border border-black rounded-md text-black text-base w-full bg-transparent"
            }
            type="text"
            name="city"
            placeholder="City"
            required
            onChange={handleInputChange}
            value={data.city}
          />
        </div>
      </Grid>
      <Grid item sm={2} xs={12} md={4}>
        <div
          className={
            "feild w-full flex items-start justify-center flex-col mb-2"
          }
        >
          <div className={"w-4/5 mb-2"}>
            <p>Pincode</p>
          </div>
          <input
            className={
              "py-[10px] px-2 outline-none border border-black rounded-md text-black text-base w-full bg-transparent"
            }
            type="number"
            name="pincode"
            placeholder="Pincode"
            required
            onChange={handleInputChange}
            value={data.pincode}
          />
        </div>
      </Grid>
      <Grid item sm={2} xs={12} md={4}>
        <div
          className={
            "feild w-full flex items-start justify-center flex-col mb-2"
          }
        >
          <div className={"w-4/5 mb-2"}>
            <p>Country</p>
          </div>
          <input
            className={
              "py-[10px] px-2 outline-none border border-black rounded-md text-black text-base w-full bg-transparent"
            }
            type="text"
            name="country"
            placeholder="Country"
            required
            onChange={handleInputChange}
            value={data.country}
          />
        </div>
      </Grid>

      <Grid item sm={12} xs={12} md={12}>
        <MapPicker
          defaultLocation={{
            lat: data.geoLocation.coordinates[1],
            lng: data.geoLocation.coordinates[0],
          }}
          style={{ height: "50vh" }}
          mapTypeId={"roadmap" as any}
          zoom={zoom}
          onChangeLocation={handleChangeLocation}
          onChangeZoom={handleChangeZoom}
          apiKey="AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8"
        />
      </Grid>
    </Grid>
  );
};
