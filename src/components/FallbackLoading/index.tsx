import SpinnerLoading from "@components/SpinnerLoading"

const FallbackLoading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-light-blue/5">
      <SpinnerLoading />
    </div>
  )
}

export default FallbackLoading
