import axios from "axios";

const urlBuilder = (path) => `http://localhost:3001${path}`;

const headerBuilder = () => {
  const token = localStorage.getItem("user");
  return { headers: { authorization: token }};
};

class API {
  static async get(path) {
    const response = await axios.get(urlBuilder(path), headerBuilder());
    if (response.data?.redirect) {
      window.location.href="/login"
      return;
    }
    return response;
  }

  static async post(path, body) {
    const response = await axios.post(urlBuilder(path), body, headerBuilder());
    if (response.data?.redirect) {
      window.location.href="/login"
      return;
    }
    return response;
  }

  static async put(path, body) {
    const response = await axios.put(urlBuilder(path), body, headerBuilder());
    if (response.data?.redirect) {
      window.location.href="/login"
      return;
    }
    return response;
  }

  static async delete(path) {
    const response = await axios.delete(urlBuilder(path), headerBuilder());
    if (response.data?.redirect) {
      window.location.href="/login"
      return;
    }
    return response;
  }
}

export { API };
