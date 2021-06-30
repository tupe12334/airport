import GeneratorService from "./Generator.service";
require("dotenv-expand")(require("dotenv").config());
(async () => {
  setInterval(async () => {
    const randomTarget = 0.8;
    const W1open = await GeneratorService.checkifW1IsOpen();
    W1open &&
      Math.random() > randomTarget &&
      console.log(await GeneratorService.addPlaneToW1());
    const K = await GeneratorService.getK();
    !K?.airplane &&
      Math.random() + 0.5 > randomTarget &&
      (await GeneratorService.addPlaneToWaypoint("K"));
  }, 1000);
})();
