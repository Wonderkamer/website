import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { action } from '@ember/object';

import style from 'ember-style-modifier';
import { eq } from 'ember-truth-helpers';

import type Owner from '@ember/owner';

interface Signature {
  Element: HTMLDivElement;
}

export default class SectionImpressionsComponent extends Component<Signature> {
  imageList = [
    {
      src: '/assets/images/impressions/cc71f6cb-7560-479b-bb59-03d00e18b780.jpg',
    },
    {
      src: '/assets/images/impressions/2fd8d139-fb60-47c9-9097-8618b6c91cba.jpg',
    },
    // { src: '/assets/images/impressions/292ae6ba-2e35-4153-b423-917f2032f76f.jpg' },
    // { src: '/assets/images/impressions/77352f2d-28eb-4ed5-a3b6-0b2c13d2ad0e.jpg' },
    {
      src: '/assets/images/impressions/a2ede6e0-7063-484d-9189-3dda86fce813.jpg',
    },

    { src: '/assets/images/impressions/IMG_9213.jpeg' },
    { src: '/assets/images/impressions/IMG_9211.jpeg' },
    { src: '/assets/images/impressions/IMG_9209.jpeg' },
    { src: '/assets/images/impressions/IMG_9208.jpeg' },
    // { src: '/assets/images/impressions/IMG_9207.jpeg' },
    // { src: '/assets/images/impressions/IMG_9206.jpeg' },
    { src: '/assets/images/impressions/IMG_9205.jpeg' },
  ];

  @tracked currentImage = 0;

  constructor(owner: Owner, args: SectionImpressionsComponent['args']) {
    super(owner, args);

    setInterval(() => {
      this.currentImage++;
    }, 4500);
  }

  public get images() {
    return (this.imageList || []).map((obj) => {
      return Object.assign({}, obj, {
        style: { backgroundImage: `url(${obj.src})` },
      });
    });
  }

  public get currentIndex() {
    return this.currentImage % this.images.length;
  }

  @action
  setImage(index: number) {
    this.currentImage = index;
  }

  <template>
    <div class="relative flex grow overflow-hidden" ...attributes>
      {{#each this.images as |image index|}}
        <div class="image-container {{if (eq index this.currentIndex) 'show'}}" {{style image.style}}></div>
      {{/each}}

      {{! Heading overlay — gradient full width, text aligned to the section container }}
      <div class="pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-black/50 to-transparent py-6 lg:py-12">
        <div class="container mx-auto px-4 lg:px-16">
          <p class="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-white">
            <span class="inline-block h-px w-8 bg-white"></span>
            Impressies
          </p>
          <h2 class="mt-3 text-3xl font-bold text-white md:text-4xl">Een kijkje binnen</h2>
        </div>
      </div>

      {{! Dot indicators }}
      <div class="absolute inset-x-0 bottom-6 flex justify-center gap-2">
        {{#each this.images as |image index|}}
          <button
            type="button"
            aria-label="Toon deze afbeelding"
            class="h-2.5 rounded-full transition-all {{if (eq index this.currentIndex) 'w-8 bg-white' 'w-2.5 bg-white/60 hover:bg-white/90'}}"
            {{on "click" (fn this.setImage index)}}
          ></button>
        {{/each}}
      </div>
    </div>
  </template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    SectionImpressions: typeof SectionImpressionsComponent;
    'section-impressions': typeof SectionImpressionsComponent;
  }
}
