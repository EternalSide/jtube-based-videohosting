import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {ClerkProvider} from "@clerk/nextjs";
import {EdgeStoreProvider} from "../lib/edgestore";
import {ruRU} from "@clerk/localizations";
import {dark} from "@clerk/themes";
import {ChildrenProps} from "@/constants/types/index.shared";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
	title: "Видеохостинг JTUBE",
	description: "JTUBE — просто видеохостинг.",
	icons: {
		icon: "/logo.png",
	},
};

export default async function RootLayout({children}: ChildrenProps) {
	return (
		<ClerkProvider
			afterSignInUrl='/'
			localization={ruRU}
			appearance={{
				baseTheme: dark,
			}}
		>
			<html lang='ru'>
				<body className={inter.className}>
					<EdgeStoreProvider>{children}</EdgeStoreProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
