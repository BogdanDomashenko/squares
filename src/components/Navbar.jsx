import React from "react";
import { Container, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Navbar() {
  //   const [navItems, setNavItems] = React.useState([
  //     { id: 1, name: "Home", link: "/", isActive: false },
  //     { id: 2, name: "Booking", link: "/booking", isActive: false },
  //   ]);

  //   const navItemClick = (id) => {
  //     setNavItems(...navItems, navItems.map(item => item.id === id : isActive))
  //   }

  const onClickLogout = () => {
    localStorage.removeItem("userToken");
  };

  return (
    <div>
      <Container>
        {/* {navItems.map((item) => (
            <Link to={item.link} key={item.id}>
                <Button onClick={() => navItemClick(item.id)} >{item.name}</Button>
            </Link>
            ))} */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <Link to="/">
              <Button>Home</Button>
            </Link>
            <Link to="/booking">
              <Button>Booking</Button>
            </Link>
          </div>
          <div>
            <Link to="/login">
              <Button
                onClick={onClickLogout}
                color="secondary"
                variant="outlined"
              >
                Logout
              </Button>
            </Link>
          </div>
        </Box>
      </Container>
    </div>
  );
}

export default Navbar;
