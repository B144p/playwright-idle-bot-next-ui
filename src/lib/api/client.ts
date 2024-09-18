import axios, { CreateAxiosDefaults } from 'axios'

const api_host = process.env.NEXT_PUBLIC_API_HOST

const config: CreateAxiosDefaults = {
  baseURL: api_host,
  headers: {
    'Content-Type': 'application/json',
  },
}

const client = axios.create(config)

export { client }
