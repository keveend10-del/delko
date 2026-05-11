export function verifyAdminToken(token: string | undefined): boolean {
  if (!token) return false
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8')
    return decoded.endsWith(`:${process.env.ADMIN_PASSWORD}`)
  } catch {
    return false
  }
}
