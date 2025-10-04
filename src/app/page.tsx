"use client"

import shortUUID from 'short-uuid';
import React from "react";

export default function Home() {
  const [input, setInput] = React.useState("");
  const [copied, setCopied] = React.useState<string | null>(null);

  const shortUUIDTranslator = shortUUID();

  function translate(input: string) {
    if (input === "") {
      return "";
    }

    try {
      return shortUUIDTranslator.toUUID(input);
    } catch (error) {
      console.log(error);
      return "";
    }
  }

  function toShort(input: string) {
    if (input === "") {
      return "";
    }

    try {
      return shortUUIDTranslator.fromUUID(input);
    } catch (e) {
      console.log(e);
      return "";
    }
  }

  const fullUUID = translate(input);
  const shortId = toShort(input);

  function copy(value: string, label: string) {
    if (!value) return;
    navigator.clipboard.writeText(value).then(() => {
      setCopied(label);
      setTimeout(() => setCopied(null), 1200);
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <main className="mx-auto max-w-3xl px-6 py-16">
        <header className="mb-8 text-center sm:text-left">
          <h1 className="text-3xl font-semibold tracking-tight">Short UUID Converter</h1>
          <p className="mt-2 text-sm text-slate-500">Paste either a Short UUID or a full UUID. We will convert both ways.</p>
        </header>

        <div className="flex flex-col gap-4">
          <label htmlFor="converter-input" className="text-sm font-medium text-slate-700">
            Input
          </label>
          <input
            id="converter-input"
            type="text"
            placeholder="Enter Short UUID or full UUID..."
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-base shadow-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            value={input}
            onChange={(e) => setInput(e.target.value.trim())}
          />
          <p className="text-xs text-slate-500">Tip: You can paste either format; results appear below when valid.</p>
        </div>

        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          {/* Full UUID card */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold text-slate-700">Full UUID</h2>
              <button
                type="button"
                onClick={() => copy(fullUUID, "uuid")}
                disabled={!fullUUID}
                className="rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Copy full UUID"
              >
                {copied === "uuid" ? "Copied" : "Copy"}
              </button>
            </div>
            <div className="mt-2 min-h-[2.5rem] select-all break-all rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-800">
              {fullUUID || <span className="text-slate-400">—</span>}
            </div>
          </div>

          {/* Short UUID card */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold text-slate-700">Short UUID</h2>
              <button
                type="button"
                onClick={() => copy(shortId, "short")}
                disabled={!shortId}
                className="rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Copy short UUID"
              >
                {copied === "short" ? "Copied" : "Copy"}
              </button>
            </div>
            <div className="mt-2 min-h-[2.5rem] select-all break-all rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-800">
              {shortId || <span className="text-slate-400">—</span>}
            </div>
          </div>
        </section>

        <footer className="mt-10 text-center text-xs text-slate-400">
          Built with <a href="https://www.npmjs.com/package/short-uuid">short-uuid</a>
        </footer>
      </main>
    </div>
  );
}
