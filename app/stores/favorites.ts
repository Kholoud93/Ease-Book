const storageKey = "bookease.favorites";

export const useFavoritesStore = defineStore("favorites", () => {
  const favorites = ref<string[]>([]);
  let storageListenerAttached = false;
  const isFavorite = (id: string) => favorites.value.includes(id);

  const load = () => {
    if (!import.meta.client) return;
    try {
      const stored = localStorage.getItem(storageKey);
      favorites.value = stored ? JSON.parse(stored) : [];
    } catch {
      favorites.value = [];
    }
    if (!storageListenerAttached) {
      window.addEventListener("storage", (event: StorageEvent) => {
        if (event.key !== storageKey) return;
        try {
          favorites.value = event.newValue ? JSON.parse(event.newValue) : [];
        } catch {
          favorites.value = [];
        }
      });
      storageListenerAttached = true;
    }
  };

  const save = () => {
    if (!import.meta.client) return;
    localStorage.setItem(storageKey, JSON.stringify(favorites.value));
  };

  const toggle = (id: string) => {
    favorites.value = favorites.value.includes(id) ? favorites.value.filter((item) => item !== id) : [...favorites.value, id];
    save();
  };

  return { favorites, isFavorite, load, toggle };
});
