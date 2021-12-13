function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

let index = 1;

export default shuffle([
  {
    id: index++,
    title: 'Bas',
    slug: 'bas-kamer',
    active: true,
    'tag-line': 'Developer slash Designer',
  },
  {
    id: index++,
    title: 'Tom',
    slug: 'tom-akkermans',
    active: true,
    'tag-line': 'Fintech Developer',
  },
  {
    id: index++,
    title: 'Eric',
    slug: 'eric-haas',
    active: false,
    'tag-line': 'Sociaal ondernemer / business development',
  },
  {
    id: index++,
    title: 'Masja',
    slug: 'masja-ros',
    active: false,
    'tag-line': 'Social media entrepreneur',
  },
  {
    id: index++,
    title: 'Moniek',
    slug: 'moniek-wester',
    active: true,
    'tag-line': 'Video vrouw',
  },
  {
    id: index++,
    title: 'Michaël',
    slug: 'michael-dommershuizen',
    active: false,
    'tag-line': 'Product Designer',
  },
  {
    id: index++,
    title: 'Joanne',
    slug: 'joanne-wienen',
    active: false,
    'tag-line': 'Freelance journalist',
  },
  {
    id: index++,
    title: 'Nienke',
    slug: 'nienke-schachtschabel',
    active: true,
    'tag-line': 'Design Researcher',
  },
  {
    id: index++,
    title: 'Femke',
    slug: 'femke-deckers',
    active: false,
    'tag-line': '...',
  },
  {
    id: index++,
    title: 'Maaike',
    slug: 'maaike-wijdema',
    active: false,
    'tag-line': 'Docent NT2',
  },
  {
    id: index++,
    title: 'Kaoutar',
    slug: 'kaoutar-beni-driss',
    active: false,
    'tag-line': 'Verbinder',
  },
  {
    id: index++,
    title: 'Christine',
    slug: 'christine-van-rossum',
    active: false,
    'tag-line': '',
  },
  {
    id: index++,
    title: 'Liesbeth',
    slug: 'liesbeth-scholten',
    active: true,
    'tag-line': 'Co-creator, facilitator en onderzoeker',
  },
  {
    id: index++,
    title: 'Piero',
    slug: 'piero-zagami',
    active: true,
    'tag-line': 'Information designer',
  },
  {
    id: index++,
    title: 'Bas',
    slug: 'bas-mijling',
    active: true,
    'tag-line': 'Onderzoeker luchtkwaliteit',
  },
  {
    id: index++,
    title: 'Maria',
    slug: 'maria',
    active: false,
    'tag-line': '...',
  },
  {
    id: index++,
    title: 'Trudy',
    slug: 'trudy-westby',
    active: false,
    'tag-line': '...',
  },
  {
    id: index++,
    title: 'Jan',
    slug: 'jan-bruin',
    active: true,
    'tag-line': 'Freelance Strateeg, Programmamaker en Schrijver',
  },
  {
    id: index++,
    title: 'An',
    slug: 'an-tonen',
    active: true,
    'tag-line': '...',
  },
  {
    id: index++,
    title: 'Selm',
    slug: 'selm-wenselaar',
    active: true,
    'tag-line': 'Dramaturg, Schrijver, Curator',
  },
  {
    /** prefers not to have a bio and picture present, is ok with anonynmous presence */
    id: index++,
    title: 'Manuel',
    slug: 'manuel-schipper',
    active: true,
    'tag-line': '...',
  },
  {
    id: index++,
    title: 'Michaël',
    slug: 'michael-kiliaan',
    active: true,
    'tag-line': 'Frontend developer',
  },
]);
