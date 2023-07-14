import Component from '@glimmer/component';
import ENV from '@wonderkamer/website/config/environment';
import fetch from 'fetch';
import { action } from '@ember/object';
import { isNone } from '@ember/utils';
import { NotFoundError } from '@ember-data/adapter/error';
import { task } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';

const {
  APP: { version },
} = ENV;

export default class UtilMarkdownFromUrlComponent extends Component {
  @tracked markdown;

  @action
  initiateLoad(_element, [url]) {
    this.markdown = null;

    if (this.currentUrl === url) {
      return;
    }

    this.currentUrl = url;

    this.setupTask.perform(url).then((markdownOrError) => {
      if (typeof markdownOrError === 'string') {
        if (!isNone(this.replaceHash)) {
          for (let key in this.replaceHash) {
            markdownOrError = markdownOrError.replace(
              new RegExp(`\\[${key}\\]`, 'g'),
              this.replaceHash[key]
            );
          }
        }

        this.markdown = markdownOrError;
      }
    });
  }

  get cssProperties() {
    if (this.setupTask.isRunning) {
      return Object.assign(
        {},
        this.args.cssWhileIdle || {},
        this.args.cssWhileLoading || {}
      );
    }
    return this.args.cssWhileIdle || {};
  }

  setupTask = task(this, { enqueue: true }, async (url) => {
    let result;
    try {
      result = await this.fetchMarkdownTask.perform(url);
    } catch (error) {
      switch (true) {
        case error instanceof NotFoundError:
          result = 404;
          break;
        default:
          result = 0;
      }
    }

    return result;
  });

  fetchMarkdownTask = task(this, async (url) => {
    url = `${url}?_=${version}`;

    return await fetch(url).then((response) => {
      if (response.ok) {
        return response.text();
      } else if (response.status === 404) {
        throw new NotFoundError();
      } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    });
  });
}
