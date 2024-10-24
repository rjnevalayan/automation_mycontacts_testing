import fs  from "fs";
import moment from "moment";
class File{
    async createTxtFile(strPath,strTxt){
        const strDateTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        await  fs.writeFile(`${strPath}.txt`,`[${strDateTime}] - ${strTxt}\n`, async (err)=>{
            if (err) throw err;
        })
    }

    async appendTxtFile(strPath,strTxt){
        const strDateTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        await fs.appendFile(`${strPath}.txt`,`[${strDateTime}] - ${strTxt}\n`, {flag: 'a+'}, async (err)=>{
            if (err) throw err;
        })
    }
    async deleteFolderContents(strFolder) {
        const arrDir = await fs.readdirSync(strFolder);
        // await console.log(arrDir)
        for (const strFile of arrDir) {
            await fs.unlinkSync(`${strFolder}/${strFile}`);
            // await console.log(`${strFolder}/${strFile}`)
        }
    }
}

export default new File();