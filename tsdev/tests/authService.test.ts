import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { connectDatabase } from "../src/db";
import { User } from "../src/models/User";
import { loginUser, registerUser } from "../src/services/authService";

beforeAll(async () => {
  jest.setTimeout(20000);
  await connectDatabase();
});

beforeEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await User.deleteMany({});
  await mongoose.disconnect();
});

describe("AuthService", () => {
  it("registerUser creates a user with role user", async () => {
    const result = await registerUser("alice@example.com", "Password123!");
    expect(result.ok).toBe(true);

    const user = await User.findOne({ email: "alice@example.com" });
    expect(user).not.toBeNull();
    expect(user?.role).toBe("user");
  });

  it("registerUser rejects duplicate emails", async () => {
    await User.create({
      email: "dup@example.com",
      passwordHash: await bcrypt.hash("Password123!", 10),
      role: "user"
    });

    const result = await registerUser("dup@example.com", "Password123!");
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe("Email already registered.");
    }
  });

  it("loginUser returns a token for valid credentials", async () => {
    const email = "bob@example.com";
    const passwordHash = await bcrypt.hash("Password123!", 10);
    await User.create({ email, passwordHash, role: "user" });

    const result = await loginUser(email, "Password123!");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.token.length).toBeGreaterThan(10);
    }
  });

  it("loginUser rejects invalid password", async () => {
    const email = "eve@example.com";
    const passwordHash = await bcrypt.hash("Password123!", 10);
    await User.create({ email, passwordHash, role: "user" });

    const result = await loginUser(email, "WrongPassword");
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe("Invalid credentials.");
    }
  });
});

