import type { ResponseStatus } from 'shared/model/enums'

export interface iErrorMessage {
  status: ResponseStatus.ERROR,
  data: string
}

export interface iResponse<T = unknown> {
  status: ResponseStatus.SUCCESS,
  data: T
}

export type ResponseData<T = unknown> = iResponse<T> | iErrorMessage
