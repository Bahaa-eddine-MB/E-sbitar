import { useAuth } from '../../AuthContext'

const AuthCard = ({ className }) => {
  const { auth } = useAuth()
  return (
    <div className={className}>
      <div className='flex gap-4 items-center'>
        <img
          src={auth?.photo_url}
          className={`w-20 h-20 rounded-full object-cover`}
        />
        <ul>
          <li className='text-fs-400 font-medium text-secondaryColor capitalize'>
            {auth?.person
              ? `${auth?.person?.last_name} ${auth?.person?.first_name}`
              : 'Super Admin'}
          </li>
          <li className='text-thirdColor text-fs-400'>@{auth?.username}</li>
        </ul>
      </div>
    </div>
  )
}

export default AuthCard
