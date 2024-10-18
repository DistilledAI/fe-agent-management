import distilledAiPrivateAgent from "@assets/video/distilled-ai-private-agent-3d.mp4"
import ReactPlayer from "react-player"

const IntroVideo: React.FC = () => {
  return (
    <ReactPlayer
      width="100%"
      height="100%"
      controls={true}
      url={distilledAiPrivateAgent}
      config={{ file: { attributes: { controlsList: "nodownload" } } }}
      muted
      playing
      loop
      style={{
        borderRadius: "22px",
      }}
    />
  )
}

export default IntroVideo
