import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/nav/navbar";
import { ClerkProvider } from "@clerk/nextjs";

const font = Montserrat({
	weight: "400",
	subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={`${font.className} antialiased max-w-7xl mx-auto px-2`}>
					<header className="mb-48">
						<NavBar />
					</header>
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}
