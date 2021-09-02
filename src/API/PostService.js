import axios from "axios";

export default class PostService {

  static async getAll() {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
    return response.data
  }

  static async getPostsByPage(page, limit) {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
      params: {
        '_page': page,
        '_limit': limit
      }
    })
    return response
  }

  static async getPostById(id) {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
    return response.data
  }

  static async getCommentsPostById(id) {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
    return response.data
  }
}
