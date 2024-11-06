import {SerialPort} from "serialport";
import protobuf from 'protobufjs';

const START_BYTE = 0xAA;
const TELEMETRY_TYPE = 0x01;
const COMMAND_TYPE = 0x02;
const PORT_PATH = '/dev/ttyUSB0';  // Update this with your serial port path
const BAUD_RATE = 115200;

// Load Protobuf definitions asynchronously
const root = await protobuf.load('src/main/config/telemetry.proto');
// const Telemetry = root.lookupType('Telemetry');
const Command = await root.lookupType('Command');

// Initialize Serial Port
export const port = new SerialPort({
  path: 'COM6',
  baudRate: 115200
});

// Helper function for checksum calculation (XOR)
const calculateChecksum = data => data.reduce((checksum, byte) => checksum ^ byte, 0);

export function decodeSerial(data) {
  protobuf.load("src/main/config/telemetry.proto", async function (err, root) {
    if (err) throw err;

    const AwesomeMessage = root.lookupType("Telemetry");

    const message = AwesomeMessage.decode(data);
    const object = AwesomeMessage.toObject(message, {
      longs: String,
      enums: String,
      bytes: String,
    });

    console.log(object);
  });
}

// Read telemetry data from the device
const readTelemetry = buffer => {
  if (buffer[0] === START_BYTE) {
    const length = buffer[1];
    const messageType = buffer[2];
    const payload = buffer.slice(3, 3 + length);
    const checksum = buffer[3 + length];

    if (calculateChecksum([...payload]) === checksum && messageType === TELEMETRY_TYPE) {
      decodeSerial(payload);
    }
  }
};

export async function encodeSerial(payload) {
  return new Promise((resolve, reject) => {
    protobuf.load("src/main/config/telemetry.proto", function (err, root) {
      if (err) {
        reject(err);
        return;
      }

      const AwesomeMessage = root.lookupType("Command");

      const errMsg = AwesomeMessage.verify(payload);
      if (errMsg) {
        reject(new Error(errMsg));
        return;
      }

      let message = AwesomeMessage.create(payload);
      const buffer = AwesomeMessage.encode(message).finish();
      resolve(buffer);
    });
  });
}

// Send command to the device
export const sendCommand = async (ledOn) => {
  let payload = await encodeSerial({test: ledOn});
  const length = payload.length;

  // Frame: start byte, length, message type, payload, checksum
  const frame = Buffer.from([
    START_BYTE,
    length,
    COMMAND_TYPE,
    ...payload,
    calculateChecksum([...payload])
  ]);
  console.log(frame);

  port.write(frame, err => {
    if (err) console.error('Error writing to port:', err);
  });
};

// Listen for incoming telemetry data
port.on('data', readTelemetry);