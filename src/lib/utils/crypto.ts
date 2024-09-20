import cryptoJS from 'crypto-js'

const KEY = process.env.NEXT_PUBLIC_ENCRYPT_KEY ?? ''

export const encrypt = (cipherText: any) => {
  return cryptoJS.AES.encrypt(JSON.stringify(cipherText), KEY).toString()
}

export const decrypt = (cipherText: string) => {
  return CryptoJS.AES.decrypt(cipherText.toString(), KEY).toString(CryptoJS.enc.Utf8)
}
