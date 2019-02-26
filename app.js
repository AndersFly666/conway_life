(function() {
  const map = [
    'oooxooooox',
    'oooxooooox',
    'oooxooooox',
    'oooooooooo',
    'oooxooooxo',
    'oooxooooxo',
    'oooxooooxo',
    'xooooxoooo',
    'xooooxoooo',
    'xooooxoooo',
  ]

  const world = new World(map);

  for (let i = 0; i < 5; i++) {
    console.log(world.toString());
    world.tick();
  }
})();
