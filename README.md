# react-resizing-pane

A lightweight, fully customizable, resizable **`component`** for React

# Installation

```sh
$ npm i react-resizing-pane
# or
$ yarn add react-resizing-pane
```

# Screenshot

`ResizingPane` is just a `div/component` with some customizations, that allow it to listen for specific events and resize itself accordingly. Anything that can de done using a normal `div/component`, can also be done using `ResizingPane`.

![Screenshot](https://raw.githubusercontent.com/singh-pk/react-resizing-pane/main/assets/react-resizing-pane.gif)

# Usage

### Example:

```js
import ResizingPane from 'react-resizing-pane';

const App = () => {
  return (
    <ResizingPane storageId={0} sides={['bottom', 'right']}>
      <div>Hello World!</div> {/* anything can be wrapped as a child */}
    </ResizingPane>
  );
};
```

### Example with all props:

```js
import ResizingPane from 'react-resizing-pane';

const App = () => {
  let storageConfig = { name: 'example', type: sessionStorage };

  return (
    <ResizingPane
      sides={['top', 'left', 'bottom', 'right']}
      storageId={0}
      storageConfig={storageConfig}
      height={300}
      width={450}
      style={{
        border: '5px solid blue',
        maxHeight: 400,
        maxWidth: 500,
        minHeight: 200,
        minWidth: 250,
      }}
    />
  );
};
```

# Props

#### `sides: (type: [options], default: undefined);`

Can take four `options`:

- `'top'`
- `'bottom'`
- `'left'`
- `'right'`

Specifies the sides of `ResizingPane` that you want to be resizable.

#### `storageId: (type: number | string, default: undefined);`

Must be _`unique`_ for every `ResizingPane`.

Use this if you want to `persist` height and width of `ResizingPane` div in your application.

#### `storageConfig: (type: object, default: { name: 'dimensions', type: sessionStorage });`

**`name:`** specifies the name by which it is persisted in the storage

**`type:`** specifies the type of storage to use - `localStorage` or `sessionStorage` (default)

**Important:** `ResizingPane` must contain **`storageId`** prop for `storageConfig` to work.

Use this if you want to overwrite the default settings.

#### `height: (type: number, default: 250);`

Must be a _`number`_ only. Passing `css units` is not supported.

Use this if you want to set a default height.

#### `width: (type: number, default: 350);`

Must be a _`number`_ only. Passing `css units` is not supported.

Use this if you want to set a default width.

# Default Styles

#### `border: '1px solid black'`

#### `maxHeight: '100%'`

#### `maxWidth: '100%'`

#### **Note: To overwrite default styles, just pass the styles in `ResizingPane`.**

# Things to Avoid

- Don't pass `height` and `width` as styles in `ResizingPane`. If you want to set a default height and width, `pass it as props`.
- While passing `height` and `width` props, don't use any `css unit`. Calculations are done on simple numbers, which are then represented as pixel values.
- Don't use `storageConfig` prop without `storageId` prop. `storageId` prop gives an unique id to each `ResizingPane` and the dimensions are saved with respect to this given id.
- **Don't change the default `position` style. This will break the component.**
