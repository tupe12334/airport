import { PrismaClient } from ".prisma/client";
class PrismaService extends PrismaClient {
  constructor() {
    super();
    this.$connect();
  }
}
const PrismaInstanse = new PrismaService();
export default PrismaInstanse;
