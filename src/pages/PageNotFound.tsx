import React from "react";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const n = useNavigate();
  React.useEffect(() => n("/registrar"), [n]);
  return null;
}
export default PageNotFound;
