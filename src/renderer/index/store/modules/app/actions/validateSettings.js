import log from '@/utils/log';
import stringtable from '@/stringtable';

const validationCache = {};

const validationError = (source, field, message) => ({
  source: source ? `Settings.${source}` : 'Settings',
  params: {field},
  message,
});

const shouldValidate = (varName, currentValue) => {
  const cache = validationCache[varName];

  if (!cache) return true;
  if (cache.value !== currentValue) return true;
  if (!cache.valid) return true;

  return false;
};

const validateSetting = (varName, value, validator) => {
  if (!shouldValidate(varName, value)) return;
  const valid = validator(value);
  log.debug('Validated setting:', varName, 'valid:', valid);
  validationCache[varName] = {value, valid};
};

export default async function validateSettings({dispatch, state}) {
  log.debug('Validating settings...');
  // Validate settings
  const errors = [];
  const addError = (tab, field, message) => errors.push({
    source: tab ? `Settings.${tab}` : 'Settings',
    params: {field},
    message,
  });

  // Paths
  const pathsSettings = state.settings.paths;

  // Check is arma exec in install dir
  validateSetting('paths.armaDir', pathsSettings.armaDir, value => {
    // TODO
    return true;
  });

  // Check is mods dir writable
  validateSetting('paths.modsDir', pathsSettings.modsDir, value => {
    // TODO
    // addError('Paths', 'modsDir', stringtable.CANT_WRITE_DIR);
    return true;
  });

  // Check is missions dir writable
  validateSetting('paths.missionsDir', pathsSettings.missionsDir, value => {
    // TODO
    return true;
  });

  // Check is ts3 plugins dir writable
  validateSetting('paths.teamspeakPluginsDir', pathsSettings.teamspeakPluginsDir, value => {
    // TODO
    return true;
  });

  // Arma
  const armaSettings = state.settings.arma;

  // TODO

  // Clear all previous errors from settings
  dispatch('session/clearErrorsFromSource', 'Settings', {root: true});

  // Add new errors if any
  log.debug('Settings validated errors:', errors.length);
  if (errors.length) dispatch('session/addErrors', errors, {root: true});
}
