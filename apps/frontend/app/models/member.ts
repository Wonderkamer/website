import Model, { attr } from '@ember-data/model';

export default class MemberModel extends Model {
  @attr('string') title!: string;

  @attr('string') slug!: string;

  @attr('string') tagLine!: string;

  @attr('boolean', { defaultValue: true }) isActive!: boolean;

  get profileImgLargeSrc() {
    return '/' + ['members', this.slug, ['profile-large', 'jpg'].join('.')].join('/');
  }
  get profileImgSmallSrc() {
    return '/' + ['members', this.slug, ['profile-small', 'jpg'].join('.')].join('/');
  }
  get profileTextSrc() {
    return '/' + ['members', this.slug, ['about', 'md'].join('.')].join('/');
  }
}

declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    member: MemberModel;
  }
}
