import React from 'react';

import BossmodeCG from '@bossmodecg/client';

import URL from 'url-parse';
import axios from 'axios';

import Backdrop from './Backdrop';

export default class Loader extends React.Component {
  constructor(props) {
    super(props);

    this.state = { config: null, bossmodecgClient: null };
  }

  componentWillMount() {
    (async () => {
      const currentURL = new URL(window.location.href);

      const config = (await axios.get("/config.json")).data;
      config.bossmodecg.endpoint = config.bossmodecg.endpoint.replace("${THIS_HOSTNAME}", currentURL.hostname);

      const bossmodecgClient = new BossmodeCG.FrontendClient(config.bossmodecg);

      bossmodecgClient.connect();

      this.setState({ config: config, bossmodecgClient: bossmodecgClient });

      bossmodecgClient.on('bossmodecg.forceUpdate', () => this.forceUpdate());
    })();
  }

  render() {
    const client = this.state.bossmodecgClient;
    var backdrop = null;

    if (client && client.isConnected) {
      backdrop = <Backdrop bossmodecgClient={client} />
    }

    return (
      <div className="Loader">
        { backdrop }
      </div>
    );
  }
}
