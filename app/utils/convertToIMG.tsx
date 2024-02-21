import * as fs from "fs";
import { join } from "path";
import satori from "satori";
import sharp from "sharp";

export async function convertToIMG(tiles: Array<[number]>): Promise<string> {
	const font = fs.readFileSync(
		join(process.cwd(), "public/fonts/ProtestStrike-Regular.ttf")
	);

	const SVG = await satori(
		<div
			style={{
				display: "flex",
				flexWrap: "wrap",
				textAlign: "center",
				color: "#FFFFFF",
				width: "100%",
				height: "100%",
				backgroundColor: "#16101E",
				border: "5px solid #16101E",
				lineHeight: 1.2,
				fontSize: 48,
			}}
		>
			{tiles.flat().map((val, i) => {
				return (
					<div
						key={i}
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							height: "25%",
							width: "25%",
							color: "#FFFFFF",
							backgroundColor: "#DD6B4B",
							border: "5px solid #16101E",
						}}
					>
						{val}
					</div>
				);
			})}
		</div>,
		{
			width: 500,
			height: 500,
			fonts: [
				{
					name: "Protest Strike Regular",
					data: font,
					weight: 400,
					style: "normal",
				},
			],
		}
	);

	// const SVG = await satori(
	// 	{
	// 		type: "div",
	// 		props: {
	// 			style: {
	// 				display: "flex",
	// 				flexWrap: "wrap",
	// 				textAlign: "center",
	// 				color: "#FFFFFF",
	// 				width: "100%",
	// 				height: "100%",
	// 				backgroundColor: "#16101E",
	// 				border: "5px solid #16101E",
	// 				lineHeight: 1.2,
	// 				fontSize: 48,
	// 			},
	// 			children: tiles.flat().map((val, i) => {
	// 				return {
	// 					type: "div",
	// 					props: {
	// 						children: val,
	// 						style: {
	// 							display: "flex",
	// 							justifyContent: "center",
	// 							alignItems: "center",
	// 							height: "25%",
	// 							width: "25%",
	// 							color: "#FFFFFF",
	// 							backgroundColor: "#DD6B4B",
	// 							border: "5px solid #16101E",
	// 						},
	// 					},
	// 				};
	// 			}),
	// 		},
	// 	},
	// 	{
	// 		width: 500,
	// 		height: 500,
	// 		fonts: [
	// 			{
	// 				name: "Protest Strike Regular",
	// 				data: font,
	// 				weight: 400,
	// 				style: "normal",
	// 			},
	// 		],
	// 	}
	// );

	const PNGBase64 = (
		await sharp(Buffer.from(SVG)).toFormat("png").toBuffer()
	).toString("base64");

	return "data:image/png;base64," + PNGBase64;
}
