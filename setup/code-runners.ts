import { defineCodeRunnersSetup } from "@slidev/types";


async function executePythonCodeRemotely(code: string): Promise<string> {
  const response = await fetch("https://emkc.org/api/v2/piston/execute", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      language: "python",
      version: "3.x", // Чаще всего доступно "3.x" для последней Python 3 версии
      files: [
        {
          name: "code.py",
          content: code,
        },
      ],
      stdin: "",
      args: [],
    }),
  });

  if (!response.ok) {
    // Пытаемся прочитать ответ от API
    const errorData = await response.json().catch(() => null);
    const message = errorData?.message ?? response.statusText;
    throw new Error(`Remote execution failed: ${message}`);
  }

  const data = await response.json();
  // stdout и stderr находятся внутри data.run
  const stderr = data.run?.stderr;
  const stdout = data.run?.stdout;

  if (stderr) {
    return `Error: ${stderr}`;
  }
  return stdout ?? "";
}



export default defineCodeRunnersSetup(() => {
  return {
    async python(code, ctx) {
      // Somehow execute the code and return the result
      const result = await executePythonCodeRemotely(code);
      return {
        text: result,
      };
    },
  };
});
