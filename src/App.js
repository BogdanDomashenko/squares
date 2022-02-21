import React from "react";
import store from "./redux/store";
import { useSelector, useDispatch } from "react-redux";
import { setStatus } from "./redux/slices/squaresSlice";

import { Square } from "./components";
import { Container, Grid, Button } from "@mui/material";

function App() {
  const dispatch = useDispatch();

  const [buttonVisible, setButtonVisible] = React.useState(false);

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
        {buttonVisible && <Button variant="contained">Купить</Button>}
      </Container>
    </div>
  );
}

export default App;
