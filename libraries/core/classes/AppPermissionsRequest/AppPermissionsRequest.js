import Request from '../Request';
import AppCommand from '../AppCommand';
import event from '../Event';
import requestBuffer from '../RequestBuffer';
import { logger } from '../../helpers';

/**
 * The AppPermissionsRequest class is be base class for app permission related request.
 * It contains the logic which in necessary to establish the process of sending an
 * app command and receiving an associated event.
 */
class AppPermissionsRequest extends Request {
  /**
   * The constructor.
   * @param {string} commandName The name of the command which is dispatched to the app.
   * @param {*} eventName The event name which is called by the app to deliver the requested data.
   */
  constructor(commandName, eventName) {
    super();

    this.commandName = commandName;
    this.eventName = eventName;

    this.commandParams = null;

    this.libVersion = '18.0';
    this.createSerial();
    this.createEventCallbackName(this.eventName);
  }

  /**
   * Sets the parameters for the app command.
   * @private
   * @param {Object} commandParams The parameters.
   * @return {AppPermissionsRequest}
   */
  setCommandParams(commandParams) {
    this.commandParams = commandParams;
    return this;
  }

  /**
   * Cleans up the instance after a successful or failed permissions request.
   * @private
   * @param {Function} requestCallback The event callback that processes the response.
   * @return {AppPermissionsRequest}
   */
  cleanUpRequest(requestCallback) {
    // Remove the event listener entry.
    event.removeCallback(this.getEventCallbackName(), requestCallback);
    // Remove the request from the buffer.
    requestBuffer.remove(this.serial);
    return this;
  }
  /* eslint-disable class-methods-use-this */
  /**
   * Validates the command params before dispatch.
   * @private
   * @abstract
   * @throws {Error}
   */
  validateCommandParams() {
    throw new Error('validateCommandParams needs to be overwritten by inherited class.');
  }
  /* eslint-enable class-methods-use-this */

  /**
   * Dispatches the app permissions command.
   * @private
   * @param {Function} resolve The resolve() callback of the dispatch promise.
   * @param {Function} reject The reject() callback of the dispatch promise.
   */
  async onDispatch(resolve, reject) {
    // Validate the command parameters.
    if (this.validateCommandParams(this.commandParams) === false) {
      // In case of an error log a message and reject the request promise.
      const message = `${this.commandName} - invalid command parameters passed`;
      logger.error(message, this.commandParams);

      reject(new Error(message));
      return;
    }

    /**
     * The event callback for the permissions response.
     * @param {string} serial The serial that was used to identify the callback.
     * @param {Array} permissions An array with the current app permissions.
     */
    const requestCallback = (serial, permissions) => {
      this.cleanUpRequest(requestCallback);
      resolve(permissions);
    };

    // Add the request to the buffer.
    requestBuffer.add(this, this.serial);
    // Add the event callback for the response.
    event.addCallback(this.getEventCallbackName(), requestCallback);

    // Prepare the permissions command.
    const command = new AppCommand()
      .setCommandName(this.commandName)
      .setLibVersion(this.libVersion)
      .setCommandParams({
        serial: this.serial,
        ...this.commandParams,
      });

    // Try to dispatch the command.
    const success = await command.dispatch();

    // If the dispatch of the command failed revert everything and reject to promise.
    if (success === false) {
      this.cleanUpRequest(requestCallback);
      reject(new Error(`${this.commandName} command dispatch failed`));
    }
  }
}

export default AppPermissionsRequest;
