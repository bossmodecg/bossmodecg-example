import BossmodeCGM from '@bossmodecg/management-react';

import ClienteleMonitor from '@bossmodecg/widget-clientele';
import OBSStudio from '@bossmodecg/widget-obsstudio';
import SimpleStore from '@bossmodecg/widget-simplestore';

BossmodeCGM.launchApplication(
  document.getElementById("root"),

  async () => (await BossmodeCGM.fetchRemoteJSON('/config.json')).bossmodecg,
  async () => (await BossmodeCGM.fetchRemoteJSON('/config.json')).management,
  [
    {
      title: "Debug",
      widgets: [
        { type: SimpleStore.DebugPanel },
        { type: BossmodeCGM.Widgets.SocketInformation },
        { type: ClienteleMonitor, props: {} }
      ]
    },
    {
      title: "General",
      widgets: [
      ]
    },
    {
      title: "OBS",
      widgets: [
        { type: OBSStudio.ScenePanel },
        { type: OBSStudio.InfoPanel }
      ]
    }
  ]
);
