import { Providers } from "../redux/provider";
import "./globals.css";

export const metadata = {
  title: "Character Queue Viewer",
  description: "View the character commission queue",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
