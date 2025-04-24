# Minimal Svelte + Vite

Make [Svelte playground](https://svelte.dev/playground/hello-world)-ish pages. A single `App.svelte` is all you need — not a folder with a dozen json files.

# Dev

```
APP_DIR=2025_04_color_demo npm run dev
```

or

```
APP_DIR=2025_04_counter_demo npm run dev
```

# Build

```
APP_DIR=2025_04_color_demo npm run build
rsync -a dist/ demo@roadtolarissa.com:../../usr/share/nginx/html/2025_04_color_demo/
```

https://roadtolarissa.com/2025_04_color_demo/

# TODO

- `APP_DIR=../2025_04_fast_demo npm run dev` throws `Error: The following dependencies are imported but could not be resolved: d3` — iiuc, we're screwing too much with node's module resolution.
- We're locked into d3v7.9.0 across all the demo pages; upgrading in the future could break old pages (but previously baked out pages will be fine).
