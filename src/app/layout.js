import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Coinichi",
	description: "a simple clicker game",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#6366f1" />
			</head>
			<body className={inter.className}>{children}</body>
		</html>
	);
}
