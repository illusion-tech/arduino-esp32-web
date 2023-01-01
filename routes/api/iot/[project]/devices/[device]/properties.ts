// deno-lint-ignore-file
import { Handlers } from "$fresh/server.ts";
import { IAkSkMessages } from "../../../../../../interface/ak-sk.interface.ts";
import { Signer } from "../../../../../../tools/signer.ts";

const endpoint = "https://iotda.cn-north-4.myhuaweicloud.com";

export const handler: Handlers<null> = {
  async GET(_, ctx) {
    const module = await import("../../../../../../aksk.json", {
      assert: { type: "json" },
    });
    const { key, secret } = module.default as IAkSkMessages;
    if (!(key && secret)) {
      throw Error("AK/SK is not exist!");
    }

    const { project, device } = ctx.params;
    const url = new URL(_.url);
    const serviceId = url.searchParams.get("service_id") || "";
    const iotUrl =
      `${endpoint}/v5/iot/${project}/devices/${device}/properties?service_id=${serviceId}`;

    const request = new Request(iotUrl, {
      method: "GET",
    });

    const signer = new Signer(key, secret);
    await signer.sign(request);

    return await fetch(request);
  },
};
