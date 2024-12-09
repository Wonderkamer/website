import Route from 'ember-route-template';
import { pageTitle } from 'ember-page-title';
import CardThreeD from '../components/card-three-d';
import CardThreeDModifier from '../modifiers/card-three-d';
import { faker } from '@faker-js/faker';

const mod = (a: number, b: number) => a % b;

export default Route(
  <template>
    {{pageTitle "TestingViteAndTypescript"}}

    <h2 class="m-5">Welcome to Ember</h2>

    {{outlet}}

    <div class="grid grid-cols-1 justify-items-center gap-4 p-12 border">
      <CardThreeD @name={{(faker.person.fullName)}} @title={{(faker.person.jobTitle)}} @since={{(faker.date.timeZone)}} {{CardThreeDModifier}} />
    </div>

    <div class="{{if (mod 2 2) 'text-end' 'text-start'}}">
      fddff
    </div>
  </template>
);
