import axios from 'axios';


import { autocompleteSearchApiCall } from "./AutocompleteApiCall.js";
jest.mock('axios');

const url = 'http://127.0.0.1:7070/users',
  payload = {
    data: {
      items: [{ id: 0 }, { id: 1 }]
    }
  };

test('autocompleteSearchApiCall returns expected items', done => {
  axios.get.mockResolvedValue(payload);
  autocompleteSearchApiCall(url, 'abc').then(response => {
    expect(response).toEqual(payload.data);
    done();
  });
});