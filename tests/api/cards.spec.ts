import { test, expect } from '@playwright/test';
import { createBoard, createCard, createList, deleteBoard, deleteCard } from '../supports/commands';
import fs from 'fs';

require('dotenv').config()

const key = process.env.TRELLO_KEY
const token = process.env.TRELLO_TOKEN

test.describe('cards', () => {
  test('Create a card', async ({ request }) => {
    await createBoard(request)

    await createList(request)

    const body = JSON.parse(fs.readFileSync("C:/playwright-trello_API/tests/fixtures/testdata.json", "utf8"))
    const list_id = body.list_id
    const board_id = body.board_id
    console.log(list_id)
    const responseCC = await request.post(`/1/cards?idList=${list_id}&key=${key}&token=${token}`, {
      data: {
        name: "myCard123"
    }
    });
    const responseBodyCC = await responseCC.json()
    expect(responseCC.status()).toEqual(200)
    console.log(responseBodyCC.name)
    fs.writeFileSync('tests/fixtures/testdata.json',JSON.stringify({
      board_id: board_id,
      list_id: list_id,
      card_id: responseBodyCC.id
    }), "utf8");

    await deleteCard(request)

    await deleteBoard(request)
  })

  test('Get a card', async ({ request }) => {
    await createBoard(request)

    await createList(request)

    await createCard(request)

    const body = JSON.parse(fs.readFileSync("C:/playwright-trello_API/tests/fixtures/testdata.json", "utf8"))
    const card_id = body.card_id
    const responseGC = await request.get(`/1/cards/${card_id}?key=${key}&token=${token}`);
    const responseBodyGC = await responseGC.json()
    expect(responseGC.status()).toEqual(200)    
    console.log(responseBodyGC.name)

    await deleteCard(request)

    await deleteBoard(request)
  })

  test('Update a card - name', async ({ request }) => {
    await createBoard(request)

    await createList(request)

    await createCard(request)

    const body = JSON.parse(fs.readFileSync("C:/playwright-trello_API/tests/fixtures/testdata.json", "utf8"))
    const card_id = body.card_id
    const responseUC = await request.put(`/1/cards/${card_id}?key=${key}&token=${token}`, {
      data: {
        name: "myCard2"
    }
    });
    const responseBodyUC = await responseUC.json()
    expect(responseUC.status()).toEqual(200)    
    console.log(responseBodyUC.name)

    await deleteCard(request)

    await deleteBoard(request)
  })

  test('Delete a card', async ({ request }) => {
    await createBoard(request)

    await createList(request)

    await createCard(request)

    const body = JSON.parse(fs.readFileSync("C:/playwright-trello_API/tests/fixtures/testdata.json", "utf8"))
    const card_id = body.card_id
    const responseDC = await request.delete(`/1/cards/${card_id}?key=${key}&token=${token}`);
    expect(responseDC.status()).toEqual(200)

    await deleteBoard(request)
  })
})

