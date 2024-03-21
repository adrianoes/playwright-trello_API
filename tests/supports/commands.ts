require('dotenv').config()
import { APIRequestContext, expect } from '@playwright/test';
import fs from 'fs';

const key = process.env.TRELLO_KEY
const token = process.env.TRELLO_TOKEN

export async function createBoard(request: APIRequestContext) {
    const board_name = 'myBoard123'
    const responseCB = await request.post(`/1/boards/?name=${board_name}&key=${key}&token=${token}`, {});
    const responseBodyCB = await responseCB.json()
    expect(responseCB.status()).toEqual(200)
    console.log(responseBodyCB.name)
    fs.writeFile('tests/fixtures/testdata.json', JSON.stringify({
      board_id: responseBodyCB.id
    }), err => { if (err) console.log("Error writing file:", err); });
}