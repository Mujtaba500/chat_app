import server from "./app.js";

const port = process.env.PORT;

server.listen(port, () => {
  const address = `http://localhost:${port}`;
  console.log(`Server running on port ${address}`);
});
