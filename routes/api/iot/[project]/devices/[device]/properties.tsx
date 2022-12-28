// deno-lint-ignore-file
import { Handlers, PageProps } from "$fresh/server.ts";
import { Signer } from '../../../tools/signer.ts';

//Set the AK/SK to sign and authenticate the request.
const Key = "TM2ZMQVGYNMVAVPU2QLN";
const Secret = "0AbAjSJznraA0MsZUezX0hoMcrV5hOHrZEgzzKDH";

export const handler: Handlers<null> = {
  async GET(_, ctx) {
    const { project, device } = ctx.params;
    console.log(ctx.params);
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

    const data = (await response.json()).shadow[0].reported.properties;
    console.log(data);
    return new Promise<Response>((resolve, reject) => {
      resolve(new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      }));
    });
  },
};

export default function Page({ data }: PageProps<any | null>) {
  if (!data) {
    return <h1>Properties not found</h1>;
  }

  return (
    <div>
      <h1>温度: {data.Temperature}</h1>
      <p>湿度：{data.Humidity}</p>
    </div>
  );
}
