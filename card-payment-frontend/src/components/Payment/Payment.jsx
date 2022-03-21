import "./Payment.css";
import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { makeStyles } from "@material-ui/styles";
import mastercard from "../../images/mastercard.jpg";
import { useFormWithValidation } from "../../hooks/userFormWithValidation";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
    width: "100%",
    marginTop: 20,
  },
});

function Payment() {
  const classes = useStyles();
  const [values, handleChange, errors, isValid, resetForm] =
    useFormWithValidation();
  const { CardNumber, ExpDate, Cvv, Amount } = values;
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [responce, setResponce] = useState("");

  const handlePaymentSubmit = async (evt) => {
    evt.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:3001/payments", {
        CardNumber,
        ExpDate,
        Cvv,
        Amount,
      });
      await setResponce(
        `RequestId : ${res.data.RequestId}, Amount : ${res.data.Amount}`
      );
    } catch (e) {
      console.log(e);
      setResponce(e.message);
    } finally {
      setIsLoading(false);
      setOpen(true);
      resetForm();
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Header></Header>
      <main className={"payment__container"}>
        <div className={"payment__card"}>
          <img
            src={mastercard}
            alt="Логотип mastercard"
            className="payment__mastercard-logo"
          />
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              m: "30px auto",
              width: "300px",
            }}
            autoComplete="off"
          >
            <TextField
              required
              sx={{
                marginTop: "10px",
                width: "100%",
                backgroundColor: "white",
              }}
              type="number"
              id="filled-basic"
              label="CardNumber"
              variant="filled"
              value={CardNumber || ""}
              name="CardNumber"
              onChange={handleChange}
              error={errors.CardNumber ? true : false}
              helperText={errors.CardNumber}
            />

            <div className="payment__inputs-container">
              <TextField
                required
                sx={{
                  marginTop: "15px",
                  width: "160px",
                  backgroundColor: "white",
                }}
                type="text"
                id="filled-basic"
                label="ExpDate MM/YYYY"
                variant="filled"
                name="ExpDate"
                value={ExpDate || ""}
                onChange={handleChange}
                error={errors.ExpDate ? true : false}
              />
              <TextField
                required
                sx={{
                  marginTop: "15px",
                  width: "110px",
                  backgroundColor: "white",
                }}
                type="number"
                id="filled-basic"
                label="CVV"
                variant="filled"
                name="Cvv"
                value={Cvv || ""}
                onChange={handleChange}
                error={errors.Cvv ? true : false}
              />
            </div>
            <TextField
              required
              sx={{
                marginTop: "15px",
                width: "100%",
                backgroundColor: "white",
              }}
              type="number"
              id="filled-basic"
              label="Amount"
              variant="filled"
              name="Amount"
              value={Amount || ""}
              onChange={handleChange}
              error={errors.Amount ? true : false}
              helperText={errors.Amount}
            />
            <LoadingButton
              disabled={!isValid}
              className={classes.root}
              sx={{
                marginTop: "20px",
              }}
              variant="contained"
              size="medium"
              onClick={handlePaymentSubmit}
              endIcon={<SendIcon />}
              loading={isLoading}
              loadingPosition="end"
            >
              Send
            </LoadingButton>
          </Box>
        </div>
      </main>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Responce from server</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {responce}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Payment;
