import distilledAiPrivateAgent from "@assets/video/distilled-ai-private-agent-3d.mp4"

const IntroVideo: React.FC = () => {
  return (
    <div className="mb-7 w-full overflow-hidden rounded-lg">
      <video
        controls={false}
        playsInline
        autoPlay
        muted
        loop
        className="w-full"
      >
        <source src={distilledAiPrivateAgent} type="video/mp4" />
        <track kind="captions" />
      </video>
    </div>
  )
}

export default IntroVideo
