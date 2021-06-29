import prisma from "./utils/prisma.service";
(async () => {
  console.log("seed");
  try {
    await prisma.waypoint.createMany({
      data: [{ name: "W1" }, { name: "W2" }],
    });
  } catch (error) {}
})();
