import React from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  setStatus,
  setYellowSquaresStatus,
  buy,
  setSquareTimer,
} from "../../redux/slices/squaresSlice";

import Square from "./Square";
import { Container, Grid, Button } from "@mui/material";

function Squares() {
  const dispatch = useDispatch();

  const [buttonVisible, setButtonVisible] = React.useState(false);
  const [buyError, setBuyError] = React.useState(null);

  const squares = useSelector((state) => {
    return state.squares;
  });

  React.useEffect(() => {
    if (squares.find((item) => item.status === "yellow")) {
      setButtonVisible(true);
    } else {
      setButtonVisible(false);
    }
  });

  const buyButtonClick = () => {
    const promise = new Promise((resolve, reject) =>
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve();
        } else {
          reject("недостаточно денег");
        }
      }, 1000)
    );

    promise
      .then(() => {
        dispatch(buy({}));
      })
      .catch((error) => {
        dispatch(setYellowSquaresStatus({ status: "green" }));
        setBuyError(error);
      });
  };

  return (
    <div className="App">
      <Container>
        <Grid container spacing={2}>
          {squares.length &&
            squares.map((item, key) => (
              <Grid item xs={4} key={key}>
                <Square
                  id={item.id}
                  status={item.status}
                  startTime={item.timer}
                  setBuyError={setBuyError}
                />
              </Grid>
            ))}
        </Grid>
        {buttonVisible && (
          <Button variant="contained" onClick={buyButtonClick}>
            Купить
          </Button>
        )}
        {buyError && buyError}
      </Container>
    </div>
  );
}

export default Squares;
