import { test, expect } from '@playwright/test';
require('dotenv').config()

const key = process.env.TRELLO_KEY
const token = process.env.TRELLO_TOKEN

test.describe('lists', () => {
  test('Create a list', async ({ request }) => {
    const board_name = 'myBoard123'
    const responseCB = await request.post(`/1/boards/?name=${board_name}&key=${key}&token=${token}`, {});
    const responseBodyCB = await responseCB.json()
    const board_id = responseBodyCB.id
    expect(responseCB.status()).toEqual(200)
    console.log(responseBodyCB.name)

    const list_name = 'myList123'
    const responseCL = await request.post(`/1/boards/${board_id}/lists?name=${list_name}&key=${key}&token=${token}`, {});
    const responseBodyCL = await responseCL.json()
    // const list_id = responseBodyCL.id //trello has no delete list method, só we don't need list id since we will delete the whole board instead to keep environment clean
    expect(responseCL.status()).toEqual(200)
    console.log(responseBodyCL.name)

    const responseDB = await request.delete(`/1/boards/${board_id}?key=${key}&token=${token}`);
    expect(responseDB.status()).toEqual(200)
  })

  test('Get a list', async ({ request }) => {
    const board_name = 'myBoard123'
    const responseCB = await request.post(`/1/boards/?name=${board_name}&key=${key}&token=${token}`, {});
    const responseBodyCB = await responseCB.json()
    const board_id = responseBodyCB.id
    expect(responseCB.status()).toEqual(200)
    console.log(responseBodyCB.name)

    const list_name = 'myList123'
    const responseCL = await request.post(`/1/boards/${board_id}/lists?name=${list_name}&key=${key}&token=${token}`, {});
    const responseBodyCL = await responseCL.json()
    const list_id = responseBodyCL.id
    expect(responseCL.status()).toEqual(200)
    console.log(responseBodyCL.name)

    const responseGL = await request.get(`/1/lists/${list_id}?key=${key}&token=${token}`);
    const responseBodyGL = await responseGL.json()
    expect(responseGL.status()).toEqual(200)    
    console.log(responseBodyGL.name)

    const responseDB = await request.delete(`/1/boards/${board_id}?key=${key}&token=${token}`);
    expect(responseDB.status()).toEqual(200)
  })

  test('Update a list - name', async ({ request }) => {
    const board_name = 'myBoard123'
    const responseCB = await request.post(`/1/boards/?name=${board_name}&key=${key}&token=${token}`, {});
    const responseBodyCB = await responseCB.json()
    const board_id = responseBodyCB.id
    expect(responseCB.status()).toEqual(200)
    console.log(responseBodyCB.name)

    const list_name = 'myList123'
    const responseCL = await request.post(`/1/boards/${board_id}/lists?name=${list_name}&key=${key}&token=${token}`, {});
    const responseBodyCL = await responseCL.json()
    const list_id = responseBodyCL.id
    expect(responseCL.status()).toEqual(200)
    console.log(responseBodyCL.name)

    const responseUL = await request.put(`/1/lists/${list_id}?key=${key}&token=${token}`, {
      data: {
        name: "myList2"
    }
    });
    const responseBodyUL = await responseUL.json()
    expect(responseUL.status()).toEqual(200)    
    console.log(responseBodyUL.name)

    const responseDB = await request.delete(`/1/boards/${board_id}?key=${key}&token=${token}`);
    expect(responseDB.status()).toEqual(200)
  })
})

