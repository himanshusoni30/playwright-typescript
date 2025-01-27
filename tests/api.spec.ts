import {test, expect} from "@playwright/test"
import dotenv from 'dotenv';

test.describe("API test suite", () => {
    dotenv.config();

    test.use({ignoreHTTPSErrors: true,});

    test("GET /products", async ({request}) => {
        const base_url = process.env.API_BASE_URL;
        
        const response = await request.get(base_url + '/products');
        expect(response.status()).toBe(200);
        const body = await response.json();

        expect(body.data.length).toBe(9);
    });

    test("POST /users/login", async ({request}) => {
        // const base_url = "https://api.practicesoftwaretesting.com";
        
        const response = await request.post(process.env.API_BASE_URL + '/users/login',
            {
                data : {
                    email : 'customer@practicesoftwaretesting.com',
                    password : 'welcome01'
                }
            }
        );
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.access_token).not.toBeNull();
        expect(body.access_token).toBeTruthy();
        let access_token = body.access_token;
        console.log(access_token);
    });
});
