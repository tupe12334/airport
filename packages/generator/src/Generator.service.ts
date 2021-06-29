import assert from "assert";
import axios from "axios";
require("dotenv-expand")(require("dotenv").config());
class GeneratorService {
  constructor() {
    this.checkEnv();
  }
  checkEnv() {
    assert(process.env.CONTROL_TOWER_URL);
  }
  async checkifW1IsOpen() {
    try {
      return (
        await axios.get(process.env.CONTROL_TOWER_URL + "/waypoint/isw1open")
      ).data;
    } catch (error) {}
  }
  async addPlaneToW1() {
    try {
      return (
        await axios.post(process.env.CONTROL_TOWER_URL + "/airplane/addToW1")
      ).data;
    } catch (error) {}
  }
}

export default new GeneratorService();
