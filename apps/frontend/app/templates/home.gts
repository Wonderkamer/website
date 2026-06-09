import { on } from '@ember/modifier';

import Section from '../components/section';
import SectionAbout from '../components/section-about';
import SectionContact from '../components/section-contact';
import SectionImpressions from '../components/section-impressions';
import SectionMap from '../components/section-map';
import SectionMembers from '../components/section-members';
import SectionPricing from '../components/section-pricing';
import SectionRules from '../components/section-rules';
import SectionTitle from '../components/section-title';
import appVersion from '@wonderkamer/frontend/helpers/app-version';
import sectionInserted from '../modifiers/section-inserted';
import onKey from 'ember-keyboard/helpers/on-key';
import RouteTemplate from 'ember-route-template';

interface HomeRouteController {
  previousSection: (event: KeyboardEvent) => void;
  nextSection: (event: KeyboardEvent) => void;
  sectionInserted: (element: HTMLElement) => void;
  activeMembers: unknown[];
  selectedMember: unknown;
  onClick: () => void;
  showExtendedVersionTask: { isIdle: boolean };
}

interface HomeRouteSignature {
  Args: {
    controller: HomeRouteController;
  };
}

export default RouteTemplate<HomeRouteSignature>(
  <template>
    {{onKey "ArrowUp" @controller.previousSection}}
    {{onKey "ArrowDown" @controller.nextSection}}

    <div {{sectionInserted @controller.sectionInserted}}>
      <Section class="bg-primary" @routeId="home">
        <SectionTitle />
      </Section>

      <Section class="bg-secondary py-5" @routeId="about">
        <SectionAbout />
      </Section>

      <Section class="bg-secondary py-5" @routeId="pricing">
        <SectionPricing />
      </Section>

      <Section @routeId="impressions">
        <SectionImpressions class="bg-secondary" />
      </Section>

      <Section class="bg-secondary py-5" @routeId="members">
        <SectionMembers @activeMembers={{@controller.activeMembers}} @selectedMember={{@controller.selectedMember}} />
      </Section>

      <Section class="bg-secondary" @routeId="map">
        <SectionMap />
      </Section>

      <Section class="bg-secondary py-5" @routeId="rules">
        <SectionRules />
      </Section>

      <Section class="bg-secondary py-5" @routeId="contact">
        <SectionContact />
      </Section>

    </div>

    <footer class="bg-white">
      <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
          <span class="text-sm text-gray-500 sm:text-center">© 2020
            <a href="https://wonderkamer.com/" class="hover:underline">Wonderkamer</a>. All Rights Reserved.
          </span>
          <div class="flex mt-4 sm:justify-center sm:mt-0">
            <a href="https://g.co/kgs/EhcbQJJ" title="Google" target="_blank" rel="noopener noreferrer" class="text-gray-500 hover:text-gray-900">
              <svg
                class="w-4 h-4"
                fill="currentColor"
                aria-hidden="true"
                width="800px"
                height="800px"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              ><path
                  d="M473.16,221.48l-2.26-9.59H262.46v88.22H387c-12.93,61.4-72.93,93.72-121.94,93.72-35.66,0-73.25-15-98.13-39.11a140.08,140.08,0,0,1-41.8-98.88c0-37.16,16.7-74.33,41-98.78s61-38.13,97.49-38.13c41.79,0,71.74,22.19,82.94,32.31l62.69-62.36C390.86,72.72,340.34,32,261.6,32h0c-60.75,0-119,23.27-161.58,65.71C58,139.5,36.25,199.93,36.25,256S56.83,369.48,97.55,411.6C141.06,456.52,202.68,480,266.13,480c57.73,0,112.45-22.62,151.45-63.66,38.34-40.4,58.17-96.3,58.17-154.9C475.75,236.77,473.27,222.12,473.16,221.48Z"
                /></svg>
              <span class="sr-only">Google page</span>
            </a>
            <a
              href="https://www.instagram.com/wonderkamer.amsterdam/"
              title="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-500 hover:text-gray-900 ms-5"
            >

              <svg class="w-4 h-4" aria-hidden="true" width="800px" height="800px" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                  fill="currentColor"
                />
                <path d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z" fill="currentColor" />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z"
                  fill="currentColor"
                />
              </svg>
              <span class="sr-only">Instagram</span>
            </a>
            <button type="button" class="text-sm text-gray-500 hover:text-gray-900 ms-5" {{on "click" @controller.onClick}}>
              v{{appVersion versionOnly=@controller.showExtendedVersionTask.isIdle}}
            </button>
          </div>
        </div>
      </div>
    </footer>

    {{outlet}}
  </template>,
);
