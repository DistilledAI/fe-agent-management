import mixpanel from "mixpanel-browser"
import numeral from "numeral"
import { useSearchParams } from "react-router-dom"
const envMode = import.meta.env.VITE_APP_ENV_MODE

function countZeros(value: number) {
  const numOfZeros = -Math.floor(Math.log10(value) + 1)
  return numOfZeros === 0 ? 0 : numOfZeros
}

function convertNumberToShortFormatUtil(value: number) {
  let newValue = value
  const numOfZeros = countZeros(newValue)
  if (numOfZeros >= 5) {
    const string_value = newValue.toString()

    let e_idx = string_value.indexOf("e")
    let baseVal

    if (string_value.indexOf(".") >= 0) {
      const splits = string_value.split(".")
      if (splits[0] == "0") splits[0] = ""
      e_idx = splits[1].indexOf("e")
      baseVal = e_idx != -1 ? splits[0] + splits[1].slice(0, e_idx) : splits[1]
    } else baseVal = e_idx != -1 ? string_value.slice(0, e_idx) : string_value

    newValue = Number(
      newValue.toFixed(Math.min(numOfZeros + baseVal.length + 1, 100)),
    )

    if (e_idx === -1) {
      return {
        numOfZeros: 0,
        baseVal: newValue.toFixed(7),
      }
    }

    return {
      numOfZeros: numOfZeros,
      baseVal: baseVal.slice(0, Math.min(4, baseVal.length)),
    }
  } else {
    return {
      numOfZeros: numOfZeros,
      baseVal: newValue.toFixed(4),
    }
  }
}

export function formatNumberWithDecimal(value: number) {
  if (value > 0 && value < 1) {
    return numeral(value).format("0.00000000")
  } else {
    return numeral(value).format("0,0.[000]")
  }
}

export function shortenNumberFormat(value: number) {
  if (value === 0) {
    return {
      numOfZeros: -1,
      baseVal: "0",
    }
  }

  const response = convertNumberToShortFormatUtil(value)
  if (response.numOfZeros === 0) {
    return {
      numOfZeros: -1,
      baseVal: response.baseVal,
    }
  }

  if (response["numOfZeros"] > 4) {
    return response
  } else {
    return {
      numOfZeros: -1,
      baseVal: formatNumberWithDecimal(value),
    }
  }
}

export function getFormattedNumber(value: number): string | null {
  if (value === 0) return "0"
  if (!value) return null
  const formatNumberObj = shortenNumberFormat(value)
  const { numOfZeros, baseVal } = formatNumberObj

  const formattedValue =
    numOfZeros > 4 ? `0.0<sub>${numOfZeros}</sub>${baseVal}` : baseVal

  return formattedValue
}

export const mixpanelTrack = (eventName: string, property?: any) => {
  if (envMode !== "production") return
  mixpanel.track(eventName, property)
}

export const findIndexNearestNumber = (
  array: number[] = [],
  target: number,
): number => {
  let nearest = array[0]
  let indexNearest = 0
  let difference = Math.abs(nearest - target)

  for (let i = 1; i < array.length; i++) {
    const currentDifference = Math.abs(array[i] - target)
    if (currentDifference < difference) {
      difference = currentDifference
      nearest = array[i]
      indexNearest = i
    }
  }

  return indexNearest
}

export const getReferralCode = () => {
  const [searchParams] = useSearchParams()
  const referralCode = searchParams.get("referralCode")

  return referralCode
}
