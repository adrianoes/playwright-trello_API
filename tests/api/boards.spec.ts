import { test, expect } from '@playwright/test';
import { createBoard } from '../supports/commands';
import data from '../fixtures/testdata.json';
import fs from 'fs';

require('dotenv').config()

const key = process.env.TRELLO_KEY
const token = process.env.TRELLO_TOKEN

test.describe('Boards', () => {
  test('Create a board', async ({ request }) => {
    const board_name = 'myBoard123'
    const responseCB = await request.post(`/1/boards/?name=${board_name}&key=${key}&token=${token}`, {});
    const responseBodyCB = await responseCB.json()
    // const board_id = responseBodyCB.id
    fs.writeFile('tests/fixtures/testdata.json', JSON.stringify({
      board_id: responseBodyCB.id      
    }), err => { if (err) console.log("Error writing file:", err);});
    expect(responseCB.status()).toEqual(200)
    console.log(responseBodyCB.name)

    // const responseDB = await request.delete(`/1/boards/${board_id}?key=${key}&token=${token}`);
    // expect(responseDB.status()).toEqual(200)
  })

  test('Get a board', async ({ request }) => {
    const board_name = 'myBoard123'
    const responseCB = await request.post(`/1/boards/?name=${board_name}&key=${key}&token=${token}`, {});
    const responseBodyCB = await responseCB.json()
    const board_id = responseBodyCB.id
    expect(responseCB.status()).toEqual(200)
    console.log(responseBodyCB.name)

    const responseGB = await request.get(`/1/boards/${board_id}?key=${key}&token=${token}`);
    const responseBodyGB = await responseGB.json()
    expect(responseGB.status()).toEqual(200)    
    console.log(responseBodyGB.name)

    const responseDB = await request.delete(`/1/boards/${board_id}?key=${key}&token=${token}`);
    expect(responseDB.status()).toEqual(200)
  })

  test('Update a board - name', async ({ request }) => {
    const board_name = 'myBoard123'
    const responseCB = await request.post(`/1/boards/?name=${board_name}&key=${key}&token=${token}`, {});
    const responseBodyCB = await responseCB.json()
    const board_id = responseBodyCB.id
    expect(responseCB.status()).toEqual(200)
    console.log(responseBodyCB.name)

    const responseUB = await request.put(`/1/boards/${board_id}?key=${key}&token=${token}`, {
      data: {
        name: "myBoard2"
    }
    });
    const responseBodyUB = await responseUB.json()
    expect(responseUB.status()).toEqual(200)    
    console.log(responseBodyUB.name)

    const responseDB = await request.delete(`/1/boards/${board_id}?key=${key}&token=${token}`);
    expect(responseDB.status()).toEqual(200)
  })

  test('Delete a board', async ({ request }) => {
    // await createBoard(request)


    // const body = JSON.parse(fs.readFileSync("C:/playwright-trello_API/tests/fixtures/testdata.json", "utf8"))
    // const board_id = body.board_id
    // console.log(board_id)
    
    fs.readFile("C:/playwright-trello_API/tests/fixtures/testdata.json", "utf8", function(err, data) {
      if (err) { throw err };
      const body = data;
      console.log(body);
    });
    // 
    // const responseDB = await request.delete(`/1/boards/${board_id}?key=${key}&token=${token}`);
    // expect(responseDB.status()).toEqual(200)
  })
})

// Comparing same test in cypress, I was able to see that playwright has around 50% of code lines