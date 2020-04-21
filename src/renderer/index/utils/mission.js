import log from '@/utils/log';

const readline = require('readline');
const fs = require('fs');

// Super simple function for getting mission name from mission.sqm
async function getMissionName(missionFilePath) {
  const reader = readline.createInterface({
      input: fs.createReadStream(missionFilePath),
      crlfDelay: Infinity
  });

  let inMission = false, inIntel = false;

  for await (const line of reader) {
    const cleanLine = line.trim();

    if (cleanLine === 'class Mission') {
      configLevel++;
      inMission = true;
      continue;
    }

    if (cleanLine === 'class Intel' && inMission) {
      configLevel++;
      inIntel = true;
      continue;
    }

    if (inIntel && cleanLine.startsWith('briefingName=')) {

      let name = cleanLine.replace('briefingName=', '');
      name = name.substring(1, name.length - 2);
      reader.close();
      return name;
    }

    if (cleanLine === '};' && (inIntel || inMission)) {
      if (inIntel) {
        inIntel = false;
        continue;
      }

      if (inMission) {
        inMission = false;
        continue;
      }
    }
  }

  reader.close();
  return null;
}
