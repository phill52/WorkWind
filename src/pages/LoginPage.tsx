
import {SignIn} from '@clerk/clerk-react'
export default function LoginScreen(): JSX.Element {
  return (
    <div className='flex flex-column justify-center align-center login-body'>
      <SignIn/>
    </div>
  )
}
