import file from "./file";
import reporter from "./reporter";
class ObjUtil{

    /**
     * @function click | @author isagani_20241023
     * @description Click object
     * @param {Object} objElement --Object to be clicked
     * @returns <none>
     */

    async clickObject(objElement){
        await reporter.addLog('Started Function: ClickObject')
        await objElement.waitForExist({timeout:3000})
        await objElement.click()
        const strXpath = await objElement.selector
        await file.appendTxtFile(global.strPath,`Completed Function: ClickObject - Successfull clicked ${strXpath}`)
    }


    /**
     * @function setObjectValue | @author isagani_20241023
     * @description set object value
     * @param {Object} objElement --Object to be set the value
     * @returns <none>
     */
    async setObjectValue(objElement,strText){
        await reporter.addLog('Started Function: setObjectValue')
        await objElement.waitForExist();
        await objElement.setValue(strText);
        const strXpath = await objElement.selector
        await file.appendTxtFile(global.strPath,`Completed Function: setObjectValue - Successfully clicked ${strXpath}`)
    }

    async getObjText(objElement){
        await reporter.addLog('Started Function: getObjText')
        await objElement.waitForExist();
        const strXpath = await objElement.selector
        const strText = objElement.getText()
        await file.appendTxtFile(global.strPath,`Completed Function: getObjText - Object ${strXpath} Text [${strText}]`)
        return strText;
    }

    async getObjValue(objElement){
        await reporter.addLog('Started Function: getObjValue')
        await objElement.waitForExist();
        const strXpath = await objElement.selector
        const strValue = objElement.getValue()
        await file.appendTxtFile(global.strPath,`Completed Function: getObjValue - Object ${strXpath} Value [${strValue}]`)
        return strValue;;
    }
}


export default new ObjUtil()