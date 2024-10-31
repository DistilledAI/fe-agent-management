import React, { createContext, useContext, useState } from "react"

const StyleSpacingContext = createContext<{
  spacing: number
  setSpacing: React.Dispatch<React.SetStateAction<number>>
}>({
  spacing: 0,
  setSpacing: () => null,
})

export const StyleSpacingProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [spacing, setSpacing] = useState<number>(0)

  return (
    <StyleSpacingContext.Provider value={{ spacing, setSpacing }}>
      {children}
    </StyleSpacingContext.Provider>
  )
}

export const useStyleSpacing = () => useContext(StyleSpacingContext)
