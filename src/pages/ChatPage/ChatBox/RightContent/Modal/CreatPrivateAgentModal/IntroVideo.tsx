import distilledAiPrivateAgent from "@assets/video/distilled-ai-private-agent-3d.mp4"

const IntroVideo: React.FC = () => {
  return (
    <div className="relative">
      <video
        autoPlay
        playsInline
        loop
        muted
        className="h-full w-full rounded-3xl border border-mercury-200 object-cover"
      >
        <source src={distilledAiPrivateAgent} type="video/mp4" />
        <track kind="captions"></track>
      </video>

      <div className="relative bottom-[30px] left-1/2 flex w-[calc(100%-44px)] -translate-x-1/2 items-center justify-between">
        <div>pause</div>
        <div>zoom</div>
      </div>
    </div>
  )
}

export default IntroVideo
