/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Type, conn } = require("../../src/db.js");

const agent = session(app);
const type = {
  name: "fire",
};

describe("Type route", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() => Type.sync({ force: true }).then(() => Type.create(type)));
  describe("GET /types", () => {
    it("should get 200", (done) => {
      agent.get("/types").expect(200);
      done();
    }).timeout(2000);
  });
});
