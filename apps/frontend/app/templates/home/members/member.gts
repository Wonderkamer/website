import { pageTitle } from 'ember-page-title';
import RouteTemplate from 'ember-route-template';

import type MemberModel from '../../../models/member';

interface MemberRouteSignature {
  Args: {
    model?: MemberModel;
  };
}

export default RouteTemplate<MemberRouteSignature>(
  <template>
    {{#if @model}}
      {{pageTitle @model.title}}
    {{/if}}
    {{outlet}}
  </template>,
);
