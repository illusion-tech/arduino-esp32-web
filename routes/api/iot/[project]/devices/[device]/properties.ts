// deno-lint-ignore-file
import { Handlers } from "$fresh/server.ts";
import { IAkSkMessages } from "../../../../../../interface/ak-sk.interface.ts";
import { IDeviceProps } from "../../../../../../interface/device-props.interface.ts";
import { Signer } from "../../../../../../tools/signer.ts";

export const handler: Handlers<null> = {
  async GET(_, ctx) {
    let aksk: IAkSkMessages;
    const akskResponse = await fetch("http://localhost:8000/api/iot/aksk");
    const akskResult = await akskResponse.json();
    if (akskResult.success) {
      aksk = akskResult.value;
    } else {
      throw Error("AK/SK is not exist!");
    }

    const { project, device } = ctx.params;
    const url = new URL(_.url);
    const serviceId = url.searchParams.get("service_id") || "[]";
    const iotUrl =
      `https://iotda.cn-north-4.myhuaweicloud.com/v5/iot/${project}/devices/${device}/properties?service_id=${serviceId}`;

    const request = new Request(iotUrl, {
      method: "GET",
    });

    const signer = new Signer(aksk.key, aksk.secret);
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
