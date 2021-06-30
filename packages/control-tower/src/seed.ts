import prisma from "./utils/prisma.service";
(async () => {
  console.log("seed");
  try {
    await prisma.airport.create({
      data: {
        country: "Israel",
        name: "Ben Gurion",
        controllers: {
          createMany: {
            data: [
              { RF: "F120D5", Name: "DEP" },
              { RF: "F121D4", Name: "ACC" },
              { RF: "F134D6", Name: "TWR" },
            ],
          },
        },
        Ground: {
          create: {
            waypoints: {
              createMany: {
                data: [
                  {
                    ControllerName: "TWR",
                    name: "Runway",
                    Country: "Israel",
                  },
                  {
                    ControllerName: "TWR",
                    name: "K",
                    Country: "Israel",
                  },
                  {
                    ControllerName: "TWR",
                    name: "Z",
                    Country: "Israel",
                  },
                ],
              },
            },
          },
        },
        ILSs: {
          create: {
            waypoints_by_order: {
              createMany: {
                data: [
                  {
                    ControllerName: "ACC",
                    name: "W1",
                    Country: "Israel",
                  },
                  {
                    ControllerName: "ACC",
                    name: "W2",
                    Country: "Israel",
                  },
                  {
                    ControllerName: "ACC",
                    name: "Final",
                    Country: "Israel",
                  },
                ],
              },
            },
          },
        },
        SIDs: {
          create: {
            waypoints_by_order: {
              createMany: { data: [{ Country: "Israel", name: "Departure" }] },
            },
          },
        },
      },
    });
  } catch (error) {}
})();
