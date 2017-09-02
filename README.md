# &lt;k-button&gt; ( <abbr title="Work In Progress">WIP</abbr> )

> Mostly accessible Custom Element button with pseudo [:focus-ring](https://github.com/WICG/focus-ring#rationale), form capabilities and no dependencies. Only 3Kb. 

## Keyboard-Only Focus

`<k-button>` implements the technique used in this article ([Keyboard-Only Focus](http://kizu.ru/en/blog/keyboard-only-focus/)) in a internal standard button element to show the focus styles only when the button is focused using the keyboard.

## Shadow DOM considerations
### Accessibility
`<k-button>` is **keyboard accessible and announced as a button** to assistive technologies with no extra requirements (eg.: `role="button"` or `tabindex="0"`) because it simply wraps a button element. However, due to Shadow DOM encapsulation, you cannot associate the internal button with another element in the page using aria attributes. The same happens if you use a Shadow DOM encapsulated button element in a form to use it as a `submit` or `reset` button.

### Form capabilities
The last issue has been addressed in this Custom Element by providing a `type` attribute that triggers the corresponding method (`submit` or `reset`) in the closest parent form element.

```html
<form action="">
  ...
  <k-button type="submit">Submit</k-button>  
  <k-button type="reset">Reset</k-button>
</form>
```

If the form target is not the closest parent, you can use the `form` attribute with the target form CSS selector.

```html
<form action="" class="some-form">
  ...
  <div class="actions">
    <k-button type="submit" form=".some-form">Submit</k-button>  
    <k-button type="reset" form=".some-form">Reset</k-button>
  </div>
</form>
```

You need to add the attribute `no-sumit` to the button to prevent form submission. Otherwise, the event can't be _default prevented_.

```html
<form action="" onsubmit="someFunction();">
  ...
  <k-button type="submit" no-submit>Submit</k-button>  
  <k-button type="reset">Reset</k-button>
</form>
```

## Usage

**Warning: may change**

1. Import the minified version script:
   ```html
   <script src="<some-path>/k-button/k-button.min.js"></script>
   ```
2. Use it:
   ```html
   <k-button>I'm a button</k-button>
   ```

There is also an HTML import:

```html
<link rel="import" href="<some-path>/k-button/k-button.html">
```