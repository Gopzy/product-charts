import { Button, CircularProgress } from "@mui/material";

export default function HCButton({
  handleClick,
  loading,
  disabled,
}: {
  handleClick: VoidFunction;
  loading: boolean;
  disabled: boolean;
}) {
  const renderButtonContent = () => {
    if (loading) {
      return (
        <>
          processing... <CircularProgress size={24} color="inherit" />
        </>
      );
    }

    return "Run Report";
  };

  return (
    <Button variant="contained" onClick={handleClick} disabled={disabled}>
      {renderButtonContent()}
    </Button>
  );
}
