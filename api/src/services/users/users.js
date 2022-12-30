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
function sendTestEmail(emailAddress, verificationLink) {
  const contactpageLink = `${process.env.APP_URL}/contact`
  const subject = 'UnSub.me | Verify your email address'
  const text =
  'Hi there,\n\n' +
  'Thanks for signing up for our service! In order to complete your registration, please verify your email address by clicking the link below:\n\n' +
  `Verification link: ${verificationLink}\n\n` +
  'If you have any questions or need help, please don\'t hesitate to reach out.\n\n' +
  'Best regards,\n' +
  '[Your company name]'
  const html =
    `<p>Hi there,</p>
    <p>Thanks for signing up for our service! In order to complete your registration, please verify your email address by clicking the button below:</p>
    <p><a href="${verificationLink}" style="display: inline-block; padding: 10px 20px; font-size: 16px; font-weight: bold; color: #fff; background-color: #0077c9; border: 0; border-radius: 4px; cursor: pointer; transition: background-color 0.2s;">Verify email</a></p>
    <p>If you have any questions or need help, please don't hesitate to <a href="${contactpageLink}">reach out</a>.</p>
    <p>Best regards,<br>
    [Your company name]</p>`
  return sendEmail({ to: emailAddress, subject, text, html })
}
export const emailUser = async ({ id }) => {
  const user = await db.user.findUnique({
    where: { id },
  })
  const verificationLink = `${process.env.APP_URL}/verify-email?token=${user.verificationToken}`
  await sendTestEmail(user.email, verificationLink)
  await createAudit({
    input: {
      user: { connect: { id } }, log: `Sent email to user`,
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
