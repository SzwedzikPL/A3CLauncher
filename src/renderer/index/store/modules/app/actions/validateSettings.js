import log from '@/utils/log';
import stringtable from '@/stringtable';

const validationCache = {};

const shouldValidate = (varName, currentValue) => {
  const cache = validationCache[varName];

  if (!cache) return true;
  if (cache.value !== currentValue) return true;
  if (!cache.valid) return true;

  return false;
};

const validateSetting = (varName, value, validator) => {
  if (!shouldValidate(varName, value)) return;
  const valid = !!validator(value, varName);
  log.debug('Validated setting:', varName, 'valid:', valid);
  validationCache[varName] = {value, valid};
};

export default async function validateSettings({dispatch, state}) {
  log.debug('Validating settings...');
  // Validate settings
  const errors = [];
  const addError = (tab, setting, message) => errors.push({
    source: tab ? `Settings.${tab}` : 'Settings',
    setting,
    message,
  }) && false;

  // Paths
  const pathsSettings = state.settings.paths;

  // Check is arma exec in install dir
  validateSetting('paths.armaDir', pathsSettings.armaDir, (value, setting) => {
    // TODO
    return true;
  });

  // Check is mods dir writable
  validateSetting('paths.modsDir', pathsSettings.modsDir, (value, setting) => {
    // TODO
    // return addError('Paths', setting, stringtable.CANT_WRITE_DIR);

    return true;
  });

  // Check is missions dir writable
  validateSetting('paths.missionsDir', pathsSettings.missionsDir, (value, setting) => {
    // TODO
    return true;
  });

  // Check is ts3 plugins dir writable
  validateSetting('paths.teamspeakPluginsDir', pathsSettings.teamspeakPluginsDir, (value, setting) => {
    // TODO
    return true;
  });

  // Arma
  const armaSettings = state.settings.arma;

  // TODO

  // Launcher
  const launcherSettings = state.settings.launcher;

  // Check is background image file present and correct type
  validateSetting('launcher.bgImage', launcherSettings.bgImage, (value, setting) => {
    // TODO

    // return addError('Launcher', setting, stringtable.CANT_WRITE_DIR);

    return true;
  });

  // Check is background opacity in proper range
  validateSetting('launcher.bgOpacity', launcherSettings.bgOpacity, (value, setting) => {
    // TODO
    return true;
  });

  // Clear all previous errors from settings
  dispatch('session/clearErrorsFromSource', 'Settings', {root: true});

  // Add new errors if any
  log.debug('Settings validated errors:', errors.length);
  if (errors.length) dispatch('session/addErrors', errors, {root: true});
}
