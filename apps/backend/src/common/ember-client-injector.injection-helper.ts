import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AbstractInjectionHelper } from 'nestjs-ember-static';
import { HTMLElement } from 'node-html-parser';

import { EnvConfig } from '../config/environment.config';
import { FeaturesConfig } from '../config/features.config';
import { ServerConfig } from '../config/server.config';

type EmberAppConfig = {
  [key: string]: any;
  environment: string;
  APP: {
    version: string;
    apiHost: string;
  };
};

@Injectable()
export class EmberClientConfigInjector extends AbstractInjectionHelper {
  constructor(
    private readonly metaTagSelector: string,
    private readonly configService: ConfigService,
  ) {
    super();
  }

  process(htmlElement: HTMLElement): void {
    const metaTag = htmlElement.querySelector(`meta[name="${this.metaTagSelector}"]`);

    const content = metaTag?.getAttribute('content');

    if (!metaTag || !content) {
      return;
    }

    let clientConfig = JSON.parse(decodeURIComponent(content)) as Partial<EmberAppConfig>;

    const configMap: any = this.configMap;

    for (const key in configMap) {
      clientConfig = replaceValues(clientConfig, configMap, key);
    }

    clientConfig['environment'] = this.configService.get<EnvConfig>('env.name', { infer: true });

    clientConfig['featureFlags'] ??= {};
    clientConfig['featureFlags'] = { ...clientConfig['featureFlags'], ...this.configService.get<FeaturesConfig>('features', { infer: true }) };

    metaTag.setAttribute('content', encodeURIComponent(JSON.stringify(clientConfig)));
  }

  private get configMap(): Partial<EmberAppConfig> {
    return {
      'env.version': this.configService.get<EnvConfig>('env.stackVersion', { infer: true }),
      'app.apiHost': this.configService.get<ServerConfig>('server.publicUrl', { infer: true }).replace(/\/$/, ''),
    };
  }
}

type ReplacementMap = { [key: string]: any };
type AnyObj = { [key: string]: any };

function replaceValues(obj: AnyObj, replacements: ReplacementMap, lookupKey: string): AnyObj {
  const replaceValue = (value: any, replaceValue: any): any => {
    if (typeof value !== 'string') {
      return value;
    }

    if (value === `[${lookupKey}]`) {
      return replaceValue;
    }

    const escapedKey = lookupKey.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');

    const regex = new RegExp('(\\[' + escapedKey + '\\])', 'm');
    let match;

    do {
      match = regex.exec(value);
      value = value.replace(new RegExp(`\\[${lookupKey}\\]`, 'm'), replaceValue);
    } while (match);

    return value;
  };

  const recurse = (item: any): any => {
    if (Array.isArray(item)) {
      return item.map(recurse);
    } else if (item !== null && typeof item === 'object') {
      return Object.keys(item).reduce((acc, key) => {
        acc[key] = recurse(item[key]);

        return acc;
      }, {} as AnyObj);
    } else {
      return replaceValue(item, replacements[lookupKey]);
    }
  };

  return recurse(obj) as AnyObj;
}
