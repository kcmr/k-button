class KButton extends HTMLElement {
  get _tpl() {
    return `
      <style>
        :host([hidden]) { display: none; }
        :host { display: inline-block; }

        button {
          font: inherit;
          color: inherit;
          border: 0;
          background-color: transparent;
          cursor: pointer;
          padding: 0;
        }

        button::-moz-focus-inner {
          padding: 0;
          border: 0;
        }

        :host([disabled]) button {
          opacity: var(--k-button-disabled-opacity, 0.7);
          cursor: default;
          pointer-events: none;
        }

        button:focus > span {
          box-shadow: var(--k-buton-focus-box-shadow, 0 0 0 2px rgb(35, 189, 234));
        }

        button:hover > span {
          background-color: var(--k-button-hover-background-color);
        }

        button:active > span {
          background-color: var(--k-button-active-background-color);
        }

        button > span {
          position: relative;
          display: block;
          padding: var(--k-button-padding);
          background-color: var(--k-button-background-color);
          border-radius: var(--k-button-border-radius);
          min-width: var(--k-button-min-width);
          @apply --k-button;
        }

        button:not(:-moz-focusring):focus > span {
          box-shadow: none;
        }

        button:focus,
        button > span:focus {
          outline: none;
        }
      </style>

      <button tabindex="0" autocomplete="off">
        <span tabindex="-1">
          <slot></slot>
        </span>
      </button>
    `;
  }

  static get observedAttributes() {
    return ['autofocus', 'disabled'];
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(val) {
    if (val) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  get autofocus() {
    return this.hasAttribute('autofocus');
  }

  get type() {
    return this.getAttribute('type');
  }

  get form() {
    return this.getAttribute('form');
  }

  constructor() {
    super();
    let shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = this._tpl;
    this.button = this.shadowRoot.querySelector('button');
    this.addEventListener('click', () => this.type && this._callFormMethod());
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    if (newVal === null) {
      this.button.removeAttribute(attr);
    } else {
      this.button.setAttribute(attr, this.getAttribute(attr));
    }
  }

  _callFormMethod() {
    let target = this.form ? this.closest(this.form) : this.parentNode;

    if (this.type in target) {
      target[this.type]();
    }
  }
}

window.customElements.define('k-button', KButton);