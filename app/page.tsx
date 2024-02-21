import { getFrameMetadata } from "@coinbase/onchainkit";
import type { Metadata } from "next";
import { NEXT_PUBLIC_URL } from "./config";

const frameMetadata = getFrameMetadata({
	buttons: [
		{
			label: "⬅️",
		},
		{
			label: "⬆️",
		},
		{
			label: "⬇️",
		},
		{
			label: "➡️",
		},
	],
	image: {
		src: `${NEXT_PUBLIC_URL}/public/img/init.png`,
		aspectRatio: "1:1",
	},
	post_url: `${NEXT_PUBLIC_URL}/api/move`,
});

export const metadata: Metadata = {
	title: "Onframe 2048 Game",
	description: "Onframe 2048 Game",
	openGraph: {
		title: "Onframe 2048 Game",
		description: "Onframe 2048 Game",
		images: [`${NEXT_PUBLIC_URL}/public/img/init.png`],
	},
	other: {
		...frameMetadata,
	},
};

export default function Page() {
	return (
		<>
			<h1>Onframe 2048 Game</h1>
		</>
	);
}
