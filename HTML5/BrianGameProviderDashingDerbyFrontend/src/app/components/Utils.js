/********* Script_Details ************
 * @Original_Creator :- Md jahangir.
 * @Created_Date :- 06-03-2023.
 * @Last_Update_By :- Md jahangir.
 * @Last_Updatd_Date :- 12-05-2023
 * @Description :- Handles Global function that need everywhere.
 ************************************/

import { Localization } from "./Localization.js";

//#region - Class defination 
class Utils {
    /**
    * initializes variables.
    * @Constructor
    */
    constructor() {
        this.currentDate = new Date();
    };

    /**
    * Check is there any value null/undefine/length 0 .
    * @returns {string} empty or not
    */
    IsEmpty = (value) => {
        if (value === null || value === undefined || this.Trim(value) === '' || this.Trim(value) === "" || value.length === 0) {
            return true
        } else {
            return false
        }
    };

    /**
    * Trim the string.
    * @returns {string} string with trim
    */
    Trim = (x) => {
        let value = String(x)
        return value.replace(/^\s+|\s+$/gm, '')
    };

    /**
    * Get exact combination from permutation.
    * @returns {Array} array of the combination
    */
    GetExactCombinationArray(_inputArr) {
        let combinationArray = [];
        let returnArr = this.GetPermutations(_inputArr);
        for (let i = 0; i < returnArr.length; i++) {
            let str = returnArr[i];
            if (str.length > 2) {
                combinationArray.push(str[0] + "-" + str[1] + "-" + str[2]);
            } else {
                combinationArray.push(str[0] + "-" + str[1]);
            }
        }
        return combinationArray;
    };

    /**
    * Calculate permutation combination.
    * @returns {Array} array of the permutation combination
    */
    GetPermutations(arr) {
        if (arr.length <= 2) return arr.length === 2 ? [arr, [arr[1], arr[0]]] : arr;
        return arr.reduce(
            (acc, item, i) =>
                acc.concat(
                    this.GetPermutations([...arr.slice(0, i), ...arr.slice(i + 1)]).map(val => [
                        item,
                        ...val,
                    ])
                ),
            []
        );
    };

    /**
* Convert xml data to json data.
* @returns {object} object of the json data
*/
    ConvertXmlToJson(_xml) {
        // Create the return object
        let obj = {};
        if (_xml.nodeType == 1) { // element
            // do attributes
            if (_xml.attributes.length > 0) {
                obj["attributes"] = {};
                for (let j = 0; j < _xml.attributes.length; j++) {
                    let attribute = _xml.attributes.item(j);
                    obj["attributes"][attribute.nodeName] = attribute.nodeValue;
                }
            }
        } else if (_xml.nodeType == 3) { // text
            obj = _xml.nodeValue;
        }
        // do children
        if (_xml.hasChildNodes()) {
            for (let i = 0; i < _xml.childNodes.length; i++) {
                let item = _xml.childNodes.item(i);
                let nodeName = item.nodeName;
                if (typeof (obj[nodeName]) == "undefined") {
                    obj[nodeName] = this.ConvertXmlToJson(item);
                } else {
                    if (typeof (obj[nodeName].push) == "undefined") {
                        let old = obj[nodeName];
                        obj[nodeName] = [];
                        obj[nodeName].push(old);
                    }
                    obj[nodeName].push(this.ConvertXmlToJson(item));
                }
            }
        }
        return obj;
    };

    /**
    * Convert UTC time to Local time.
    * @returns {string} time
    */
    ConvertUtcTimeToLocal(hour, minute, sec) {
        this.currentDate.setUTCHours(hour);
        this.currentDate.setUTCMinutes(minute);
        this.currentDate.setUTCSeconds(sec);
        return (this.currentDate.toLocaleTimeString('en-GB', {
            hour12: false,
        }));
    };

    /**
    * Convert Position to String.
    * @returns {string} 1st/2nd/3rd
    */
    ConvertPositionToString(_pos) {
        let string;
        switch (_pos) {
            case 1:
                string = _pos + Localization.firstText;
                break;
            case 2:
                string = _pos + Localization.secondText;
                break;
            case 3:
                string = _pos + Localization.thirdText;
                break;
        }
        return string;
    };

    DisableButton(_buttonObj) {
        _buttonObj.disabled = true;
    };
    EnableButton(_buttonObj) {
        _buttonObj.disabled = false;
    };

    //==============================================================
    FindCombination(list, n = 0, result = [], current = []) {
        if (n === list.length) result.push(current)
        else list[n].forEach(item => this.FindCombination(list, n + 1, result, [...current, item]))

        return result
    };

    FindPermutation(arr = []) {
        let res = []
        const helper = (arr2) => {
            if (arr2.length == arr.length)
                return res.push(arr2)
            for (let e of arr)
                if (!arr2.includes(e))
                    helper([...arr2, e])
        };
        helper([])
        return res;
    };

    GetAllPermutationsAndCombinations(_inputArray) {
        let cominationArray = [];
        let result = this.FindCombination(_inputArray);
        for (let el of result) {
            cominationArray.push(this.FindPermutation(el));
        }
        return {
            permutedArr: (cominationArray.flat()).map(el => el.join(',')),
            combinationArr: (result).map(el => el.join(','))
        };
    };
    //================================================================



}
//#endregion 
let utils = new Utils();
export { utils as Utils };