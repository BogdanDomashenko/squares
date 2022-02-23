import React from "react";
import { Container, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Navbar() {
  //   const [navItems, setNavItems] = React.useState([
  //     { id: 1, name: "Home", link: "/", isActive: false },
  //     { id: 2, name: "Booking", link: "/booking", isActive: false },
  //   ]);

  //   const navItemClick = (id) => {
  //     setNavItems(...navItems, navItems.map(item => item.id === id : isActive))
  //   }

  const navigate = useNavigate();

  const onClickLogout = () => {
    localStorage.removeItem("userToken");
    axios
      .get("http://localhost:3001/logout")
      .then((data) => {
        localStorage.removeItem("userToken");
        navigate("/login", { replace: true });
      })
      .catch((error) => console.log(error));
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
            <Button
              onClick={onClickLogout}
              color="secondary"
              variant="outlined"
            >
              Logout
            </Button>
          </div>
        </Box>
      </Container>
    </div>
  );
}

export default Navbar;
