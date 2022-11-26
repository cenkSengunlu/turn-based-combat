const justNumber = (event: any) => {
  if (
    event.key === "." ||
    event.key === "-" ||
    event.key === "e" ||
    event.key === "," ||
    event.key === "+"
  ) {
    event.preventDefault();
  }
};

export default justNumber;
