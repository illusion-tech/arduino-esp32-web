import { Handlers } from "$fresh/server.ts";
import { IAkSkMessages } from "../../../interface/ak-sk.interface.ts";

export const handler: Handlers<null> = {
  async POST(req) {
    const fileData = await req.json();
    console.log(JSON.stringify(fileData));
    await Deno.writeTextFile("./file.txt", JSON.stringify(fileData));

    return new Promise<Response>((resolve) => {
      resolve(
        new Response(JSON.stringify({ "success": true }), {
          headers: { "Content-Type": "application/json" },
        }),
      );
    });
  },
  async GET(_) {
    const text = await Deno.readTextFile("file.txt");
    const akMessage: IAkSkMessages = JSON.parse(text);
    console.log(text);
    return new Promise<Response>((resolve) => {
      resolve(
        new Response(JSON.stringify(akMessage), {
          headers: { "Content-Type": "application/json" },
        }),
      );
    });
  },
};
