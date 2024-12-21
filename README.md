# artist_management_system

## Project Setup Instruction

Since this project is built using `pnpm workspace`, here are few extra things that needs to be done for setting up the project correctly.
- Run `pnpm install` and `pnpm build` before staring the server
- Add `.env` file at the root of the project and at the root of the `client` and `server` workspace similar to `.env.example` file. The `.env` file at the root of the project is required for running docker compose file and the the other two `.env` file is required for running the frontend and backend servers.
- After add the `.env` file, run `docker compose up -d` to set up the database. The `docker-compose.yaml` file is configured to run the databae at port 5433.
- Run `pnpm dev` to run the development server.


