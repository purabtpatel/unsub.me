import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'
import {
  FieldError,
  Form,
  Label,
  TextField,
  TextAreaField,
  Submit,
} from '@redwoodjs/forms'

import "./contactPage.css"
import { routes } from '@redwoodjs/router'

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`


const ContactPage = () => {
  const [create, { loading, error }] = useMutation(CREATE_CONTACT, {
    onCompleted: () => {
      toast.success('Thank you for your submission!')
      routes.about()
    },
  })

  const onSubmit = (data) => {
    create({ variables: { input: data } })

  }

  return (
    <>
      <MetaTags title="Contact" description="Contact page" />
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />

      <Form onSubmit={onSubmit} config={{ mode: 'onBlur' }}>
        <h1 className="contact-header">Contact Us</h1>
        <Label name="name" errorClassName="error">
          Name
        </Label>
        <TextField
          name="name"
          validation={{ required: true }}
          errorClassName="error"
        />
        <FieldError name="name" className="error" />

        <Label name="email" errorClassName="error">
          Email
        </Label>
        <TextField
          name="email"
          validation={{
            required: true,
            pattern: {
              value: /^[^@]+@[^.]+\..+$/,
              message: 'Please enter a valid email address',
            },
          }}
          errorClassName="error"
        />
        <FieldError name="email" className="error" />

        <Label name="message" errorClassName="error">
          Message
        </Label>
        <TextAreaField
          name="message"
          validation={{ required: true }}
          errorClassName="error"
        />
        <FieldError name="message" className="error" />

        <Submit disabled={loading}>Save</Submit>
      </Form>
    </>
  )
}

export default ContactPage