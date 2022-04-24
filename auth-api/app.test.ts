import supertest from "supertest";
import {buildApp} from "./app";

describe('App', function () {
  const app = buildApp({});

  beforeAll(async () => {
    await app.ready();
  });

  afterAll(() => {
    app.close();
  });

  it('should return 200 ok when requesting GET root', async () => {
    const resp = await supertest(app.server)
      .get("/")
      .expect(200)

    expect(resp.body).toEqual({
      status: "up",
    });
  });


  it('should get a access token and validate token', async () => {
    const loginResp = await supertest(app.server)
      .post("/login")
      .send({
        "email": "ryan@gmail.com"
      })
      .expect(201);

    const access_token = loginResp.body.access_token;

    await supertest(app.server)
      .get("/verify")
      .set('Authorization', `Bearer ${access_token}`)
      .expect(200);
  });

  it('should get a error when invalid login data', async () => {
    await supertest(app.server)
      .post("/login")
      .expect(400);
  });

  it('should get a error when trying to validate invalid token', async () => {
    await supertest(app.server)
      .get("/verify")
      .set('Authorization', `Bearer MochiIsTheBest`)
      .expect(401);
  });

  it('should get a error when trying to validate invalid token', async () => {
    await supertest(app.server)
      .get("/verify")
      .expect(400);
  });
});