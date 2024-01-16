const fs = require("node:fs");

fs.readFile("./ratings.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const result = data
    .split(/\n\n/)
    .map((chunk) => {
      const [region, ...rest] = chunk.split(/\n/);
      const [regionLetters] = region.split(/\s/);

      return rest
        .filter(Boolean)
        .map((line) => {
          const [ranges, rating] = line.replace(/[\s\*\.]/g, "").split(/\:/);

          return ranges
            .split(",")
            .reduce((acc, item) => {
              let add = [];

              if (/^\d{1,2}\-\d{1,2}$/.test(item)) {
                const [a, b] = item.split("-");

                for (let i = parseInt(a); i <= b; i++) {
                  add.push(i);
                }
              } else {
                add.push(parseInt(item));
              }

              return [...acc, ...add];
            }, [])
            .map((item) => `${regionLetters}${item}`)
            .reduce((acc, item) => ({ ...acc, [item]: rating }), {});
        })
        .reduce((acc, item) => ({ ...acc, ...item }), {});
    })
    .reduce((acc, item) => ({ ...acc, ...item }), {});

  console.log(result);

  const incorrectValues = Object.entries(result).filter(
    ([code, rating]) => !rating || !/^[A-Z]{1,2}\d{1,2}$/.test(code)
  );

  if (incorrectValues.length) {
    console.log("incorrect values found!", incorrectValues);
    return;
  } else {
    fs.writeFileSync("./ratings.json", JSON.stringify(result));

    console.log(`Ratings has been written to file!`);
  }
});
