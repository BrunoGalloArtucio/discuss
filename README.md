This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### Items

-   Check tailwind.config.ts for nextui config
-   Providers are defined on file src/app/providers.tsx and then used on src/app/layout.tsx same as ContextProvider
-   Schema in prisma/schema.prisma necessary to work with PrismaAdapter (prisma + authjs). Check documentation for fields
-   nextAuth setup in src/auth.ts for Github provider
-   src/app/api/auth/[...nextauth]/route.ts handlers are defined so that outside server (in this case github auth via next) can access our app programatically
-   Path helpers in src/paths.ts
-   Use auth (cookies make pages dynamic) and still make page static. Home page was dynamic because of header. Instead of using the "const session = await auth()" within the Header Server component, we will render the Client component HeaderAuth and delegate the handling of the session to that component
-   Form validation with zod and FormStateTypes
-   Form loading state used in `src/components/common/form-button.tsx`
-   useFormState action with additional param using bind
-   Typescript Awaited type in src/db/queries/posts.ts
-   Request memoization in `src/db/queries/comments.ts` to reduce amount of queries to the DB
-   Suspense + Skeleton components to improve loading experience in `src/app/topics/[slug]/posts/[postId]/page.tsx`
-   Access query string param from client component wrapped in Suspense: src/components/search-input.tsx
-   Access query string param from Server component: src/app/search/page.tsx
