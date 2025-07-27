import { create } from "zustand";

// Middleware for persisting the store to storage (e.g., localStorage)
import { persist, createJSONStorage } from "zustand/middleware";

// Middleware for enabling Immer (mutable-style updates with structural sharing)
import { immer } from "zustand/middleware/immer";

// Type from vanilla Zustand for defining store creators
import { StateCreator } from "zustand/vanilla";

type ConfigType<T> = {
  // Optional name for the persisted store (used as the key in storage)
  name?: string;
  // Optional custom storage (defaults to localStorage)
  storage?: Storage;
  // If true, persistence will be skipped entirely
  skipPersist?: boolean;
  // Keys of the store state to exclude from persistence
  excludeFromPersist?: Array<keyof T>;
};

const createStore = <T extends object>(
  // The original store creator function with Immer middleware
  storeCreator: StateCreator<T, [["zustand/immer", never]], []>,
  // Optional config object
  config?: ConfigType<T>,
) => {
  // Destructure and provide defaults from config
  const {
    name, // name of the store for persistence
    storage, // optional custom storage (e.g., sessionStorage)
    skipPersist = false, // default: don't skip persist
    excludeFromPersist = [] as Array<keyof T>, // default: don't exclude any keys
  } = config || {};

  // Wrap the store creator in Immer middleware
  const immerStore = immer(storeCreator);

  // If persistence is disabled, return a plain Immer store
  if (skipPersist) {
    return create<T>()(immerStore);
  }

  // If persistence is enabled, wrap it in the persist middleware
  return create<T>()(
    persist(immerStore, {
      // Key under which the state will be stored (in localStorage or custom storage)
      name: name || "zustand-store",
      // Use the provided storage or fallback to localStorage
      storage: createJSONStorage(() => storage || localStorage),
      // Filter out excluded keys from the persisted state
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(
            ([key]) => !excludeFromPersist.includes(key as keyof T),
          ),
        ),
    }),
  );
};

export { createStore };
