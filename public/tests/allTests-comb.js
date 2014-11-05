var chai, expect;

chai = require("chai");

chai.should();

expect = chai.expect;

describe("test", function() {
  return it("should pass", function() {
    return expect(true).to.be.ok;
  });
});
