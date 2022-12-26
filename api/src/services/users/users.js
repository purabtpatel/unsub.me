import { prismaVersion } from '@redwoodjs/api'
import { db } from 'src/lib/db'
import { sendEmail } from 'src/lib/email'
import { createAudit } from '../audits/audits'



export const users = () => {
  return db.user.findMany()
}

export const user = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const createUser = ({ input }) => {
  return db.user.create({
    data: input,
  })
}
function sendTestEmail(emailAddress) {
  const subject = 'Test Email'
  const text =
    'This is a manually triggered test email.\n\n' +
    'It was sent from a RedwoodJS application.'
  const html =
    'This is a manually triggered test email.<br><br>' +
    'It was sent from a RedwoodJS application.'
  return sendEmail({ to: emailAddress, subject, text, html })
}
export const emailUser = async ({ id }) => {
  const user = await db.user.findUnique({
    where: { id },
  })
  await sendTestEmail(user.email)
  await createAudit({
    input: {
      user: { connect: { id } }, log: `Sent test email to user`,
    },
  })
  return user
}

// function sendContactEmail({ name, email, message }) {
//   const subject = 'New Contact Form Submission'
//   const text = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
//   const html = `
//     <h1>New Contact Form Submission</h1>
//     <p>Name: ${name}</p>
//     <p>Email: ${email}</p>
//     <p>Message: ${message}</p>
//   `
//   return sendEmail({ to: process.env.SMPT_USER, subject, text, html })
// }

// export const contactUser = async ({ id, input }) => {
//   const user = await db.user.findUnique({
//     where: { id },
//   })
//   await sendContactEmail({ ...input })
//   await createAudit({
//     input: {
//       user
//         : { connect: { id } }, log: `Sent contact email to user`,
//     },
//   })
//   return user
// }



export const verifyUser = async ({ id }) => {
  const user = await db.user.findUnique({
    where: { id },
  })

  await createAudit({
    input: {
      user: { connect: { id } }, log: `Sent verification email to user`,
    },
  })
}

export const updateUser = ({ id, input }) => {
  return db.user.update({
    data: input,
    where: { id },
  })
}

export const deleteUser = ({ id }) => {
  return db.user.delete({
    where: { id },
  })
}

export const User = {
  Audit: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).Audit()
  },
}
