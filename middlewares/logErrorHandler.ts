import fs from "fs"
import pino, { Logger } from "pino";

const logger: Logger = pino()

export const logErrorHandler = (message: string): void => {
    const timestamp = new Date().toISOString()
    const logMessage = `${timestamp} - ${message} \n`;

    fs.appendFile("error.log", logMessage, (err) => {
        if (err) {
            console.error(`Error writing to the log file : ${err.message}`)
        } else {
            logger.info(message)
        }
    })
}