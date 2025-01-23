import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
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
              <div className={`w-full md:block md:w-auto`} id="navbar-default">
                <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                  <li className="px-4 py-2 border border-white bg-black text-white rounded hover:bg-white hover:text-black hover:border-black">
                    <SignInButton />
                  </li>
                </ul>
              </div>
            </SignedOut>{" "}
          </header>
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
