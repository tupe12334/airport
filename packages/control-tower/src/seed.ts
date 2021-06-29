import prisma from "./utils/prisma.service";
(async () => {
  console.log("seed");
  try {
    await prisma.waypoint.createMany({
      data: [
        { name: "W1" },
        { name: "W2" },
        { name: "Final" },
        { name: "Runway" },
        { name: "departure" },
        { name: "K" },
        { name: "Z" },
      ],
    });
  } catch (error) {}
})();
