import { useEffect } from "react";
import { Box } from "@mui/material";
import { useTimer } from "use-timer";
import { useDispatch, useSelector } from "react-redux";
import {
  setSquareStatus,
  setSquareTimer,
} from "../../redux/slices/squaresSlice";
import { setModalVisible } from "../../redux/slices/modalsSlice";

function Square({ id, status, startTime, setBuyError }) {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const onClick = () => {
    if (isLoggedIn) {
      setBuyError(null);
      status === "green" && dispatch(setSquareStatus({ id, status: "yellow" }));
    } else {
      dispatch(setModalVisible({ modal: "signup", visible: true }));
    }
  };

  const onTimerEnd = () => {
    dispatch(setSquareStatus({ id, status: "green" }));
  };

  const onTimeUpdate = (time) => {
    dispatch(setSquareTimer({ id, time }));
  };

  const {
    time,
    start,
    pause,
    reset,
    status: timerStatus,
  } = useTimer({
    initialTime: startTime || 120,
    endTime: 0,
    timerType: "DECREMENTAL",
    onTimeOver: () => {
      onTimerEnd();
      reset();
    },
    onTimeUpdate: (time) => {
      onTimeUpdate(time);
    },
  });

  useEffect(() => {
    switch (status) {
      case "yellow":
        start();
        break;
      case "green":
      case "red":
        reset();
        break;
      default:
        break;
    }
  }, [status]);

  return (
    <div>
      <Box
        onClick={onClick}
        sx={{
          width: 200,
          maxWidth: "100%",
          height: 200,
          backgroundColor: status,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "&:hover": {
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        {timerStatus === "RUNNING"
          ? Math.floor(time / 60) + ":" + (time % 60)
          : ""}
      </Box>
    </div>
  );
}

export default Square;
