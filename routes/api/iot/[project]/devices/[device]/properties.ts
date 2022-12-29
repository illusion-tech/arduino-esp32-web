// deno-lint-ignore-file
import { Handlers } from "$fresh/server.ts";
import { DeviceProps } from "../../../../../../interface/device-props.ts";
import { Signer } from "../../../../../../tools/signer.ts";


//Set the AK/SK to sign and authenticate the request.
const Key = "TM2ZMQVGYNMVAVPU2QLN";
const Secret = "0AbAjSJznraA0MsZUezX0hoMcrV5hOHrZEgzzKDH";

export const handler: Handlers<null> = {
  async GET(_, ctx) {
    const { project, device } = ctx.params;
    const url =
      `https://iotda.cn-north-4.myhuaweicloud.com/v5/iot/${project}/devices/${device}/shadow`;

    const request = new Request(url, {
      method: "GET",
    });

    const signer = new Signer(Key, Secret);
    await signer.sign(request);

    const response = await fetch(request);
    if (response.status === 404) {
      return ctx.render(null);
    }

    const data: DeviceProps = (await response.json()).shadow[0].reported.properties;
    return new Promise<Response>((resolve, reject) => {
      resolve(new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      }));
    });
  },
};