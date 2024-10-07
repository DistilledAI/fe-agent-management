import ReactWordcloud from "react-wordcloud"

const Test: React.FC = () => {
  const words = [
    {
      text: "told",
      value: 64,
    },
    {
      text: "mistake",
      value: 11,
    },
    {
      text: "thought",
      value: 16,
    },
    {
      text: "bad",
      value: 17,
    },
  ]

  const COLOR_LIST = {
    1: "#878583",
    2: "#E1CC9B",
    3: "#58564C",
    4: "#D3BA7D",
    5: "#BAB4A2",
  }

  function generateRandomNumber() {
    return Math.floor(Math.random() * 20) + 1
  }

  // Example usage:
  console.log(generateRandomNumber())

  const callbacks = {
    getWordColor: (word) => (word.value > 50 ? "blue" : "red"),
    onWordClick: console.log,
    onWordMouseOver: console.log,
    getWordTooltip: (word) =>
      `${word.text} (${word.value}) [${word.value > 50 ? "good" : "bad"}]`,
  }
  const options = {
    rotations: 2,
    rotationAngles: [-90, 0],
  }
  const size = [600, 400]

  return (
    <div>
      <ReactWordcloud
        callbacks={callbacks}
        options={options}
        size={size}
        words={words}
      />
    </div>
  )
}
export default Test
