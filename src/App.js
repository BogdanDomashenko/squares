import React from "react";
import store from "./redux/store";
import { useSelector, useDispatch } from "react-redux";
import { setStatus, buy } from "./redux/slices/squaresSlice";

import { Square } from "./components";
import { Container, Grid, Button } from "@mui/material";

function App() {
  const dispatch = useDispatch();

  const [buttonVisible, setButtonVisible] = React.useState(false);

  React.useEffect(() => {
    squares.map(
      (item) =>
        item.status === "yellow" &&
        dispatch(setStatus({ id: item.id, status: "green" }))
    );
  }, []);

  React.useEffect(() => {
    if (squares.find((item) => item.status === "yellow")) {
      setButtonVisible(true);
    } else {
      setButtonVisible(false);
    }
  });

  const squares = useSelector((state) => {
    return state.squares;
  });

  const onSquareClick = (id, status) => {
    dispatch(setStatus({ id, status }));
  };

  const onSquareTimerEnd = (id) => {
    dispatch(setStatus({ id, status: "green" }));
  };

  const buyButtonClick = () => {
    dispatch(buy({}));
  };

  return (
    <div className="App">
      <Container>
        <Grid container spacing={2}>
          {squares.length &&
            squares.map((item, key) => (
              <Grid item xs={4} key={key}>
                <Square
                  color={item.status}
                  onClick={() => onSquareClick(item.id, "yellow")}
                  onTimerEnd={() => onSquareTimerEnd(item.id)}
                />
              </Grid>
            ))}
        </Grid>
        {buttonVisible && (
          <Button variant="contained" onClick={buyButtonClick}>
            Купить
          </Button>
        )}
      </Container>
    </div>
  );
}

export default App;
