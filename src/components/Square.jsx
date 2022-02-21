import React from "react";
import { Box } from "@mui/material";
import { useTimer } from "use-timer";

function Square({ color, onClick, onTimerEnd }) {
  const { time, start, pause, reset, status } = useTimer({
    initialTime: 5,
    endTime: 0,
    timerType: "DECREMENTAL",
    onTimeOver: () => {
      onTimerEnd();
      reset();
    },
  });

  return (
    <div>
      <Box
        onClick={() => {
          onClick();
          start();
        }}
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
        {status === "RUNNING" ? time : ""}
      </Box>
    </div>
  );
}

export default Square;
