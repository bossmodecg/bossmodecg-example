import React from 'react';

export default class Backdrop extends React.Component {
  componentWillMount() {

  }

  _debugOverlay() {
    const client = this.props.bossmodecgClient;

    if (client.isPopulated) {
      const simplestore = client.module("simplestore");
      const example = client.moduleMayFail("example");
      const obs = client.module("obsstudio");

      const debugConfig = simplestore.state.debug || {};
      const obsStreamStatus = obs.state.streamStatus || {};
      const exampleCount = example && example.state.count;

      if (debugConfig.showOverlay) {
        return (
          <div id="debugOverlay">
            <h4>SOCKET INFORMATION</h4>
            <p>
              Socket ID: { client.id }<br />
              Connected: { client.isConnected.toString() }<br />
              Authenticated: { client.isAuthenticated.toString() }
            </p>
            <h4>EXAMPLE MODULE</h4>
            <p>
              Example count: { exampleCount || "no example loaded" }
            </p>
            <h4>OBS INFORMATION</h4>
            <p>
              Streaming: { !!obsStreamStatus.streaming || "unknown" }<br />
              Recording: { !!obsStreamStatus.recording || "unknown" }<br />
              <br />
              Scene: { obs.state.sceneName || "unknown" }<br />
              FPS: { obsStreamStatus.fps || "unknown" }<br />
              bPS: { obsStreamStatus.bytesPerSec  || "unknown" }
            </p>
          </div>
        );
      }
    }

    return null;
  }

  render() {
    return (
      <div>
        <canvas id="container" />
        { this._debugOverlay() }
      </div>
    )
  }
}
