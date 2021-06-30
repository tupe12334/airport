import { Airplane } from "@prisma/client";
import axios from "axios";

class AirplaneApi {
  async getAirplaneFromWaypoint(name): Promise<Airplane> {
    try {
      return (
        await axios.get(
          `${process.env.NEXT_PUBLIC_CONTROL_TOWER_URL}/waypoint/${name}/airplane`
        )
      ).data;
    } catch (error) {}
  }
  async getAirplaneById(id: string) {
    try {
      return (
        await axios.get(
          `${process.env.NEXT_PUBLIC_CONTROL_TOWER_URL}/airplane/id/${id}`
        )
      ).data.meta;
    } catch (error) {}
  }
}
export default new AirplaneApi();
