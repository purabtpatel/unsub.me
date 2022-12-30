import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { useAuth } from '@redwoodjs/auth'
import { useMutation } from '@redwoodjs/web'

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUserMutation($id: Int!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
    }
  }
`

const VerificationPage = ({token}) => {
  const { currentUser, isAuthenticated } = useAuth()
  const [updateUser] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted: () => {
      navigate(routes.home())
    },
  })


  if(isAuthenticated && currentUser.verificationToken === token) {
    //redirect to home page
    updateUser({ variables: { id: currentUser.id, input: { verified: true } } })
  }

  return (
    <>
    </>
  )
}

export default VerificationPage
