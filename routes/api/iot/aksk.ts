import { Handlers } from "$fresh/server.ts";
import { IAkSkMessages } from "../../../interface/ak-sk.interface.ts";

export const handler: Handlers<null> = {
  async POST(req) {
    const fileData = await req.json();
    await Deno.writeTextFile("./aksk.txt", JSON.stringify(fileData));

    return new Promise<Response>((resolve) => {
      resolve(
        new Response(JSON.stringify({ "success": true }), {
          headers: { "Content-Type": "application/json" },
        }),
      );
    });
  },

  async GET(_) {
    let akMessage: IAkSkMessages;
    try {
      const text = await Deno.readTextFile("aksk.txt");
      akMessage = JSON.parse(text);
    } catch (error) {
      console.error(error);
    }

    return new Promise<Response>((resolve) => {
      resolve(
        new Response(
          JSON.stringify(
            akMessage
              ? { success: true, value: akMessage }
              : { success: false }
          ),
          {
            headers: { "Content-Type": "application/json" },
          },
        ),
      );
    });
  },
};
