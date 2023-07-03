import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, Box } from "@mui/material";
import useStyle from "../hooks/useStyle";
import { createOrder } from "../services/checkoutService";
import { fCurrency } from "../utils/formatNumber";
import { clearCart } from "../state";
import CartList from "../components/CartList";

const CheckoutPage = () => {
  const { style } = useStyle();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const total = useSelector((state) => state.total);

  const handleCheckout = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userDetails = {
      email: data.get("email"),
      address1: data.get("address1"),
      address2: data.get("address2"),
      city: data.get("city"),
      state: data.get("state"),
      country: data.get("country"),
      notes: data.get("notes"),
    };

    const response = await createOrder(cart, userDetails);
    dispatch(clearCart());

    window.location.href = response;
  };
  //FIX: take out the address form, move it to a new file, use formik in that page

  return (
    <div className="flex sm:flex-row flex-col  bg-white min-h-[100vh]">
      <div className="w-full p-6">
        <h1 className={`${style.heading1}`}>Items</h1>
        <p className={`${style.heading2} my-6`}>Total: {fCurrency(total)}</p>
        <CartList custom_styles={"p-6 pt-12"} />
      </div>
      <div className="flex flex-col p-6 w-full  shadow-[0_0px_25px_-15px_rgba(0,0,0,0.6)]">
        <h1 className={`${style.heading1}`}>Shipping Details</h1>
        <Box
          component="form"
          noValidate
          onSubmit={handleCheckout}
          sx={{ mt: 5 }}
        >
          <TextField
            sx={{ marginTop: 2 }}
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <TextField
            margin="dense"
            required
            fullWidth
            id="address1"
            label="Address line 1"
            name="address1"
            autoComplete="shipping address-line1"
          />
          <TextField
            margin="dense"
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
          />
          <div className="flex sm:flex-row flex-col sm:gap-6">
            <TextField
              margin="dense"
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="shipping city"
            />
            <TextField
              margin="dense"
              required
              id="state"
              name="state"
              label="State"
              autoComplete="shipping state"
              fullWidth
            />
          </div>
          <TextField
            margin="dense"
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            value="Nigeria"
          />
          <TextField
            margin="dense"
            id="notes"
            name="notes"
            label="Extra details/ Delivery directions"
            multiline
            fullWidth
            rows={4}
            defaultValue=""
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {fCurrency(total)}
            <br />
            Proceed To Payment
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default CheckoutPage;
