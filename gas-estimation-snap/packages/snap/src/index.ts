import type { OnRpcRequestHandler } from '@metamask/snaps-sdk';
import { panel, text, copyable  } from '@metamask/snaps-sdk';


async function getFees() {
  const response = await fetch("https://beaconcha.in/api/v1/execution/gasnow");
  return response.text();
}
/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.origin - The origin of the request, e.g., the website that
 * invoked the snap.
 * @param args.request - A validated JSON-RPC request object.
 * @returns The result of `snap_dialog`.
 * @throws If the request method is not valid for this snap.
 */
export const onRpcRequest: OnRpcRequestHandler = async ({
  origin,
  request,
}) => {
  switch (request.method) {
    case "hello":
      const result = await getFees().then(fees => {
        return  snap.request({
          method: 'snap_dialog',
          params: {
            type: "alert",
            content: panel([
              text(`Hello, **${origin}**!`),
              text("Хуй пизда и джигурда"),
              text("Current gas fee estimates:"),
              copyable(fees),
            ]),
          }
        });
      });

      console.log('Dialog result', result);
      return true;

    default:
      throw new Error('Method not found.');
  }
};
