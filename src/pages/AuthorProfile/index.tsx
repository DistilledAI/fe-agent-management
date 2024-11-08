import BackButton from "./BackButton"
import PublicAgents from "./PublicAgents"
import AuthorInfo from "./AuthorInfo"

const AuthorProfile = () => {
  return (
    <>
      <BackButton />
      <div className="space-y-2">
        <AuthorInfo />
        <PublicAgents />
      </div>
    </>
  )
}

export default AuthorProfile
