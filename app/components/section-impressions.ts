import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

interface Signature {
  Args: Record<string, never>;
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

  constructor(owner: unknown, args: Signature['Args']) {
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
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    SectionImpressions: typeof SectionImpressionsComponent;
  }
}
