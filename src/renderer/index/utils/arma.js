import arch from 'arch';

export function getArmaExecName(platform) {
  return `arma3${(platform || arch()) === 'x64' ? '_x64' : ''}.exe`;
}

export function getArmaParams(settings) {
  const params = ['-noLauncher'];

  if (settings.skipIntro) params.push('-skipIntro');
  if (settings.noSplash) params.push('-noSplash');
  if (settings.window) params.push('-window');
  if (settings.enableHT) params.push('-enableHT');
  if (settings.noLogs) params.push('-noLogs');
  if (settings.showScriptErrors) params.push('-showScriptErrors');
  if (settings.noPause) params.push('-noPause');
  if (settings.filePatching) params.push('-filePatching');

  if (settings.cpuCount && settings.cpuCount.enabled)
    params.push(`-cpuCount=${armaSettings.cpuCount.value}`);

  if (settings.exThreads && settings.exThreads.enabled)
    params.push(`-exThreads=${armaSettings.exThreads.value}`);

  if (settings.malloc && settings.malloc.enabled)
    params.push(`-malloc=${armaSettings.malloc.value}`);

  return params;
}
