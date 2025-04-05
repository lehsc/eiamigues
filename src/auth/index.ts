import crypto from 'crypto'


export const generateCode = () => {
    const code = crypto.createHash('sha256').update(String(12)).digest('hex')
} 