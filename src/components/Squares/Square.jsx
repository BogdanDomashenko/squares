import React from "react";
import { Box } from "@mui/material";
import { useTimer } from "use-timer";

function Square({ color, onClick, onTimerEnd }) {
  const { time, start, pause, reset, status } = useTimer({
    initialTime: 120,
    endTime: 0,
    timerType: "DECREMENTAL",
    onTimeOver: () => {
      onTimerEnd();
      reset();
    },
  });

  React.useEffect(() => {
    switch (color) {
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
  }, [color]);

  return (
    <div>
      <Box
        onClick={onClick}
        sx={{
          width: 200,
          maxWidth: "100%",
          height: 200,
          backgroundColor: color,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "&:hover": {
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        {status === "RUNNING" ? Math.floor(time / 60) + ":" + (time % 60) : ""}
      </Box>
    </div>
  );
}

export default Square;
