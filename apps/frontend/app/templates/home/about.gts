import { pageTitle } from 'ember-page-title';
import RouteTemplate from 'ember-route-template';

export default RouteTemplate(
  <template>
    {{pageTitle "Over"}}
    {{outlet}}
  </template>,
);
