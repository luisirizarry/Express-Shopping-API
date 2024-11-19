process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");
let items = require("../fakeDb");

let popsicle = { name: "Popsicle", price: 1.5 };

beforeEach(function () {
  items.push(popsicle);
});

afterEach(function () {
  items.length = 0;
});

describe("Get /items", () => {
  test("Get all items", async () => {
    const res = await request(app).get("/items");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ items: [popsicle] });
  });
});

describe("Get /items/:name", () => {
  test("Get item", async () => {
    const res = await request(app).get(`/items/${popsicle.name}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ name: "Popsicle", price: 1.5 });
  });

  test("If item doesn't exist", async () => {
    const res = await request(app).get(`/items/pop`);
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ error: "Item with name 'pop' not found" });
  });
});

describe("Post /items", () => {
  test("Create a item", async () => {
    const res = await request(app).post("/items").send({ name: "Red Soda", price: 2.40 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ added: { name: "Red Soda", price: 2.40 } });
  });
});

describe("/PATCH /items/:name", () => {
  test("Updating item name and price", async () => {
    const res = await request(app)
      .patch(`/items/${popsicle.name}`)
      .send({ name: "Red Soda", price: 2.40 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ updated: { name: "Red Soda", price: 2.40 } });
  });

  test("If item doesn't exist", async () => {
    const res = await request(app).patch(`/items/pop`).send({ name: "Red Soda", price: 2.40 });
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ error: "Item with name 'pop' not found" });
  });
});

describe("/DELETE /items:name", () => {
  test("Deleting a item", async () => {
    const res = await request(app).delete(`/items/${popsicle.name}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Deleted" });
  });

  test("If item doesn't exist", async () => {
    const res = await request(app).delete(`/items/pop`);
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ error: "Item with name 'pop' not found" });
  });
});
