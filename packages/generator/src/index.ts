import GeneratorService from "./Generator.service";
require("dotenv-expand")(require("dotenv").config());
(async () => {
  setInterval(async () => {
    const W1open = await GeneratorService.checkifW1IsOpen();
    console.log(W1open);

    W1open &&
      Math.random() > 0.8 &&
      console.log(await GeneratorService.addPlaneToW1());
  }, 1000);
})();
