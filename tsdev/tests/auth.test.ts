import http from "http";
import type { AddressInfo } from "net";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { createApp } from "../src/app";
import { connectDatabase } from "../src/db";
import { User } from "../src/models/User";

let server: http.Server;
let baseUrl = "";

function postForm(path: string, data: Record<string, string>) {
  const body = new URLSearchParams(data).toString();

  return new Promise<{
    status: number;
    headers: http.IncomingHttpHeaders;
    text: string;
  }>((resolve, reject) => {
    const req = http.request(
      `${baseUrl}${path}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Content-Length": Buffer.byteLength(body)
        }
      },
      (res) => {
        let text = "";
        res.on("data", (chunk) => {
          text += chunk;
        });
        res.on("end", () => {
          resolve({
            status: res.statusCode ?? 0,
            headers: res.headers,
            text
          });
        });
      }
    );

    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

beforeAll(async () => {
  jest.setTimeout(20000);
  await connectDatabase();
  const app = createApp();
  await new Promise<void>((resolve) => {
    server = app.listen(0, () => resolve());
  });
  const address = server.address() as AddressInfo;
  baseUrl = `http://127.0.0.1:${address.port}`;
});

beforeEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await User.deleteMany({});
  await new Promise<void>((resolve) => server.close(() => resolve()));
  await mongoose.disconnect();
});

describe("Auth", () => {
  it("registers a user and redirects to login", async () => {
    const email = "alice@example.com";
    const password = "Password123!";

    const response = await postForm("/register", { email, password });

    expect(response.status).toBe(302);
    expect(response.headers.location).toBe("/login?registered=1");

    const user = await User.findOne({ email });
    expect(user).not.toBeNull();
    expect(user?.role).toBe("user");
    expect(user?.passwordHash).not.toBe(password);
  });

  it("logs in a user and sets a jwt cookie", async () => {
    const email = "bob@example.com";
    const password = "Password123!";
    const passwordHash = await bcrypt.hash(password, 10);
    await User.create({ email, passwordHash, role: "user" });

    const response = await postForm("/login", { email, password });

    expect(response.status).toBe(302);
    expect(response.headers.location).toBe("/profile");

    const cookies = response.headers["set-cookie"] ?? [];
    const cookieText = Array.isArray(cookies) ? cookies.join(";") : cookies;
    expect(cookieText).toContain(`${process.env.JWT_COOKIE_NAME}=`);
  });
});

