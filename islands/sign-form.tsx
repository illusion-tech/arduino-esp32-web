import { IS_BROWSER } from "$fresh/runtime.ts";
import { IAkSkMessages } from "@interface/ak-sk.interface.ts";
import { useState } from "preact/hooks";

const apiEndpoint = "http://localhost:8000";

export default function SignForm() {
  fetch(`${apiEndpoint}/api/iot/aksk`)
    .then((response) => response.json())
    .then((result: IAkSkMessages) => {
      const { key, secret } = result;
      if (key && secret && IS_BROWSER) window.location.href = "/main";
    })
    .catch(() => null);

  const [key, setKey] = useState("");
  const [secret, setSecret] = useState("");

  const confirm = async () => {
    try {
      const resp = await fetch(`${apiEndpoint}/api/iot/aksk`, {
        method: "POST",
        body: JSON.stringify({ key, secret }),
      });
      if (resp.ok) window.location.href = "/main";
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <section className="p-10">
      <h3 className="text-base font-semibold text-gray-900 mb-6">请输入密钥</h3>
      <div className="w-96">
        <input
          name="key"
          type="text"
          required
          className="relative block w-full appearance-none rounded-md border border-gray-300 mb-2 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          placeholder="Key"
          value={key}
          onChange={(e) => setKey(e.currentTarget.value)}
        />
        <input
          name="secret"
          type="text"
          required
          className="relative block w-full appearance-none rounded-md border border-gray-300 mb-2 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          placeholder="Secret"
          value={secret}
          onChange={(e) => setSecret(e.currentTarget.value)}
        />
        <button
          onClick={confirm}
          disabled={!(key && secret)}
          className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-indigo-300"
        >
          确定
        </button>
      </div>
    </section>
  );
}
