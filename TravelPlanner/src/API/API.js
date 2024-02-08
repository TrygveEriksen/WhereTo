import axios from "axios";

const urlBuilder = (path) => `http://localhost:3001${path}`;

const headerBuilder = () => {
  const token = localStorage.getItem("user");
  return { headers: { authorization: token }, validateStatus: () => true };
};

class API {
  static async get(path) {
    const response = await axios.get(urlBuilder(path), headerBuilder());
    if (response.status === 400) {
        throw new Error(response);
    }
    return response;
  }

  static async post(path, body) {
    const response = await axios.post(urlBuilder(path), body, headerBuilder());
    return response;
  }

  static async put(path, body) {
    const response = await axios.put(urlBuilder(path), body, headerBuilder());
    return response;
  }

  static async delete(path) {
    const response = await axios.delete(urlBuilder(path), headerBuilder());
    return response;
  }
}

export { API };
