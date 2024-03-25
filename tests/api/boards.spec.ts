import { test, expect } from '@playwright/test';
import { createBoard, deleteBoard } from '../supports/commands';
import fs from 'fs';
// imports below are an atempt to deal with async logic. 
// import { setTimeout } from 'timers/promises';
// import fixtureData from '../fixtures/testdata.json';

require('dotenv').config()

const key = process.env.TRELLO_KEY
const token = process.env.TRELLO_TOKEN

test.describe('Boards', () => {
  test('Create a board', async ({ request }) => {
    const board_name = 'myBoard123'
    const responseCB = await request.post(`/1/boards/?name=${board_name}&key=${key}&token=${token}`, {});
    const responseBodyCB = await responseCB.json()
    fs.writeFileSync('tests/fixtures/testdata.json',JSON.stringify({
      board_id: responseBodyCB.id
    }), "utf8");
    // code below is an atempt to deal with write async logic
    // const board_id = responseBodyCB.id
    // fs.writeFile('tests/fixtures/testdata.json', JSON.stringify({
    //   board_id: responseBodyCB.id      
    // }), err => { if (err) console.log("Error writing file:", err);});
    // expect(responseCB.status()).toEqual(200)
    // console.log(responseBodyCB.name)

    await deleteBoard(request)
  })

  test('Get a board', async ({ request }) => {
    await createBoard(request)

    const body = JSON.parse(fs.readFileSync('tests/fixtures/testdata.json', "utf8"))
    const board_id = body.board_id
    console.log(board_id)
    const responseGB = await request.get(`/1/boards/${board_id}?key=${key}&token=${token}`);
    const responseBodyGB = await responseGB.json()
    expect(responseGB.status()).toEqual(200)    
    console.log(responseBodyGB.name)

    await deleteBoard(request)
  })

  test('Update a board - name', async ({ request }) => {
    await createBoard(request)

    const body = JSON.parse(fs.readFileSync('tests/fixtures/testdata.json', "utf8"))
    const board_id = body.board_id
    console.log(board_id)
    const responseUB = await request.put(`/1/boards/${board_id}?key=${key}&token=${token}`, {
      data: {
        name: "myBoard2"
    }
    });
    const responseBodyUB = await responseUB.json()
    expect(responseUB.status()).toEqual(200)    
    console.log(responseBodyUB.name)

    await deleteBoard(request)
  })

  test('Delete a board', async ({ request }) => {
    await createBoard(request)

    const body = JSON.parse(fs.readFileSync('tests/fixtures/testdata.json', "utf8"))
    const board_id = body.board_id
    console.log(board_id)
    const responseDB = await request.delete(`/1/boards/${board_id}?key=${key}&token=${token}`);
    expect(responseDB.status()).toEqual(200)
    //ideas to deal with async logic are presented below
    //put api requests here inside
    //write env variables with the values of the responses
    //deactivate paralelism
    // research on how to keep context open for the time that is needed
    // execute write sync and read sync - it works. However an assync way should be elaborated to keep playwright good practices. Code below was an atempt of that
    
    // fs.readFile("C:/playwright-trello_API/tests/fixtures/testdata.json", "utf8", async function(err, data) {
    //   if (err) { throw err }
    //   const body = JSON.parse(data)
    //   // console.log(body.board_id)
    //   const board_id = body.board_id
    //   // console.log(board_id)
    //   // const responseDB = await request.delete(`/1/boards/${board_id}?key=${key}&token=${token}`);
    //   // expect(responseDB.status()).toEqual(200) 
    // })
  })
})



// Comparing same test in cypress, I was able to see that playwright has around 50% of code lines