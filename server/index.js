const connectDB = require('./config/connectDB.js');
const signup = require('./controllers/authController.js');
const authRoutes=require('./routes/authRoutes.js')

const allowedOrigins = ["http://localhost:5173"];

(async () => {
  try {
    const db = await connectDB();
    console.log("Connected to MongoDB");

    const server = Bun.serve({
      port:  8000,
      async fetch(request) {
        const origin = request.headers.get("Origin");

        const headers = {
          "Access-Control-Allow-Origin": allowedOrigins.includes(origin) ? origin : "null",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        };

        if (request.method === "OPTIONS") {
          return new Response(null, { status: 204, headers });
        }

        const url = new URL(request.url);

        if (url.pathname === "/api/create-task" && request.method === "POST") {
          try {
            const tasksCollection = db.collection("tasks");
            const data = await request.json();
            const result = await tasksCollection.insertOne(data);
            const responsePayload = { success: true };

            return new Response(JSON.stringify(responsePayload), {
              status: 200,
              headers: { ...headers, "Content-Type": "application/json" },
            });
          } catch (error) {
            return new Response(JSON.stringify({ error: error.message }), {
              status: 500,
              headers: { ...headers, "Content-Type": "application/json" },
            });
          }
        }

        if (url.pathname.startsWith("/auth")) {
          return await authRoutes(request, headers);
        }

        if (url.pathname === "/") {
          return new Response("Welcome to Bun!", { headers });
        }

        return new Response(JSON.stringify({ error: "Not Found" }), {
          status: 404,
          headers: { ...headers, "Content-Type": "application/json" },
        });
      },
    });

    console.log(`Listening on http://localhost:${server.port}`);
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
})();
