"use client";

import { useEffect, useState } from "react";
import { fetchRates, type RatesResult } from "@/lib/currency";

export type RatesState = { status: "idle" | "loading" | "error" } | { status: "ok"; data: RatesResult };

// One request is shared by every component on the page.
let inflight: Promise<RatesResult> | null = null;

/** Load live exchange rates. Pass `enabled = false` to defer the request until it is needed. */
export function useRates(enabled = true): RatesState {
  const [state, setState] = useState<RatesState>({ status: "idle" });

  useEffect(() => {
    if (!enabled) {
      return;
    }
    let alive = true;
    setState((s) => (s.status === "ok" ? s : { status: "loading" }));
    inflight ??= fetchRates().catch((e: unknown) => {
      inflight = null;
      throw e;
    });
    inflight
      .then((data) => {
        if (alive) {
          setState({ status: "ok", data });
        }
      })
      .catch(() => {
        if (alive) {
          setState({ status: "error" });
        }
      });
    return () => {
      alive = false;
    };
  }, [enabled]);

  return state;
}
