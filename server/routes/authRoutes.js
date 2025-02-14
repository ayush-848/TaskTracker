const signup = require('../controllers/authController');
// const login = require('./controllers/loginController');
// const logout = require('./controllers/logoutController');

module.exports = async (request, headers) => {
  const url = new URL(request.url);
  if (request.method === "POST") {
    if (url.pathname === "/auth/register") {
      return await signup(request);
    }
    // if (url.pathname === "/auth/login") {
    //   return await login(request);
    // }
    // if (url.pathname === "/auth/logout") {
    //   return await logout(request);
    // }
  }
  return new Response(JSON.stringify({ error: "Auth route Not Found" }), {
    status: 404,
    headers: { ...headers, "Content-Type": "application/json" }
  });
};
