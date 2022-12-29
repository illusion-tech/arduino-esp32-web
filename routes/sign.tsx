import { Head } from "$fresh/runtime.ts";
import SignForm from "../islands/SignForm.tsx";

export default function Sign() {
  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>
      <SignForm />
    </>
  );
}
