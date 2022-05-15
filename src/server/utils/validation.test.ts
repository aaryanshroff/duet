import { validEmailRegex } from "./validation";

// Valid emails

test("standard email", () => {
  expect(validEmailRegex.test("aaryan@email.com")).toBe(true);
});

test("first name dot last name", () => {
  expect(validEmailRegex.test("aaryan.shroff@email.com")).toBe(true);
});

test("subdomain", () => {
  expect(validEmailRegex.test("aaryan@subdomain.email.com")).toBe(true);
});

test("plus sign", () => {
  expect(validEmailRegex.test("aaryan+shroff@email.com")).toBe(true);
});

test("different top level domains", () => {
  expect(validEmailRegex.test("aaryan@email.co")).toBe(true);
  expect(validEmailRegex.test("aaryan@email.in")).toBe(true);
  expect(validEmailRegex.test("aaryan@email.io")).toBe(true);
});

// Invalid emails

test("username only", () => {
  expect(validEmailRegex.test("aaryan")).toBe(false);
});

test("website only", () => {
  expect(validEmailRegex.test("email.com")).toBe(false);
});

test("encoded HTML", () => {
  expect(validEmailRegex.test("<script></script>@email.com")).toBe(false);
});

test("spaces", () => {
  expect(validEmailRegex.test("aaryan @email.com")).toBe(false);
});
