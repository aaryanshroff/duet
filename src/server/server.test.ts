import * as request from "supertest";
import app from "./server";

const login = async () => {
  const res = await request(app).post("/auth/login").send({
    email: "timapple@gmail.com",
    password: "password",
  });
  expect(res.status).toEqual(200);
  return res.body;
};

describe("Root path", () => {
  it("GET / --> returns index.html", async () => {
    const res = await request(app).get("/");
    expect(res.status).toEqual(200);
    expect(res.headers["content-type"]).toMatch("text/html");
  });
});

describe("Videos API", () => {
  let token = "";

  // Login to get JWT token that can be used with subsequent test requests
  beforeAll(async () => {
    token = await login();
  });

  it("GET /api/videos --> array of unmatched videos", async () => {
    const res = await request(app)
      .get("/api/videos")
      .set("Authorization", `Bearer ${token}`);
    // Request goes through
    expect(res.status).toEqual(200);
    // Response shape matches
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          url: expect.stringContaining(
            `https://${process.env.S3_BUCKET}.s3.amazonaws.com/`
          ),
          user_id: expect.any(Number),
        }),
      ])
    );
  });
});

describe("Matches API", () => {
  let token = "";

  // Login to get JWT token that can be used with subsequent test requests
  beforeAll(async () => {
    token = await login();
  });

  it("GET /api/matches --> array of users matched with", async () => {
    const res = await request(app)
      .get("/api/matches")
      .set("Authorization", `Bearer ${token}`);
    // Request goes through
    expect(res.status).toEqual(200);
    // Response shape matches
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          first_name: expect.any(String),
          last_name: expect.any(String),
          email: expect.any(String),
        }),
      ])
    );
  });
});

describe("Users API", () => {
  let token = "";

  // Login to get JWT token that can be used with subsequent test requests
  beforeAll(async () => {
    token = await login();
  });

  // Request with valid token
  it("GET /api/users --> current user info", async () => {
    const res = await request(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${token}`);
    // Request goes through
    expect(res.status).toEqual(200);
    // Response shape matches
    expect(res.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        first_name: expect.any(String),
        last_name: expect.any(String),
        email: expect.any(String),
        password: expect.any(String),
      })
    );
  });

  it("Invalid GET /api/users", async () => {
    const res = await request(app)
      .get("/api/users")
      .set("Authorization", `Bearer thisisnotavalidtoken`);

    // Request does not go through
    expect(res.status).toEqual(401);
  });
});
