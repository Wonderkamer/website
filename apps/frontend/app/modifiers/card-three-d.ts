import type Owner from '@ember/owner';
import Modifier, { type ArgsFor, type NamedArgs, type PositionalArgs } from 'ember-modifier';
import { registerDestructor } from '@ember/destroyable';
import { action } from '@ember/object';

interface CardThreedSignature {
  Element: HTMLDivElement;
  Args: {
    Named: { scale?: number; xRotation?: number; yRotation?: number };
    Positional: [];
  };
}

export default class CardThreedModifier extends Modifier<CardThreedSignature> {
  private element?: CardThreedSignature['Element'];

  private current: DOMRect | null = null;
  private namedArgs!: NamedArgs<CardThreedSignature>;

  constructor(owner: Owner, args: ArgsFor<CardThreedSignature>) {
    super(owner, args);

    registerDestructor(this, this.cleanup);
  }

  modify(element: CardThreedSignature['Element'], positional: PositionalArgs<CardThreedSignature>, named: NamedArgs<CardThreedSignature>) {
    this.namedArgs = { ...this.namedArgs, ...named };

    if (!this.element) {
      this.element = element;

      this.setup(this);
    }
  }

  private setup(instance: CardThreedModifier) {
    this.element?.addEventListener('mouseenter', instance.onEnter);
    this.element?.addEventListener('mouseleave', instance.onLeave);
    this.element?.addEventListener('mousemove', instance.onMove);
  }

  private cleanup(instance: CardThreedModifier) {
    this.element?.removeEventListener('mouseenter', instance.onEnter);
    this.element?.removeEventListener('mouseleave', instance.onLeave);
    this.element?.removeEventListener('mousemove', instance.onMove);
  }

  @action
  onEnter(event: MouseEvent) {
    const { currentTarget } = event;

    if (!currentTarget) {
      return;
    }

    const targetElement = currentTarget as HTMLElement;

    this.current = targetElement.getBoundingClientRect();
  }

  @action
  onLeave() {
    this.current = null;
  }

  @action
  onMove(event: MouseEvent) {
    const { clientX, clientY, currentTarget } = event;

    if (!this.current || !currentTarget) {
      return;
    }

    const targetElement = currentTarget as HTMLElement;

    const x = clientX - this.current.left;
    const y = clientY - this.current.top;
    const xPercentage = x / this.current.width;
    const yPercentage = y / this.current.height;

    targetElement.style.setProperty('--x-rotation', `${String((0.5 - yPercentage) * (this.namedArgs['xRotation'] ?? 12))}deg`);
    targetElement.style.setProperty('--y-rotation', `${String((xPercentage - 0.5) * (this.namedArgs['yRotation'] ?? 7))}deg`);
    targetElement.style.setProperty('--scale', `${String(this.namedArgs['scale'] ?? 1.1)}`);
  }
}
