import { rest } from "msw";
import { secrets } from "../../backend/secrets";

export const handlers = [
  rest.get("http://localhost:3001/destinations/:id", (req, res, ctx) => {
    // Mock data to return
    const mockData = {
      id: req.params.id,
      description: "Mocked Description",
      // Add other fields as needed
    };

    return res(ctx.status(200), ctx.json(mockData));
  }),
  // Add more handlers for other endpoints as needed
];
