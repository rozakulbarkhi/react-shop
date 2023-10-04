import { rest } from "msw";

export const handlers = [
  rest.post("https://fakestoreapi.com/auth/login", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        token: "test",
      })
    );
  }),
];
