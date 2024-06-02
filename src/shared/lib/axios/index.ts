import type {
  AxiosRequestConfig,
  AxiosResponse
} from 'axios'
import axios, { AxiosError as _AxiosError } from 'axios'
import {
  HttpMethod,
  ResponseStatus
} from 'shared/model/enums'
import type {
  iErrorMessage,
  iResponse
} from 'shared/model/types'

const axiosInstance = axios.create({
  baseURL: '/api'
})

/**
 * Abstraction of an axios request with return type and response and error handling
 * @param method
 * @param url
 * @param config
 */
export const abstractApi = async <Type>(
  method: HttpMethod,
  url: string,
  config?: AxiosRequestConfig
) => {
  const requestMethod = () => {
    if (method === HttpMethod.POST) return axiosInstance.post(url, config?.data, config)
    if (method === HttpMethod.PUT) return axiosInstance.put(url, config?.data, config)
    if (method === HttpMethod.PATCH) return axiosInstance.patch(url, config?.data, config)
    if (method === HttpMethod.DELETE) return axiosInstance.delete(url, config)

    // GET as default
    return axiosInstance.get(url, config)
  }

  try {
    const { data }: AxiosResponse = await requestMethod()

    // Handling an error in a response with HTTP code 200
    if (data.status !== ResponseStatus.SUCCESS) {
      const errorResponse: iErrorMessage = {
        status: ResponseStatus.ERROR,
        data: data.data
      }
      return errorResponse
    }

    const successResponse: iResponse<Type> = {
      status: ResponseStatus.SUCCESS,
      data: data.data
    }
    return successResponse

  } catch (e: unknown | _AxiosError) {

    const errorResponse: iErrorMessage = {
      status: ResponseStatus.ERROR,
      data: axios.isAxiosError(e) ? e.response?.data?.data ?? 'Error occurred' : 'Error occurred'
    }

    return errorResponse
  }
}
