export interface User {
  id: string,
  email: string,
  password?: string,
  gender?: string,
  age?: number,
  weight?: number,
  height?: number,
  authenticated?: boolean
}
