import classObj from "../src/js/object.js";
describe("classObj", () => {
  test("should correctly create an object", () => {
    const object = new classObj("name");
    expect(object);
    expect(object.name).toMatch("name");
  });
});