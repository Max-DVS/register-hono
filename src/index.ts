import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { userInsert, usersTable } from "./db/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

const app = new Hono();

app
  .post("/register", zValidator("json", userInsert), async (c) => {
    const response = c.req.valid("json");

    try {
      const [user] = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, response.email));

      if (user) {
        return c.json({ error: "User already exists" }, 400);
      }

      await db.insert(usersTable).values(response);
      return c.json({ message: "User registered successfully" }, 200);
    } catch (e) {
      if (e instanceof z.ZodError) {
        return c.json({ error: e.message }, 400);
      }
      return c.json({ error: "Something went wrong" }, 500);
    }
  })
  .get("/", (c) => {
    return c.text("Hello World!");
  });

export default app;
