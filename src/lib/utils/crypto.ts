import cryptoJS from 'crypto-js'

const KEY = process.env.NEXT_PUBLIC_ENCRYPT_KEY ?? ''

export const encrypt = (cipherText: any) => {
  return cryptoJS.AES.encrypt(JSON.stringify(cipherText), KEY).toString()
}

export const decrypt = (cipherText: string) => {
  const decryptText = cryptoJS.AES.decrypt(cipherText.toString(), KEY).toString(cryptoJS.enc.Utf8)
  return decryptText.substring(1, decryptText.length - 1)
}
