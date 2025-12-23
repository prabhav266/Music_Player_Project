// Import Clerk's middleware for Next.js
import { clerkMiddleware } from '@clerk/nextjs/server';

// Default export the clerkMiddleware to make it work as middleware
export default clerkMiddleware();

// Optionally, configure the matcher to control where the middleware should run
export const config = {
  matcher: [
    // Protect everything except static files and public routes
    '/((?!_next|favicon.ico).*)',
  ],
}