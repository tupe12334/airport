import { Prisma } from ".prisma/client";

class MessageParser {
  constructor() {}
  radioCheck(message: string): Prisma.MessegeCreateInput {
    return {
      from: message.substr(0, message.toLowerCase().indexOf("radio")).trim(),
      content: message.substr(message.indexOf("radio")).trim(),
    };
  }
}
export default new MessageParser();
