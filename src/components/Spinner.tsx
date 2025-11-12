import { type CSSProperties } from "react";
import { BarLoader } from "react-spinners";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};
const Spinner: React.FC<{ loading: boolean; color?: string }> = ({
  loading,
  color = "blue",
}) => {
  return (
    <BarLoader
      color={color}
      loading={loading}
      cssOverride={override}
      aria-label="Loading Spinner"
    />
  );
};

export default Spinner;
