const modsApi = {};
const modList = [
  {
    id: 'testmod',
    name: 'TestMod'
  }
];
const mods = {
  testmod: {
    name: 'TestMod'
  }
};

// Mod list
// On success returns:
// mods
modsApi.modList = (req, res) => {
  res.json({
    error: false,
    mods: modList
  });
};

// Mod details
// On success returns:
// mod
modsApi.mod = (req, res) => {
  const modId = req.params.modId;
  if (!modId) return res.json({
    error: true
  });

  const mod = mods[modId];
  if (!mod) return res.json({
    error: true
  });

  res.json({
    error: false,
    mod: mod
  });
};

module.exports = modsApi;
