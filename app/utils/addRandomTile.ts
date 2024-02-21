export function addRandomTile(tiles: Array<number[]>): Array<number[]> {
	const emptyTiles = new Set<number>();

	const oneDimTiles = tiles.flat();

	for (let i = 0; i < oneDimTiles.length; i++) {
		if (oneDimTiles[i] == 0) emptyTiles.add(i);
	}

	const randomIdx = Math.round(Math.random() * (emptyTiles.size - 1));

	const chosenTile = Array.from(emptyTiles)[randomIdx];

	const row = Math.floor(chosenTile / 4);
	const col = chosenTile % 4;
	tiles[row][col] = 2;

	return tiles;
}
