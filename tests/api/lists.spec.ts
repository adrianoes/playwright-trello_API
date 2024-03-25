import { test, expect } from '@playwright/test';
import { createBoard, createList, deleteBoard } from '../supports/commands';
import fs from 'fs';

require('dotenv').config()

const key = process.env.TRELLO_KEY
const token = process.env.TRELLO_TOKEN

test.describe('lists', () => {
  test('Create a list', async ({ request }) => {
    await createBoard(request)

    const body = JSON.parse(fs.readFileSync("C:/playwright-trello_API/tests/fixtures/testdata.json", "utf8"))
    const board_id = body.board_id
    console.log(board_id)
    const list_name = 'myList123'
    const responseCL = await request.post(`/1/boards/${board_id}/lists?name=${list_name}&key=${key}&token=${token}`, {});
    const responseBodyCL = await responseCL.json()
    // const list_id = responseBodyCL.id //trello has no delete list method, só we don't need list id since we will delete the whole board instead to keep environment clean
    expect(responseCL.status()).toEqual(200)
    console.log(responseBodyCL.name)
    //trello gives no api method to delete a list, so we don't need write list id logic here. on command file, we will keep it to use in update list test

    await deleteBoard(request)
  })

  test('Get a list', async ({ request }) => {
    await createBoard(request)

    await createList(request)

    const body = JSON.parse(fs.readFileSync("C:/playwright-trello_API/tests/fixtures/testdata.json", "utf8"))
    const list_id = body.list_id
    console.log(list_id)
    const responseGL = await request.get(`/1/lists/${list_id}?key=${key}&token=${token}`);
    const responseBodyGL = await responseGL.json()
    expect(responseGL.status()).toEqual(200)    
    console.log(responseBodyGL.name)

    await deleteBoard(request)
  })

  test('Update a list - name', async ({ request }) => {
    await createBoard(request)

    await createList(request)

    const body = JSON.parse(fs.readFileSync("C:/playwright-trello_API/tests/fixtures/testdata.json", "utf8"))
    const list_id = body.list_id
    console.log(list_id)
    const responseUL = await request.put(`/1/lists/${list_id}?key=${key}&token=${token}`, {
      data: {
        name: "myList2"
    }
    });
    const responseBodyUL = await responseUL.json()
    expect(responseUL.status()).toEqual(200)    
    console.log(responseBodyUL.name)

    await deleteBoard(request)
  })
})

