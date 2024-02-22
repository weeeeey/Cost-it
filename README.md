This is a Realtime collaboration space with member.

## Getting Started

To get started with this project, follow the steps below:

1. Clone the repository: `git clone https://github.com/your-username/your-repo.git`
2. Install dependencies: `npm install`
3. Set up environment variables:

    - Create a `.env.local` file in the root directory of the project.
    - Add the following variables to the `.env.local` file:

        ```plaintext
        CONVEX_DEPLOYMENT  =  <your-convex-deployment>
        NEXT_PUBLIC_CONVEX_URL  =  <your-convex-url>
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY  =  <your-clerk-publishable-key>
        CLERK_SECRET_KEY  =  <your-clerk-secret-key>
        LIVEBLOCKS_SECRET_KEY  =  <your-liveblocks-secret-key>
        ```

4. Push the database to Convex Server: `npx convex dev`
5. Start the development server: `npm run dev`
6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Skills

-   🖼️ Frontend : Next.js 14
-   🖌️ Backend: Convex
-   🔑 Auth (organisations and invites) : Convex & Clerk
-   🖍️ UI: TailwindCSS & ShadcnUI styling
-   🔎 State: Zustand
-   🪄 Toolbar with Text, Shapes, Sticky Notes & Pencil: liveblocks
-   🎉 Realtime collaboration : liveblocks

[![Video Label](http://img.youtube.com/vi/AYzsVDjYuek/0.jpg)](https://www.youtube.com/watch?v=AYzsVDjYuek)
