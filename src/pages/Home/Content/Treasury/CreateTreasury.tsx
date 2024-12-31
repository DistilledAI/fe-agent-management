import { Button } from "@nextui-org/react"
import React, { useState } from "react"
import { createTreasury } from "./helpers"
import { toast } from "react-toastify"

const CreateTreasury: React.FC<{
  getTreasury: () => void
  agentAddress: string
}> = ({ getTreasury, agentAddress }) => {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const res = await createTreasury(agentAddress)
      if (res) {
        toast.success("Created successfully!")
        getTreasury()
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <p className="mb-2 font-medium">First you need to create treasury!</p>
      <Button
        isLoading={loading}
        onClick={handleSubmit}
        className="font-semibold"
      >
        Create Treasury
      </Button>
    </div>
  )
}

export default CreateTreasury
