import Fastify, {FastifyRequest, FastifyReply} from 'fastify';
import jwt from 'jsonwebtoken';
import {config} from "./config";

interface AuthUser {
  email: string;
}

export function buildApp(opts: {}) {
  const app = Fastify(opts);
  app.get('/', (req: FastifyRequest, reply: FastifyReply) => {
    reply.code(200).send({
      status: "up",
    });
  });

  app.post<{ Body: AuthUser }>('/login', (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const {email} = req.body as AuthUser;
      console.log(email);

      const token = jwt.sign({
        email: email
      }, config.tokenKey, {expiresIn: "2h"})

      reply.code(201).send({
        access_token: token,
        expires_in: 3600,
        token_type: "Bearer"
      });

    } catch (e) {
      reply.code(400).send({
        message: `error: Something went wrong`
      });
    }
  });


  app.get('/verify', (req: FastifyRequest, reply: FastifyReply) => {
    const rawAuth = req.headers.authorization;
    if (req.headers.authorization!.length <= 0) {
      reply.code(400).send({error: "missing authorization token"});
    }

    // @ts-ignore
    const authToken = rawAuth.slice(7);
    try {
      const decode = jwt.verify(authToken, config.tokenKey)
      reply.code(200).send({isValid: true, data: decode});
    } catch (e) {
      reply.code(401).send({isValid: false, data: 'unauthorized'});
    }
  })

  return app;
}
