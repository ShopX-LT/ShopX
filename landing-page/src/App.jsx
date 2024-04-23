import { useState } from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
// theme
import ThemeProvider from "./theme/index";

const mainText = "Making Commerce Better for Everyone";
const subText =
  "Shopify is supporting the next generation of entrepreneurs, the world’s biggest brands, and everyone in between";

function App() {
  return (
    <ThemeProvider>
      <Box
        sx={{
          background: "black",
          minHeight: "100vh",
          width: "100vw",
          color: "white",
        }}
      >
        <Container>
          <Box
            sx={{
              display: "flex",
              height: { xs: "70vh", sm: "90vh", md: "80vh" },
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography variant="h1">Nav</Typography>
            </Box>
            <Box
              sx={{
                maxWidth: { xs: "100%", sm: "70%", md: "50%" },
                display: "flex",
                flexDirection: "column",
                gap: { xs: "2rem", md: "2.5rem" },
              }}
            >
              <Typography variant="h1">{mainText}</Typography>
              <Typography variant="body1">{subText}</Typography>
            </Box>
            <Grid container>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  sx={{
                    borderRadius: "1000px",
                    paddingX: "1.5rem",
                    paddingY: ".75rem",
                    width: "100%",
                  }}
                  variant="contained"
                >
                  Start free trail
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={9}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: { xs: "start", md: "end" },
                  }}
                >
                  <Box
                    sx={{
                      paddingY: ".75rem",
                      paddingX: "1.5rem",
                      background: "rgb(107,114,115,0.4)",
                      borderRadius: "1000px",
                      border: "1px solid white",
                    }}
                  >
                    <Typography variant="body2">{mainText}</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
