import {buildApp} from "./app";

const port = 1993;

export const server = buildApp({
  logger: {
    level: 'info'
  }
});

server.listen(port, '0.0.0.0', (err) => {
  if(err) {
    server.log.error(err);
    process.exit(1);
  }
});

async function closeGracefully(_signal: unknown) {
  await server.close();
  process.exit();
}
process.on("SIGINT", closeGracefully);
