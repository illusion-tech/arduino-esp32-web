import { Handlers } from "$fresh/server.ts";

export const handler: Handlers<null> = {
  async POST(req) {
    const file = await Deno.open("aksk.json", { create: true, write: true });
    await req.body?.pipeTo(file.writable);

    return new Response();
  },

  async GET(_) {
    const file = await Deno.open("aksk.json", { create: true, write: true, read: true });

    return new Response(file.readable);
  },
};
