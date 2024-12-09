import type { TOC } from '@ember/component/template-only';
interface Signature {
  Element: HTMLDivElement;
  Args: {
    name: string;
    title: string;
    since: string;
  };
  Blocks: {
    default: [];
  };
}

const CardComponent: TOC<Signature> = <template>
  <div class="flex flex-col [perspective:800px] hover:z-50" ...attributes>
    <div
      class="group relative grid w-[260px] grid-rows-[200px_120px_40px] rounded-md bg-[#ecf4ff] p-4 text-primary transition-transform ease-out hover:[transform:rotateX(var(--x-rotation))_rotateY(var(--y-rotation))_scale(var(--scale))]"
    >
      <figure class="flex justify-center items-center rounded-md overflow-hidden">
        <img src="yeah.jpg" alt="yeah" class="object-cover h-full w-full" />
      </figure>
      <div class="pt-4">
        <p class="text-2xl font-bold">{{@name}}</p>
        <p class="text-sm">{{@title}}</p>
      </div>
      <footer class="flex items-end">
        <p class="flex rounded-sm border border-current px-1 py-px text-[9px] uppercase">
          &nbsp;
          <span
            class="-my-px mx-1 inline-block w-4 border-l border-r border-current bg-[repeating-linear-gradient(-37deg,currentColor,currentColor,transparent_1px,transparent_3px)]"
          />
          {{@since}}
        </p>
        <div class="ml-auto w-12 text-primary">
          &nbsp;
        </div>
      </footer>
      <div class="pointer-events-none absolute inset-0 group-hover:bg-[radial-gradient(at_var(--x)_var(--y),rgba(255,255,255,0.3)_20%,transparent_80%)]" />
    </div>
  </div>
</template>;

export default CardComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    CardThreeD: typeof CardComponent;
    'card-three-d': typeof CardComponent;
  }
}
