const fs = require('fs')
const input = fs.readFileSync('./example_input_1.txt').toString().split("\n")

let matches, regex = /#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/;
let tiles = {};
let numOverlapTiles = 0;
let claims = input.map(line => {
    matches = regex.exec(line);
    return {
        id: +matches[1],
        x: +matches[2],
        y: +matches[3],
        w: +matches[4],
        h: +matches[5]
    };
});

claims.forEach(rect => {
            for (let x = +rect.x; x < +rect.x + +rect.w; ++x) {
                for (let y = +rect.y; y < +rect.y + +rect.h; ++y) {
                    tiles[`${x},${y}`] = (tiles[`${x},${y}`] || 0) + 1;
        }
    }
});

for (let tile of Object.values(tiles)) {
    if (tile > 1) ++numOverlapTiles;
}

result[0] = numOverlapTiles;

const overlap = (a, b) => ((a.x < b.x + b.w) && (a.y < b.y + b.h) && (b.x < a.x + a.w) && (b.y < a.y + a.h));

let findLoneClaimID = () => {
    for (let a = 0; a < claims.length; ++a) {
        let loneClaim = true;
        for (let b = 0; b < claims.length; ++b) {
            if (a === b) continue;
            if (overlap(claims[a], claims[b])) {
                loneClaim = false;
                break;
            }
        }
        
        if (loneClaim)
            return claims[a].id;
    }
}

result[1] = findLoneClaimID();