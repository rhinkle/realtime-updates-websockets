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
});