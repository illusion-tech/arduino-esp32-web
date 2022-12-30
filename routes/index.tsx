import { Head } from "$fresh/runtime.ts";
import Device from "../islands/device.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>
      <Device />
    </>
  );
}
