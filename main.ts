//% color=#0062dB weight=96 icon="\uf294" block="BlockyTalky BLE"
namespace blockyTalkyBLE {
    let delimiter = "^";
    let terminator = "#";
    enum ValueTypeIndicator { String, Number }
    export class TypeContainer {
        stringValue: string;
        numberValue: number;
    }
    //% blockId=blockyTalkyBLE_send_string_key_value block="send string|key %key|value %value"
    export function sendMessageWithStringValue(key: string, value: string): void {
        sendRawMessage(key, ValueTypeIndicator.String, value)
    }
    //% blockId=blockyTalkyBLE_send_number_key_value block="send number|key %key|value %value"
    export function sendMessageWithNumberValue(key: string, value: number): void {
        sendRawMessage(key, ValueTypeIndicator.Number, value.toString())
    }
    function sendRawMessage(key: string, valueTypeIndicator: ValueTypeIndicator, value: string): void {
        let indicatorAsString = getStringForValueTypeIndicator(valueTypeIndicator);
        bluetooth.uartWriteString(indicatorAsString + delimiter + key + delimiter + value + terminator)
    }
    let splitString = (splitOnChar: string, input: string) => {
        let result: string[] = []
        let count = 0
        let startIndex = 0
        for (let index = 0; index < input.length; index++) {
            if (input.charAt(index) == splitOnChar) {
                result[count] = input.substr(startIndex, index - startIndex)

                startIndex = index + 1
                count = count + 1
            }
        }
        result[count] = input.substr(startIndex, input.length - startIndex)
        return result;
    }
     // Get string representation of enum.
    function getStringForValueTypeIndicator(vti: ValueTypeIndicator) {
        switch (vti) {
            case ValueTypeIndicator.Number:
                return "N"
            case ValueTypeIndicator.String:
                return "S"
            default:
                return "!"
        }
    }
     // Get enum representation of string.
     function getValueTypeIndicatorForString(typeString: string) {
        switch (typeString) {
            case "S":
                return ValueTypeIndicator.String
            case "N":
                return ValueTypeIndicator.Number
            default:
                return null
        }
    }
    bluetooth.startUartService()
} 
