// deno-lint-ignore-file
import { Handlers } from "$fresh/server.ts";
import { IAkSkMessages } from "@interface/ak-sk.interface.ts";
import { Signer } from "@tools/signer.ts";
import { loadSync } from "config/mod.ts";

const config = loadSync();
const endpoint = config["ENDPOINT"];
const projectId = config["PROJECTID"];

export const handler: Handlers<null> = {
  async GET(_, ctx) {
    const module = await import("../../../../../aksk.json", {
      assert: { type: "json" },
    });
    const { key, secret } = module.default as IAkSkMessages;
    if (!(key && secret)) {
      throw Error("AK/SK is not exist!");
    }

    const { deviceId } = ctx.params;
    const url = new URL(_.url);
    const serviceId = url.searchParams.get("service_id") || "";
    const iotUrl =
      `${endpoint}/v5/iot/${projectId}/devices/${deviceId}/properties?service_id=${serviceId}`;

    const request = new Request(iotUrl, {
      method: "GET",
    });

    const signer = new Signer(key, secret);
    await signer.sign(request);

    return await fetch(request);
  },
};
