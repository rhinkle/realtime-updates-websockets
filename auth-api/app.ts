import Fastify, {FastifyRequest, FastifyReply} from 'fastify';

export function buildApp(opts: {}) {
  const app = Fastify(opts);
  app.get('/', (req: FastifyRequest, reply: FastifyReply) => {
    reply.code(200).send({
      status: "up",
    });
  });

  return app;
}
