import BaseControl from 'ember-bootstrap/components/bs-form/element/control';
import defaultValue from 'ember-bootstrap/utils/default-decorator';
import formValidationClass from 'ember-bootstrap/utils/cp/form-validation-class';
import sizeClass from 'ember-bootstrap/utils/cp/size-class';
import { action, computed } from '@ember/object';
import { tagName } from '@ember-decorators/component';

@tagName('')
export default class TextDate extends BaseControl {
  classTypePrefix = 'form-control';

  @defaultValue
  size = null;

  @formValidationClass('validationType')
  formValidationClass;

  @sizeClass('form-control', 'size')
  sizeClass;

  @computed('classTypePrefix', 'formValidationClass', 'inlineClass', 'sizeClass')
  get classNamesProxy() {
    return [this.classTypePrefix, this.sizeClass, this.formValidationClass].join(' ');
  }

  @action
  onKeyPress(event) {
    if (event.keyCode === 13) {
      if (!event.ctrlKey) {
        event.preventDefault();
        document.execCommand('insertText', false, '\n');
      } else {
        event.target.form.dispatchEvent(new Event('submit', { cancelable: true }));
      }
    }
  }

  @action
  onInput(event) {
    const element = event.target;

    this.onChange(element.value);
  }
}
