import { Head } from "$fresh/runtime.ts";
import Device from "../islands/Device.tsx";

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
