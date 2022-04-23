const SQUARE_STATUS = {
  default: "green",
  booked: "yellow",
  sold: "red",
};

const getSquareStatusByColor = (color) => {
  console.log(color);
};

getSquareStatusByColor(SQUARE_STATUS.default);
