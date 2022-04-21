import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useTimer } from "use-timer";
import { useDispatch, useSelector } from "react-redux";
import {
  setSquareStatus,
  setSquareTimer,
} from "../../redux/slices/squaresSlice";
import { setModalVisible } from "../../redux/slices/modalsSlice";
import { ROLES, SQUARE_STATUS } from "../../utils/constants";

function Square({ id, status, userId, startTime, setBuyError }) {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { role: userRole, id: currentUserId } = useSelector(
    (state) => state.user.data
  );

  const onClick = () => {
    if (isLoggedIn) {
      setBuyError(null);
      status === SQUARE_STATUS.default &&
        dispatch(
          setSquareStatus({
            id,
            status: SQUARE_STATUS.booked,
            userId: currentUserId,
          })
        );
    } else {
      dispatch(setModalVisible({ modal: "signup", visible: true }));
    }
  };

  const onTimerEnd = () => {
    dispatch(setSquareStatus({ id, status: SQUARE_STATUS.default }));
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
      case SQUARE_STATUS.booked:
        start();
        break;
      case SQUARE_STATUS.default:
      case SQUARE_STATUS.sold:
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
          flexDirection: "column",
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
        {userId && userId === currentUserId ? (
          <Typography type="p">Your square</Typography>
        ) : (
          ""
        )}
      </Box>
      {userRole === ROLES.admin && userId ? userId : ""}
    </div>
  );
}

export default Square;
