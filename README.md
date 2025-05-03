# PERN Stack Todo List
<!-- TODO: Brief description of what this application does -->

## Deployed Webpage
**Website Link:** https://pern-stack-todo-list.vercel.app/

## Directions to Run
<!-- TODO: Brief description of how to clone and run this application -->

## Technologies
* **Frontend:** React.js
* **Frontend Deployment:** Vercel
* **Backend:** Express, Node.js, Postgres
* **Server and Database Deployment:** Render

## Challenges Encountered

### Server and Client Communication with CORS
**Challenge:** The frontend and server were deployed on different platforms — Vercel for the frontend and Render for the backend —  which created CORS errors and failed API requests. Allowlist for the CORS dynamic handler was not initialized correctly with frontend's URL.<br />
**Solution:** Reviewed client URLs on Vercel and updated allowlist with correct URLs to authorize frontend to make requests to the server.

### Environment Configuration
**Challenge:** Server was not able to identify environment variables due to unspecified file paths to environment variables stored on Render.
**Solution:** Used the dotenv package to make environment variables accessible via 'process.env' by specifying the 'path' option. Render's environment variables are stored in path '/etc/secrets/.env', which led to errors in the production environment if not specified to the Node.js app. 
