import axios, { AxiosResponse } from "axios";
import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import { GenerateDescriptionPayload, GenerateDescriptionResponse } from "@/common/types";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import { type } from "os";
import Box from "@mui/material/Box";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { Roboto_Flex } from "next/font/google";

export default function Home() {
  const [description, setDescription] = useState<string | null>();
  const [title, setTitle] = useState("");

  const [locationName, setLocationName] = useState("");
  const [locationSize, setLocationSize] = useState("");
  const [locationInhabitants, setLocationInhabitants] = useState("");
  const [locationFocalPoints, setLocationFocalPoints] = useState("");
  const [locationTrade, setLocationTrade] = useState("");
  const [locationConflict, setLocationConflict] = useState("");

  const [enableGuilds, setEnableGuilds] = useState(false);
  const [enableKeyLocations, setEnableKeyLocations] = useState(false);
  const [enablePopulationSize, setEnablePopulationSize] = useState(false);
  const [enableDieties, setEnableDieties] = useState(false);
  const [enableFactions, setEnableFactions] = useState(false);


  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  async function fetchDescription() {
    setLoading(true);

    const params: GenerateDescriptionPayload = {
      name: locationName,
      size: locationSize,
      inhabitants: locationInhabitants,
      focalPoints: locationFocalPoints,
      conflict: locationConflict,
      trade: locationTrade,
      enableGuilds,
      enableKeyLocations,
      enablePopulationSize,
      enableDieties,
      enableFactions,
    };

    const response: AxiosResponse<GenerateDescriptionResponse> =
      await axios.get("/api/description", { params });
    const description: string = response.data.description;

    setTitle(locationName);
    setDescription(description);
    setLoading(false);
  }

  function Description() {
    return (
      <>
        {loading ? (
          <Box sx={{ display: 'flex', height: "100%", top: "50%", alignItems: "center", justifyContent: "center" }}>
            <CircularProgress color="secondary" />
          </Box>
        ) : (
          <Box mx={{
            background: "white",
            padding: 20,
            borderRadius: 2,
            height: "100%",
          }}>
            <Typography variant="h3" sx={{ mb: 2 }}>{ title }</Typography>
            <Typography variant="body1" mx={{ whitespace: 'preline' }}>
              {description ? description : ""}
            </Typography>
          </Box>
        )}
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth="xl">
        <div className={styles.main}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Box component="form" noValidate autoComplete="off">
                <FormGroup>
                  <TextField
                    sx={{ mb: 2, width: 1, bgcolor: "white" }}
                    id="filled-multiline-static"
                    label="Location Name"
                    placeholder="Location Name"
                    variant="filled"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setLocationName(event.target.value);
                    }}
                  />
                  <TextField
                    sx={{ mb: 2, width: 1, bgcolor: "white" }}
                    id="filled-multiline-static"
                    label="Location Size"
                    multiline
                    placeholder="Location Size"
                    variant="filled"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setLocationSize(event.target.value);
                    }}
                  />
                  <TextField
                    sx={{ mb: 2, width: 1, bgcolor: "white" }}
                    id="filled-multiline-static"
                    label="Location Inhabitants"
                    multiline
                    placeholder="Location Inhabitants"
                    variant="filled"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setLocationInhabitants(event.target.value);
                    }}
                  />
                  <TextField
                    sx={{ mb: 2, width: 1, bgcolor: "white" }}
                    id="filled-multiline-static"
                    label="Location Focal Points"
                    multiline
                    placeholder="Location Focal Points"
                    variant="filled"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setLocationFocalPoints(event.target.value);
                    }}
                  />
                  <TextField
                    sx={{ mb: 2, width: 1, bgcolor: "white" }}
                    id="filled-multiline-static"
                    label="Location Trade"
                    multiline
                    placeholder="Location Trade"
                    variant="filled"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setLocationTrade(event.target.value);
                    }}
                  />
                  <TextField
                    sx={{ mb: 2, width: 1, bgcolor: "white" }}
                    id="filled-multiline-static"
                    label="Location Conflict"
                    multiline
                    placeholder="Location Conflict"
                    variant="filled"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setLocationConflict(event.target.value);
                    }}
                  />
                  <Box
                    sx={{
                      borderRadius: 2,
                      border: "1px solid grey",
                      padding: 2,
                      mb: 2,
                      display: "flex",
                      flexDirection: "column"
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>Optional Parameters:</Typography>
                    <FormControlLabel
                      control={
                        <Switch checked={enableGuilds} onChange={(e) => setEnableGuilds(!enableGuilds)} name="Enable Guilds" />
                      }
                      label="Enable Guilds"
                    />
                    <FormControlLabel
                      control={
                        <Switch checked={enableKeyLocations} onChange={(e) => setEnableKeyLocations(!enableKeyLocations)} name="Enable Key Locations" />
                      }
                      label="Enable Key Locations"
                    />
                    <FormControlLabel
                      control={
                        <Switch checked={enablePopulationSize} onChange={(e) => setEnablePopulationSize(!enablePopulationSize)} name="Enable Population Size" />
                      }
                      label="Enable Population Size"
                    />
                    <FormControlLabel
                      control={
                        <Switch checked={enableDieties} onChange={(e) => setEnableDieties(!enableDieties)} name="Enable Dieties" />
                      }
                      label="Enable Dieties"
                    />
                    <FormControlLabel
                      control={
                        <Switch checked={enableFactions} onChange={(e) => setEnableFactions(!enableFactions)} name="Enable Factions" />
                      }
                      label="Enable Factions"
                    />
                  </Box>
                  <Button fullWidth variant="outlined" onClick={fetchDescription}>
                    Generate Description
                  </Button>
                </FormGroup>
              </Box>
            </Grid>
            <Grid item xs={8}>
              <Description></Description>
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
}
