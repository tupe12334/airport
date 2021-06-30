import prisma from "./utils/prisma.service";
(async () => {
  console.log("seed");
  try {
    await prisma.airport.create({
      data: {
        country: "Israel",
        name: "Ben Gurion",
        controllers: {
          create: [
            { RF: "F120D5", Name: "DEP" },
            { RF: "F121D4", Name: "ACC" },
            { RF: "F134D6", Name: "TWR" },
          ],
        },
        Ground: {
          create: {
            waypoints: {
              create: [{ name: "Runway" }, { name: "K" }, { name: "Z" }],
            },
          },
        },
      },
    });
  } catch (error) {}
  try {
    await prisma.iLS.create({
      data: {
        code: "1",
        waypoints_by_order: {
          connectOrCreate: [
            { where: { name: "W1" }, create: { name: "W1" } },
            { where: { name: "W2" }, create: { name: "W2" } },
            { where: { name: "Final" }, create: { name: "Final" } },
          ],
        },
      },
    });
  } catch (error) {}
  try {
    await prisma.sID.create({
      data: {
        code: "1",
        waypoints_by_order: {
          connectOrCreate: [
            { where: { name: "departure" }, create: { name: "departure" } },
          ],
        },
      },
    });
  } catch (error) {}
})();
