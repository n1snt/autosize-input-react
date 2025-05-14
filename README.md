# autosize-input-react

An auto-resizing input component for [React](https://reactjs.org), built on top of the original [react-input-autosize](https://github.com/JedWatson/react-input-autosize) package.

This version is rebuilt with modern tooling (TypeScript + Vite) and aims to be drop-in compatible for most use cases, while staying lightweight and dependency-free.

> 🔗 **Original project**: [jedwatson/react-input-autosize](https://github.com/JedWatson/react-input-autosize)

---

## Demo & Examples

To run the examples locally:

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Installation

Install from NPM:

```bash
npm install autosize-input-react
```

---

## Usage

```tsx
import AutoSizeInput from "autosize-input-react";

<AutoSizeInput
  name="form-field-name"
  value={inputValue}
  onChange={(event) => {
    // event.target.value contains the new value
  }}
/>
```

---

## Gotchas / Notes

### Custom Styles & Font Size

If your input uses a custom font size or other inline styles, pass them to `inputStyle`:

```tsx
<AutoSizeInput
  value={value}
  inputStyle={{ fontSize: 36 }}
/>
```

### Dynamic Styling

Styles are copied only on mount. If styles change later (e.g. from a theme switch), remount the component (change the `key` prop), or manually trigger recalculation (in future, support for `copyInputStyles()` may be added).

### IE / Edge "clear" indicator (Legacy)

If you need to support older versions of IE or Edge, pass `injectStyles={false}` and add the following CSS rule yourself:

```css
input::-ms-clear {
  display: none;
}
```

### Controlled Input

This is a controlled component. It expects a `value` prop and will not work as an uncontrolled input.

---

## Why this fork?

This version of the component is:
- Built with **TypeScript**
- Bundled using **Vite** for ESM, CJS, and UMD support
- Smaller and more tree-shakable
- Actively maintained for modern React projects

We appreciate the original work by [Jed Watson](https://github.com/JedWatson) and this version builds upon that foundation.

---

## License

MIT License © [Nishant Bhandari](https://github.com/n1snt)
Based on original work © [Jed Watson](https://github.com/JedWatson)
