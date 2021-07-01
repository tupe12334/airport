import GeneratorService from "./Generator.service";
require("dotenv-expand")(require("dotenv").config());
(async () => {
  setInterval(async () => {
    const randomTarget = 0.8;
    const W1open = await GeneratorService.checkifW1IsOpen();
    W1open &&
      Math.random() > randomTarget &&
      (await GeneratorService.addPlaneToWaypoint("W1"));
    const K = await GeneratorService.getK();
    !K?.airplane &&
      Math.random() > randomTarget + 0.15 &&
      (await GeneratorService.addPlaneToWaypoint("K"));
  }, 10000);
})();
