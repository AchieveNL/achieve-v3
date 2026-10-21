"use client";

import { useCallback, useRef } from "react";

/**
 * Callback refs by name, so converted design markup can keep `{...ref_("setFc0")}`.
 * Read elements via `els.current.setFc0`.
 */
export function useNamedRefs() {
  const els = useRef<Record<string, Element | null>>({});
  const cache = useRef<Record<string, (el: Element | null) => void>>({});
  const ref_ = useCallback((name: string) => {
    if (!cache.current[name])
      cache.current[name] = (el: Element | null) => {
        els.current[name] = el;
      };
    return { ref: cache.current[name] };
  }, []);
  return { els, ref_ };
}
