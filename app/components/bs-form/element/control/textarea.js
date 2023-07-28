import BaseControl from 'ember-bootstrap/components/bs-form/element/control';
import defaultValue from 'ember-bootstrap/utils/default-decorator';
import sizeClass from 'ember-bootstrap/utils/cp/size-class';
import { action } from '@ember/object';

export default class TextDate extends BaseControl {
  classTypePrefix = 'form-control';

  @defaultValue
  size = null;

  @sizeClass('form-control', 'size')
  sizeClass;

  get classNamesProxy() {
    return ['pe-2', this.classTypePrefix, this.sizeClass, this.formValidationClass].join(' ');
  }

  get value() {
    return this.args?.value ?? null;
  }

  get maxChars() {
    return this.args?.maxChars;
  }

  // updating this value while animating will kill the progressbar. therfore duration on the animation is set to 0
  get progress() {
    return this.value ? Math.min(1, this.value.length / this.maxChars) : 0;
  }

  @action
  onKeyPress(event) {
    if (event.keyCode === 13) {
      if (!event.ctrlKey) {
        event.preventDefault();
        document.execCommand('insertText', false, '\n');
      } else {
        event.target.form.requestSubmit();
        //dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }
    }
  }

  @action
  onInput({ target }) {
    this.args.onChange(target?.value);
  }
}
