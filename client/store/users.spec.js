/* global describe beforeEach afterEach it */
/*
import {expect} from 'chai'
import {fetchUsers} from './users'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('Users Store', () => {
  describe('thunk creators', () => {
    let store
    let mockAxios

    const initialState = {all: []}

    beforeEach(() => {
      mockAxios = new MockAdapter(axios)
      store = mockStore(initialState)
    })

    afterEach(() => {
      mockAxios.restore()
      store.clearActions()
    })

    describe('fetchUsers', () => {
      it('eventually dispatches the GET USERS action', async () => {
        const fakeUsers = [
          {userId: 1, email: 'Cody'},
          {userId: 2, email: 'Jane'}
        ]
        mockAxios.onGet('/api/users').replyOnce(200, fakeUsers)
        await store.dispatch(fetchUsers())
        const actions = store.getActions()
        expect(actions[0].type).to.be.equal('GET_USERS')
        expect(actions[0].users).to.be.deep.equal(fakeUsers)
      })
    }) //end describe fetchUsers
  }) //end describe thunk creators
}) // end describe users store
*/
