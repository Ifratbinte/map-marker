import { Grid, Typography } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Box, Container } from "@mui/system";
import axios from "axios";
import * as React from "react";
import { useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

interface PlaceType {
  id: number;
  longtitude: number;
  latitude: number;
  address: string;
  city: string;
  area: string;
  postCode: number;
  pType: string;
  uCode: string;
}

function MapMarker() {
  const [value, setValue] = React.useState<PlaceType | null>(null);
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState<readonly PlaceType[]>([]);

  console.log({ value, inputValue, options });

  const getLocationData = async (key: string) => {
    const res = await axios.get(`https://barikoi.xyz/v1/api/search/autocomplete/NDYyMTo4OFFBV0I1UDFO/place?q=${key}`);
    console.log({ res });
    if (res.data.places.length) {
      setOptions(res.data.places);
    }
  };

  useEffect(() => {
    if (!inputValue) {
      return;
    }
    getLocationData(inputValue);
  }, [inputValue]);

  return (
    <Container sx={{ height: "100vh", width: "800px", position: "absolute", top: 0, left: 0, background: "#fff" }}>
      <Box sx={{ py: 3 }}>
        <img src="/src/assets/img/logo.png" alt="" />
      </Box>
      <Autocomplete
        id="map-marker"
        sx={{ width: 750 }}
        getOptionLabel={(option) => (typeof option === "string" ? option : option.address)}
        filterOptions={(option, state) => {
          console.log(option, state);
          return option.filter((option) => {
            return (
              option.area.toLowerCase().includes(state.inputValue.toLowerCase()) ||
              option.city.toLowerCase().includes(state.inputValue.toLowerCase()) ||
              option.address.toLowerCase().includes(state.inputValue.toLowerCase())
            );
          });
        }}
        options={options}
        autoComplete
        includeInputInList
        filterSelectedOptions
        value={value}
        noOptionsText="No locations"
        onChange={(event: any, newValue: PlaceType | null) => {
          setOptions(newValue ? [newValue, ...options] : options);
          setValue(newValue);
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => <TextField {...params} label="Add a location" fullWidth />}       
        renderOption={(props, option) => {
          return (
            <li {...props}>
              <Grid item sx={{ wordWrap: "break-word", display: "flex", alignItems: "center", padding: 1, width: "100%", borderBottom: "1px solid #f4f4f4" }}>
                <FaMapMarkerAlt style={{ fontSize: 24, paddingRight: 10 }} />
                <Box>
                  <Typography variant="h5" color="text.dark">
                    {option.address}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    {option.area}
                  </Typography>
                  <Typography variant="h6" color="text.secondary" sx={{ display: "flex" }}>
                    Thana : {option.city} , District : {option.city}
                  </Typography>
                </Box>
              </Grid>
            </li>
          );
        }}
      />
    </Container>
  );
}
export default MapMarker;
