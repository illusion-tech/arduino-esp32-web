import { Head } from "$fresh/runtime.ts";
import SignForm from "../islands/sign-form.tsx";

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
