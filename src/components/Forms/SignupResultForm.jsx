import { Typography } from "@mui/material";
import React from "react";

function SignupResultForm({ username, password }) {
  return (
    <div>
      <Typography variant="h6" component="h2">
        User data
      </Typography>
      <Typography variant="p" component="p">
        Username: {username}
      </Typography>
      <Typography variant="p" component="p">
        Password: {password}
      </Typography>
    </div>
  );
}

export default SignupResultForm;
