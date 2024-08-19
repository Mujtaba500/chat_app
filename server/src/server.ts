import app from "./app.js";

const port = process.env.PORT;

app.listen(port, () => {
  const address = `http://localhost:${port}`;
  console.log(`Server running on port ${address}`);
});
