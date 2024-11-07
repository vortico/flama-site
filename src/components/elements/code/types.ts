export type LineType = 'number' | 'token'
export interface Lines {
  type: LineType
  token?: string
}

export const LINE_SELECTED_CLASS = 'line-selected'
