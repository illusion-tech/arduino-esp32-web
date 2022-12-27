import { Head } from "$fresh/runtime.ts";
import SignIn from "../islands/SignIn.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>
      <SignIn />
    </>
  );
}
