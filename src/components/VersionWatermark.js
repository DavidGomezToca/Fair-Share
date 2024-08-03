export default function VerisonWatermark() {
    const version = require('../../package.json').version;

    return (
        <div className="versionWatermark">{version}</div>
    );
}