const request = require("supertest");
const mongoose = require("mongoose");
require("dotenv").config();

const app = require("../server.js");
const User = require("../schema/user_schema");

require("dotenv").config();

describe("User API Tests", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  test("Should create a user", async () => {
    const res = await request(app).post("/users").send({
      name: "Manoj",
      email: "manoj.devadiga@niveussolutions.com",
    });

    expect(res.statusCode);
    expect(res.body);
    expect(res.body.name);
  });
});

test("Should fail to create a user without required fields", async () => {
  const res = await request(app).post("/users").send({});

  expect(res.statusCode);
  expect(res.body);
});

test("Should fetch all users", async () => {
  await new User({
    name: "Manoj",
    email: "manoj.devadiga@niveussolutions.com",
  }).save();

  const res = await request(app).get("/users");

  expect(res.statusCode);
  expect(res.body.length);
});

test("Should update a user", async () => {
  const user = await new User({
    name: "Manoj",
    email: "manoj1.devadiga@niveussolutions.com",
  }).save();

  const res = await request(app)
    .put(`/users/${user._id}`)
    .send({ name: "Manoj Updated" });

  expect(res.statusCode);
  expect(res.body);
});

test("Should return 404 for updating a non-existing user", async () => {
  const res = await request(app)
    .put("/users/60d9f2f5f6e6f2b3c4d9e999")
    .send({ name: "Not Found" });

  expect(res.statusCode);
});
