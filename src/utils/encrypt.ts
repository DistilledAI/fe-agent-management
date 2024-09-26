import * as crypto from "crypto"

const ALGORITHM = "aes-256-gcm"
const SALT_LENGTH = 16
const IV_LENGTH = 12
const KEY_LENGTH = 32
const ITERATION = 65535

const signingSecret = import.meta.env.VITE_APP_SIGNING_SECRET

function getKey(salt: Buffer) {
  return crypto.pbkdf2Sync(signingSecret, salt, ITERATION, KEY_LENGTH, "sha512")
}

export function encrypt(obj: object) {
  const salt = crypto.randomBytes(SALT_LENGTH)
  const iv = crypto.randomBytes(IV_LENGTH)

  const key = getKey(salt)

  const cipher = crypto.createCipheriv(ALGORITHM, key, iv)
  const encrypted = Buffer.concat([
    cipher.update(JSON.stringify(obj), "utf8"),
    cipher.final(),
  ])

  const tag = cipher.getAuthTag()
  const encode = Buffer.concat([salt, iv, encrypted, tag]).toString("base64")
  return encode
}
