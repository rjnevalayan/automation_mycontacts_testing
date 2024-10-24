import { expect, browser, $ } from '@wdio/globals'
import moment from "moment";
import fs  from "fs";

let testEmail;
let password;

describe('Heroku App Tests', () => {
    before(async () => {
        const generateNumCode = moment().format('YYYYMMDDHHmm');
        testEmail = `test_${generateNumCode}04@gmail.com`;
        password = `testing;`
        await browser.url('https://thinking-tester-contact-list.herokuapp.com/');
        await $('//form//p//input[@id="email"]').waitForExist({ timeout: 3000 });
        await $('//form//p//input[@id="email"]').setValue(testEmail);
        await $('//form//p//input[@id="password"]').setValue(password);
        await $('//form//p//button[@id="submit"]').click();
    });

    it('Heroku_App_SignUp_TC001', async () => {
        await browser.url('https://thinking-tester-contact-list.herokuapp.com/');
        await $('//div//button[@id="signup"]').waitForExist({ timeout: 3000 });
        console.log('Signup button is visible, clicking...');
        await $('//div//button[@id="signup"]').click();
        
        await browser.url('https://thinking-tester-contact-list.herokuapp.com/addUser');
        
        await $('//div//input[@id="firstName"]').setValue('John');
        await $('//div//input[@id="lastName"]').setValue('Doe');
        console.log('Using email:', testEmail);
        await $('//div//input[@id="email"]').setValue(testEmail);
        await $('//div//input[@id="password"]').setValue(password);
        
        console.log('Submitting the signup form...');
        await $('//div//button[@id="submit"]').click();
        
        await browser.url('https://thinking-tester-contact-list.herokuapp.com/contactList');
        await browser.pause(2000);
    });

    it('Heroku_App_LoginUser_TC002', async () => {
        console.log('Using the same email in another test case:', testEmail);
        
        await browser.url('https://thinking-tester-contact-list.herokuapp.com/login');
        await $('//form//p//input[@id="email"]').waitForExist({ timeout: 3000 });
        await $('//form//p//input[@id="email"]').setValue(testEmail);
        await $('//form//p//input[@id="password"]').setValue(password);
        await $('//form//p//button[@id="submit"]').click();
        
        await browser.url('https://thinking-tester-contact-list.herokuapp.com/contactList');
        await browser.pause(2000);
    });

    it('Heroku_App_AddContact_TC003', async () => {
        await browser.url('https://thinking-tester-contact-list.herokuapp.com/');
        
        await $('//form//p//input[@id="email"]').waitForExist({ timeout: 5000 });
        await $('//form//p//input[@id="email"]').setValue(testEmail);
        console.log('Email entered:', testEmail);
        
        await $('//form//p//input[@id="password"]').setValue(password);
        await $('//form//p//button[@id="submit"]').click();

        await browser.waitUntil(async () => {
            return (await browser.getUrl()) === 'https://thinking-tester-contact-list.herokuapp.com/contactList';
        }, { timeout: 2000, timeoutMsg: 'Contact list page did not load' });

        const contactsToAdd = [
            {
                firstName: 'Isagani',
                lastName: 'Lapira',
                birthdate: '2001-01-01',
                email: 'isagani.lapira@test.com',
                street1: 'Apt. 442',
                street2: 'Yolanda Cove',
                city: 'New Kallie',
                stateProvince: 'Maine',
                postalCode: '89835',
                country: 'United States'
            },
            {
                firstName: 'Claudine',
                lastName: 'DelaCruz',
                birthdate: '1995-05-15',
                email: 'claudine.delacruz@test.com',
                street1: '123 Main St',
                street2: '',
                city: 'Springfield',
                stateProvince: 'Illinois',
                postalCode: '62701',
                country: 'United States'
            },
            {
                firstName: 'Aira',
                lastName: 'Bautista',
                birthdate: '1988-12-30',
                email: 'airamarie.bautista@test.com',
                street1: '789 Oak St',
                street2: '',
                city: 'Smalltown',
                stateProvince: 'Texas',
                postalCode: '73301',
                country: 'United States'
            }
        ];
        for (const contact of contactsToAdd) {
            console.log('Adding contact:', contact);
            
            await $('//div//button[@id="add-contact"]').waitForExist({ timeout: 5000 });
            await $('//div//button[@id="add-contact"]').click();

            await $('//div//form[@id="add-contact"]').waitForExist({ timeout: 5000 });

            await $('//div//form[@id="add-contact"]//p//input[@id="firstName"]').setValue(contact.firstName);
            await $('//div//form[@id="add-contact"]//p//input[@id="lastName"]').setValue(contact.lastName);
            await $('//div//form[@id="add-contact"]//p//input[@id="birthdate"]').setValue(contact.birthdate);
            await $('//div//form[@id="add-contact"]//p//input[@id="email"]').setValue(contact.email);
            await $('//div//form[@id="add-contact"]//p//input[@id="street1"]').setValue(contact.street1);
            await $('//div//form[@id="add-contact"]//p//input[@id="street2"]').setValue(contact.street2);
            await $('//div//form[@id="add-contact"]//p//input[@id="city"]').setValue(contact.city);
            await $('//div//form[@id="add-contact"]//p//input[@id="stateProvince"]').setValue(contact.stateProvince);
            await $('//div//form[@id="add-contact"]//p//input[@id="postalCode"]').setValue(contact.postalCode);
            await $('//div//form[@id="add-contact"]//p//input[@id="country"]').setValue(contact.country);
            
            await $('//div//button[@id="submit"]').click();
            
            await browser.waitUntil(async () => {
                return (await browser.getUrl()) === 'https://thinking-tester-contact-list.herokuapp.com/contactList';
            }, { timeout: 10000, timeoutMsg: 'Contact list did not refresh after adding contact' });

            await $('//div//table').waitForExist({ timeout: 10000 });

            const firstContactRow = await $('//div//table//tr[@class="contactTableBodyRow"][1]');
            const firstContactText = await firstContactRow.getText();
            expect
            console.log('First contact row:', firstContactText);
        }

        await browser.pause(5000); 
    });

    it('Heroku_App_EditContact_TC004', async () => {
        await browser.url('https://thinking-tester-contact-list.herokuapp.com/');
        await $('//form//p//input[@id="email"]').setValue(testEmail);
        await $('//form//p//input[@id="password"]').setValue(password);
        await $('//form//p//button[@id="submit"]').click();
    
        await $('//div//table').waitForExist({ timeout: 5000 });
        await $('//div//table//tr[@class="contactTableBodyRow"][1]').click();
    
        await $('//div//p//button[@id="edit-contact"]').click();
        await browser.url('https://thinking-tester-contact-list.herokuapp.com/editContact');
    
        const postalCodeField = await $('//div//form[@id="edit-contact"]//p//input[@id="postalCode"]');
        await postalCodeField.waitForExist({ timeout: 5000 });
    
        await postalCodeField.clearValue();
        await browser.pause(5000); 
        await postalCodeField.setValue('11111');
    
        await $('//div//p//button[@id="submit"]').click();
        await $('//div//p//button[@id="return"]').click();
    
        await $('//div//table').waitForExist({ timeout: 5000 });
        const firstContactRow = await $('//div//table//tr[@class="contactTableBodyRow"][1]');
        const contactDetails = await firstContactRow.getText();
        
        console.log('First contact row details:', contactDetails);
    
        expect(contactDetails).toContain('11111');
        await browser.pause(5000); 
    });

    it('Heroku_App_DeleteContact_TC005', async () => {
        await browser.url('https://thinking-tester-contact-list.herokuapp.com/');
        await $('//form//p//input[@id="email"]').waitForExist({ timeout: 3000 });
        await $('//form//p//input[@id="email"]').setValue(testEmail);
        await $('//form//p//input[@id="password"]').setValue(password);
        await $('//form//p//button[@id="submit"]').click();
        
        await browser.url('https://thinking-tester-contact-list.herokuapp.com/contactList');
        await $('//div//table').waitForExist({ timeout: 5000 });
        
        await $('//div//table//tr[@class="contactTableBodyRow"][3]').click();
        await browser.url('https://thinking-tester-contact-list.herokuapp.com/contactDetails');
        
        await $('//div//p//button[@id="delete"]').waitForExist({ timeout: 3000 });
        await $('//div//p//button[@id="delete"]').click();
        
        const alertIsPresent = await browser.isAlertOpen();
        if (alertIsPresent) {
            await browser.acceptAlert();
        } else {
            console.log('No alert was present after clicking delete.');
        }
        
        await browser.url('https://thinking-tester-contact-list.herokuapp.com/contactList');
        await $('//div//table').waitForExist({ timeout: 5000 });
    
        await browser.pause(3000);
    });    
    
    it('Heroku_App_ExportContactsOnFile_TC006', async () => {
        await browser.url('https://thinking-tester-contact-list.herokuapp.com/contactList');
        await $('//div//table').waitForExist({ timeout: 5000 });
    
        const table = await $(`table`);
        const rows = await table.$$(`tr`);
        const userCount = await rows.length;
    
        console.log(`Number of rows: ${userCount}`);
    
        const contactDataArray = [];
    
        for (let index = 1; index < userCount; index++) {
            const cells = await rows[index].$$(`td`);
            const cellCount = cells.length;
            const contactData = {};
    
            for (let j = 2; j < cellCount; j++) {
                const header = await $(`//thead//tr//th[${j - 1}]`).getText();
                const data = await $(`//table//tr[${index}]//td[${j}]`).getText();
                contactData[header] = data;
            }
    
            contactDataArray.push(contactData);
        }
    
        fs.writeFileSync('logs.txt', JSON.stringify(contactDataArray, null, 2), 'utf8');
    
        if (userCount > 3) {
            await rows[2].click();
        } else {
            console.error('Not enough rows to click the third contact.');
            return;
        }
    
        await browser.url('https://thinking-tester-contact-list.herokuapp.com/contactDetails');
        
        await $('//div//p//button[@id="delete"]').waitForExist({ timeout: 3000 });
        await $('//div//p//button[@id="delete"]').click();
        
        const alertIsPresent = await browser.isAlertOpen();
        if (alertIsPresent) {
            await browser.acceptAlert();
        } else {
            console.log('No alert was present after clicking delete.');
        }
        
        await browser.url('https://thinking-tester-contact-list.herokuapp.com/contactList');
        await $('//div//table').waitForExist({ timeout: 5000 });
    
        await browser.pause(3000);
    });
    
});
