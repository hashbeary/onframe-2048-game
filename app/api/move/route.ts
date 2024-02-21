import { NEXT_PUBLIC_URL } from "@/app/config";
import {
	FrameRequest,
	getFrameHtmlResponse,
	getFrameMessage,
} from "@coinbase/onchainkit";
import { NextRequest, NextResponse } from "next/server";

async function getResponse(req: NextRequest): Promise<NextResponse> {
	// Try to use JWT Token
	const body: FrameRequest = await req.json();

	const { message } = await getFrameMessage(body, {
		neynarApiKey: "NEYNAR_ONCHAIN_KIT",
	});

	return new NextResponse(
		getFrameHtmlResponse({
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
				src: ``,
				aspectRatio: "1:1",
			},
			post_url: `${NEXT_PUBLIC_URL}/api/move`,
		})
	);
}

export async function POST(req: NextRequest): Promise<Response> {
	return getResponse(req);
}

export const dynamic = "force-dynamic";
