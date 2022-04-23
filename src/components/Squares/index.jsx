import React from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  setStatus,
  setYellowSquaresStatus,
  buy,
  setSquareTimer,
  resetBookedSquaresByUserId,
} from "../../redux/slices/squaresSlice";

import Square from "./Square";
import { Container, Grid, Button } from "@mui/material";
import { SQUARE_STATUS } from "../../utils/constants";

function Squares() {
  const dispatch = useDispatch();

  const [buttonVisible, setButtonVisible] = React.useState(false);
  const [buyError, setBuyError] = React.useState(null);
  const { id: userId } = useSelector((state) => state.user.data);

  const squares = useSelector((state) => {
    return state.squares;
  });

  React.useEffect(() => {
    if (
      squares.find(
        (item) =>
          item.status === SQUARE_STATUS.booked.name && item.userId === userId
      )
    ) {
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
        dispatch(buy({ userId }));
      })
      .catch((error) => {
        dispatch(resetBookedSquaresByUserId({ userId }));
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
                  userId={item.userId}
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
