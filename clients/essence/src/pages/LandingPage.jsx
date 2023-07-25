import React from "react";
import { Box, Container, Typography, Stack, Button } from "@mui/material";

const bgColor = "#000";
const salesPitch =
  "Harness the potential of an advanced e-commerce platform, engineered to optimize client engagement and enhance your income. Don’t overlook this chance!";
const LandingPage = () => {
  return (
    <Box
      sx={{ backgroundColor: bgColor, minHeight: "100vh", maxWidth: "100vw" }}
    >
      {" "}
      {/* This will prevent the white sides that are left from using container, it can be removed when the body css is set*/}
      <Container>
        <Box
          sx={{
            background: bgColor,
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100%",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "94px", md: "143px", lg: "202px" },
              fontWeight: "bold",
            }}
          >
            SHOPX
          </Typography>
          <Typography variant="body" marginTop={2} marginBottom={4}>
            Your one stop solution to building your online store
          </Typography>

          <Stack
            direction={"row"}
            spacing={{ xs: 2, md: 4 }}
            useFlexGap
            flexWrap="wrap"
          >
            {/* <Typography variant="body">Features</Typography>
            <Typography variant="body">Features</Typography>
            <Typography variant="body">Features</Typography> */}
          </Stack>

          <p>
            Visit demo{" "}
            <a href="/tshop" style={{ textDecoration: "underline" }}>
              Essence
            </a>{" "}
          </p>
          <Typography variant="body">(Site is under construction)</Typography>
        </Box>
        {/* ====================Next Page============================= */}
        <Box
          sx={{
            background: bgColor,
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100%",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "32px", lg: "48" },
              fontWeight: "bold",
              margin: "40px",
            }}
          >
            Skyrocket Sales!
          </Typography>
          <Box
            sx={{ width: { xs: "350px", md: "500px" }, textAlign: "center" }}
          >
            <Typography variant="body">{salesPitch}</Typography>
          </Box>
          <Button variant="contained" color="secondary" sx={{ margin: "40px" }}>
            Create your store
          </Button>
        </Box>
        {/* ADD CAROUSEL OF ORDER, PRODUCT AND PAYMENT MANAGEMENT */}

        <Box
          sx={{
            background: bgColor,
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            width: "100%",
          }}
        >
          <Stack
            my={4}
            direction={{ xs: "column-reverse", md: "row" }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Box
              m={4}
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                maxWidth: "500px",
              }}
            >
              <Typography
                variant="h3"
                my={2}
                sx={{
                  fontSize: { xs: "32px", lg: "48", fontWeight: "bold" },
                }}
              >
                Intuitive admin dashboard for easy store management
              </Typography>
              <Typography>
                Managing your e-commerce empire has never been so simple. Tackle
                order fulfillment, product updates, and payment processing all
                in one handy admin dashboard!
              </Typography>
            </Box>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: "300px",
                  height: "300px",
                  border: "1px purple solid",
                  borderRadius: "10px",
                }}
              >
                {/* this is the image */}
              </Box>
            </Box>
          </Stack>
          <Stack
            my={4}
            direction={{ xs: "column-reverse", md: "row-reverse" }}
            alignItems="center"
          >
            <Box
              m={4}
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                // maxWidth: "500px",
              }}
            >
              <Typography
                variant="h3"
                my={2}
                sx={{ fontSize: { xs: "32px", lg: "48", fontWeight: "bold" } }}
              >
                Manage Your Empire
              </Typography>
              <Typography>
                Get in-depth insights with real-time data on your store’s
                performance, helping you make informed decisions for growth and
                success.
              </Typography>
            </Box>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: "300px",
                  height: "300px",
                  border: "1px purple solid",
                  borderRadius: "10px",
                }}
              >
                {/* this is the image */}
              </Box>
            </Box>
          </Stack>
        </Box>

        {/* SUBSCRIPTION */}
        <Box
          sx={{
            background: bgColor,
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            minHeight: "100vh",
            width: "100%",
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              maxWidth: "500px",
              marginTop: "150px",
              minHeight: "25%",
            }}
          >
            <Typography
              my={2}
              variant="h2"
              sx={{ fontSize: { xs: "32px", lg: "48", fontWeight: "bold" } }}
            >
              Sit Back and Relax
            </Typography>
            <Typography>
              We take the hassle out of setting up an online store. From
              stunning storefronts to user-friendly admin dashboards, everything
              is ready to go!
            </Typography>
          </Box>
          <Box
            sx={{
              textAlign: "center",
              minHeight: "40vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              my={2}
              variant="h2"
              sx={{ fontSize: { xs: "32px", lg: "48", fontWeight: "bold" } }}
            >
              Get latest updates on features & promos
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default LandingPage;
<div className="flex flex-col justify-center items-center h-full">
  <h1 className="text-[30px]">Welcome to ShopX</h1>
  <p>This page is under construction</p>
  <p>
    Visit{" "}
    <a href="/tshop" style={{ textDecoration: "underline" }}>
      Essence
    </a>{" "}
    instead
  </p>
</div>;
