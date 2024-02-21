export function moveTiles(
	tiles: Array<[number]>,
	moveDir: number
): Array<[number]> {
	// Left
	if (moveDir == 1) {
		for (let i = 0; i < 4; i++) {
			merge(i, 0, 0, 1);
		}

		for (let i = 0; i < 4; i++) {
			move(i, 0, 0, 1);
		}
	}
	// Up
	if (moveDir == 2) {
		for (let i = 0; i < 4; i++) {
			merge(0, i, 1, 0);
		}

		for (let i = 0; i < 4; i++) {
			move(0, i, 1, 0);
		}
	}

	// Down
	if (moveDir == 3) {
		for (let i = 0; i < 4; i++) {
			merge(3, i, -1, 0);
		}

		for (let i = 0; i < 4; i++) {
			move(3, i, -1, 0);
		}
	}

	// Right
	if (moveDir == 4) {
		for (let i = 0; i < 4; i++) {
			merge(i, 3, 0, -1);
		}

		for (let i = 0; i < 4; i++) {
			move(i, 3, 0, -1);
		}
	}

	function move(x: number, y: number, xoffset: number, yoffset: number) {
		if (
			(xoffset > 0 && !yoffset && x >= 0 && x < 3) ||
			(xoffset < 0 && !yoffset && x >= 1 && x < 4) ||
			(!xoffset && yoffset > 0 && y >= 0 && y < 3) ||
			(!xoffset && yoffset < 0 && y >= 1 && y < 4)
		) {
			if (tiles[x][y] === 0) {
				if (tiles[x + xoffset][y + yoffset] > 0) {
					[tiles[x][y], tiles[x + xoffset][y + yoffset]] = [
						tiles[x + xoffset][y + yoffset],
						0,
					];
				} else if (
					(xoffset > 0 &&
						!yoffset &&
						x < 2 &&
						tiles[x + xoffset * 2][y + yoffset * 2] > 0) ||
					(xoffset < 0 &&
						!yoffset &&
						x > 1 &&
						tiles[x + xoffset * 2][y + yoffset * 2] > 0) ||
					(!xoffset &&
						yoffset > 0 &&
						y < 2 &&
						tiles[x + xoffset * 2][y + yoffset * 2] > 0) ||
					(!xoffset &&
						yoffset < 0 &&
						y > 1 &&
						tiles[x + xoffset * 2][y + yoffset * 2] > 0)
				) {
					[tiles[x][y], tiles[x + xoffset * 2][y + yoffset * 2]] = [
						tiles[x + xoffset * 2][y + yoffset * 2],
						0,
					];
				} else if (
					(xoffset > 0 &&
						!yoffset &&
						x < 1 &&
						tiles[x + xoffset * 3][y + yoffset * 3] > 0) ||
					(xoffset < 0 &&
						!yoffset &&
						x > 2 &&
						tiles[x + xoffset * 3][y + yoffset * 3] > 0) ||
					(!xoffset &&
						yoffset > 0 &&
						y < 1 &&
						tiles[x + xoffset * 3][y + yoffset * 3] > 0) ||
					(!xoffset &&
						yoffset < 0 &&
						y > 2 &&
						tiles[x + xoffset * 3][y + yoffset * 3] > 0)
				) {
					[tiles[x][y], tiles[x + xoffset * 3][y + yoffset * 3]] = [
						tiles[x + xoffset * 3][y + yoffset * 3],
						0,
					];
				}
			}
			move(x + xoffset, y + yoffset, xoffset, yoffset);
		}
	}

	function merge(x: number, y: number, xoffset: number, yoffset: number) {
		if (
			(xoffset > 0 && !yoffset && x >= 0 && x < 3) ||
			(xoffset < 0 && !yoffset && x > 0 && x < 4) ||
			(!xoffset && yoffset > 0 && y >= 0 && y < 3) ||
			(!xoffset && yoffset < 0 && y > 0 && y < 4)
		) {
			if (tiles[x][y] > 0) {
				if (tiles[x][y] === tiles[x + xoffset][y + yoffset]) {
					[tiles[x][y], tiles[x + xoffset][y + yoffset]] = [
						tiles[x][y] + tiles[x + xoffset][y + yoffset],
						0,
					];
				} else if (
					((xoffset > 0 && !yoffset && x < 2) ||
						(xoffset < 0 && !yoffset && x > 1) ||
						(!xoffset && yoffset > 0 && y < 2) ||
						(!xoffset && yoffset < 0 && y > 1)) &&
					tiles[x][y] === tiles[x + xoffset * 2][y + yoffset * 2] &&
					tiles[x + xoffset][y + yoffset] === 0
				) {
					[tiles[x][y], tiles[x + xoffset * 2][y + yoffset * 2]] = [
						tiles[x][y] + tiles[x + xoffset * 2][y + yoffset * 2],
						0,
					];
				} else if (
					((xoffset > 0 && !yoffset && x < 1) ||
						(xoffset < 0 && !yoffset && x > 2) ||
						(!xoffset && yoffset > 0 && y < 1) ||
						(!xoffset && yoffset < 0 && y > 2)) &&
					tiles[x][y] === tiles[x + xoffset * 3][y + yoffset * 3] &&
					tiles[x + xoffset][y + yoffset] === 0 &&
					tiles[x + xoffset * 2][y + yoffset * 2] === 0
				) {
					[tiles[x][y], tiles[x + xoffset * 3][y + yoffset * 3]] = [
						tiles[x][y] + tiles[x + xoffset * 3][y + yoffset * 3],
						0,
					];
				}
			}
			merge(x + xoffset, y + yoffset, xoffset, yoffset);
		}
	}

	return tiles;
}
