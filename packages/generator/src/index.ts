import GeneratorService from "./Generator.service";
require("dotenv-expand")(require("dotenv").config());
(async () => {
  setInterval(async () => {
    const W1open = await GeneratorService.checkifW1IsOpen();
    W1open && console.log(await GeneratorService.addPlaneToW1());
  }, 1000);
})();
