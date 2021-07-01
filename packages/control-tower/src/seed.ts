import prisma from "./utils/prisma.service";
(async () => {
  console.log("seed");
  try {
    await prisma.airport.create({
      data: {
        country: "Israel",
        name: "Ben Gurion",
        Runways: {
          create: [
            { Diraction: 30.0, Length: 3112, Lat: 31.999967, Lng: 34.8942 },
          ],
        },
        controllers: {
          createMany: {
            data: [
              { RF: "F120D5", Name: "DEP", Country: "Israel" },
              { RF: "F121D4", Name: "APP", Country: "Israel" },
              { RF: "F134D6", Name: "TWR", Country: "Israel" },
            ],
          },
        },

        Ground: {
          create: {
            waypoints: {
              createMany: {
                data: [
                  // {
                  //   ControllerName: "TWR",
                  //   name: "Runway 30",
                  //   Country: "Israel",
                  //   rf: "F134D6",
                  //   Lat: 31.999967,
                  //   Lng: 34.8942,
                  // },
                  {
                    ControllerName: "TWR",
                    name: "K",
                    Country: "Israel",
                    rf: "F134D6",
                    Lat: 31.997675,
                    Lng: 34.892297,
                  },
                  {
                    ControllerName: "TWR",
                    name: "Z",
                    Country: "Israel",
                    rf: "F134D6",
                    Lat: 32.008811,

                    Lng: 34.869511,
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
                    ControllerName: "APP",
                    name: "W1",
                    Country: "Israel",
                    rf: "F121D4",
                    Lat: 31.896111,
                    Lng: 35.1475,
                  },
                  {
                    ControllerName: "APP",
                    name: "MOSHE",
                    Country: "Israel",
                    rf: "F121D4",
                    Lat: 31.8975,
                    Lng: 35.090833,
                  },
                  {
                    ControllerName: "APP",
                    name: "FAP",
                    Country: "Israel",
                    rf: "F121D4",
                    Lat: 31.924167,
                    Lng: 35.039722,
                  },
                ],
              },
            },
          },
        },
        SIDs: {
          create: {
            waypoints_by_order: {
              createMany: {
                data: [
                  {
                    Country: "Israel",
                    name: "ROTEM",
                    rf: "F120D5",
                    ControllerName: "DEP",
                    Lat: 32.000833,
                    Lng: 34.731944,
                  },
                ],
              },
            },
          },
        },
      },
    });
  } catch (error) {}
})();
