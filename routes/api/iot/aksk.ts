import { Handlers } from "$fresh/server.ts";
import { IAkSkMessages } from "../../../interface/ak-sk.interface.ts";

export const handler: Handlers<null> = {
  async POST(req) {
    const fileData = await req.json();
    const encoder = new TextEncoder();
    const data = encoder.encode(
      JSON.stringify(fileData, null, "  ")
    );
    await Deno.writeFile("./aksk.json", data);

    return new Response(JSON.stringify({ "success": true }), {
      headers: { "Content-Type": "application/json" },
    });
  },

  async GET(_) {
    const module = await import("../../../aksk.json", {
      assert: { type: "json" },
    });
    const { key, secret } = module.default as IAkSkMessages;

    return new Response(
      JSON.stringify(
        key && secret
          ? { success: true, value: { key, secret } }
          : { success: false }
      ),
      {
        headers: { "Content-Type": "application/json" },
      },
    );
  },
};
