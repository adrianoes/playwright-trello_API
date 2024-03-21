import { test, expect } from '@playwright/test';
require('dotenv').config()

const key = process.env.TRELLO_KEY
const token = process.env.TRELLO_TOKEN

test.describe('cards', () => {
  test('Create a card', async ({ request }) => {
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

    const responseCC = await request.post(`/1/cards?idList=${list_id}&key=${key}&token=${token}`, {
      data: {
        name: "myCard123"
    }
    });
    const responseBodyCC = await responseCC.json()
    const card_id = responseBodyCC.id
    expect(responseCC.status()).toEqual(200)
    console.log(responseBodyCC.name)

    const responseDC = await request.delete(`/1/cards/${card_id}?key=${key}&token=${token}`);
    expect(responseDC.status()).toEqual(200)

    const responseDB = await request.delete(`/1/boards/${board_id}?key=${key}&token=${token}`);
    expect(responseDB.status()).toEqual(200)
  })

  test('Get a card', async ({ request }) => {
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

    const responseCC = await request.post(`/1/cards?idList=${list_id}&key=${key}&token=${token}`, {
      data: {
        name: "myCard123" //Card name is passed in the body, not in the url
    }
    });
    const responseBodyCC = await responseCC.json()
    const card_id = responseBodyCC.id
    expect(responseCC.status()).toEqual(200)
    console.log(responseBodyCC.name)

    const responseGC = await request.get(`/1/cards/${card_id}?key=${key}&token=${token}`);
    const responseBodyGC = await responseGC.json()
    expect(responseGC.status()).toEqual(200)    
    console.log(responseBodyGC.name)

    const responseDC = await request.delete(`/1/cards/${card_id}?key=${key}&token=${token}`);
    expect(responseDC.status()).toEqual(200)

    const responseDB = await request.delete(`/1/boards/${board_id}?key=${key}&token=${token}`);
    expect(responseDB.status()).toEqual(200)
  })

  test('Update a card - name', async ({ request }) => {
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

    const responseCC = await request.post(`/1/cards?idList=${list_id}&key=${key}&token=${token}`, {
      data: {
        name: "myCard123" //Card name is passed in the body, not in the url
    }
    });
    const responseBodyCC = await responseCC.json()
    const card_id = responseBodyCC.id
    expect(responseCC.status()).toEqual(200)
    console.log(responseBodyCC.name)

    const responseUC = await request.put(`/1/cards/${card_id}?key=${key}&token=${token}`, {
      data: {
        name: "myCard2"
    }
    });
    const responseBodyUC = await responseUC.json()
    expect(responseUC.status()).toEqual(200)    
    console.log(responseBodyUC.name)

    const responseDC = await request.delete(`/1/cards/${card_id}?key=${key}&token=${token}`);
    expect(responseDC.status()).toEqual(200)

    const responseDB = await request.delete(`/1/boards/${board_id}?key=${key}&token=${token}`);
    expect(responseDB.status()).toEqual(200)
  })

  test('Delete a card', async ({ request }) => {
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

    const responseCC = await request.post(`/1/cards?idList=${list_id}&key=${key}&token=${token}`, {
      data: {
        name: "myCard123"
    }
    });
    const responseBodyCC = await responseCC.json()
    const card_id = responseBodyCC.id
    expect(responseCC.status()).toEqual(200)
    console.log(responseBodyCC.name)

    const responseDC = await request.delete(`/1/cards/${card_id}?key=${key}&token=${token}`);
    expect(responseDC.status()).toEqual(200)

    const responseDB = await request.delete(`/1/boards/${board_id}?key=${key}&token=${token}`);
    expect(responseDB.status()).toEqual(200)
  })
})

