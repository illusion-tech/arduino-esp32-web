import { IS_BROWSER } from "$fresh/runtime.ts";
import { useState } from "preact/hooks";

const endpoint = "http://localhost:8000";

export default function SignForm() {
  fetch(`${endpoint}/api/iot/aksk`)
    .then((response) => response.json())
    .then((result) => {
      if (result.success && IS_BROWSER) window.location.href = "/main";
    });

  const [key, setKey] = useState("");
  const [secret, setSecret] = useState("");

  const confirm = async () => {
    try {
      const resp = await fetch(`${endpoint}/api/iot/aksk`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key, secret }),
      });
      const result = await resp.json();
      if (result.success) {
        window.location.href = "/main";
      }
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
          className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          确定
        </button>
      </div>
    </section>
  );
}
