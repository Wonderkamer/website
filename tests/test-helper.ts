import { setApplication } from '@ember/test-helpers';
import Application from '@wonderkamer/website/app';
import config from '@wonderkamer/website/config/environment';
import { start } from 'ember-qunit';
import * as QUnit from 'qunit';
import { setup } from 'qunit-dom';

setApplication(Application.create(config.APP));

setup(QUnit.assert);

start();
