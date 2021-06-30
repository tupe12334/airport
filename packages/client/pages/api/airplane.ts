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
}
export default new AirplaneApi();
