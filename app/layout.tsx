import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          {" "}
          <header className="w-full flex flex-row justify-between items-center">
            <SignedOut>
              <div className="w-full flex flex-row justify-center items-center">
                <div className="px-4 py-2 border border-white bg-black text-white rounded hover:bg-white hover:text-black hover:border-black flex flex-row justify-center items-center">
                  <SignInButton />
                </div>
              </div>
            </SignedOut>
          </header>
          <SignedIn>
            <main>{children}</main>
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  );
}
