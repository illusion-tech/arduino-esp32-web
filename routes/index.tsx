import { Head } from "$fresh/runtime.ts";
import SignForm from "../islands/sign-form.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>
      <SignForm />
    </>
  );
}
