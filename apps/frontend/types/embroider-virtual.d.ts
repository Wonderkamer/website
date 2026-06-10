declare module '@embroider/virtual/compat-modules' {
  const compatModules: Record<string, Record<string, unknown>>;
  export default compatModules;
}

declare module '@embroider/virtual/*' {
  const virtualModule: unknown;
  export default virtualModule;
}
