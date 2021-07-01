import { PrismaClient } from "@prisma/client";
class PrismaService extends PrismaClient {
  constructor() {
    super();
    console.log("dsalkdgfoidsgajglg");

    this.$connect();
  }
}
export default new PrismaService();
