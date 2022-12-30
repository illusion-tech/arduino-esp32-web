// deno-lint-ignore-file
import { Handlers } from "$fresh/server.ts";
import { IDeviceProps } from "../../../../../../interface/device-props.interface.ts";
import { Signer } from "../../../../../../tools/signer.ts";


//Set the AK/SK to sign and authenticate the request.
const Key = "TM2ZMQVGYNMVAVPU2QLN";
const Secret = "0AbAjSJznraA0MsZUezX0hoMcrV5hOHrZEgzzKDH";

export const handler: Handlers<null> = {
  async GET(_, ctx) {
    const { project, device } = ctx.params;
    const url = new URL(_.url);
    const serviceId = url.searchParams.get("service_id") || "[]";
    const iotUrl =
      `https://iotda.cn-north-4.myhuaweicloud.com/v5/iot/${project}/devices/${device}/properties?service_id=${serviceId}`;

    const request = new Request(iotUrl, {
      method: "GET",
    });

    const signer = new Signer(Key, Secret);
    await signer.sign(request);

    const response = await fetch(request);
    if (response.status === 404) {
      return ctx.render(null);
    }

    const data: IDeviceProps = (await response.json()).response.services[0].properties;
    return new Promise<Response>((resolve, reject) => {
      resolve(new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      }));
    });
  },
};
