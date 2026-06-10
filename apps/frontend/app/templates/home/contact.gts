import { pageTitle } from 'ember-page-title';
import RouteTemplate from 'ember-route-template';
import Portal from 'ember-stargate/components/portal';

export default RouteTemplate(
  <template>
    {{pageTitle "Contact"}}
    <Portal @target="section-contact" />
  </template>,
);
