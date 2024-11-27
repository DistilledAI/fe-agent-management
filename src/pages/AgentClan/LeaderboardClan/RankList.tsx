import { TrophyFilledIcon } from "@components/Icons"
import RankCard from "./RankCard"

const rankData = [
  {
    rank: 1,
    publicAddress: "0x123abc",
    userName: "AliceOrai",
    exp: 250,
    xDSTL: 20,
  },
  {
    rank: 2,
    publicAddress: "0x456def",
    userName: "BobOrai",
    exp: 240,
    xDSTL: 18,
  },
  {
    rank: 3,
    publicAddress: "0x789ghi",
    userName: "CharlieOrai",
    exp: 230,
    xDSTL: 16,
  },
  {
    rank: 4,
    publicAddress: "0xabc123",
    userName: "DavidOrai",
    exp: 220,
    xDSTL: 14,
  },
  {
    rank: 5,
    publicAddress: "0xdef456",
    userName: "EveOrai",
    exp: 210,
    xDSTL: 12,
  },
  {
    rank: 6,
    publicAddress: "0xghi789",
    userName: "FrankOrai",
    exp: 200,
    xDSTL: 10,
  },
  {
    rank: 7,
    publicAddress: "0xjkl012",
    userName: "GraceOrai",
    exp: 190,
    xDSTL: 9,
  },
  {
    rank: 8,
    publicAddress: "0xlmn345",
    userName: "HankOrai",
    exp: 180,
    xDSTL: 7,
  },
  {
    rank: 9,
    publicAddress: "0xopq678",
    userName: "IvyOrai",
    exp: 170,
    xDSTL: 5,
  },
  {
    rank: 10, // Rank 10 (lowest)
    publicAddress: "0xrst901",
    userName: "JackOrai",
    exp: 160,
    xDSTL: 3,
  },
]

const RankList = () => {
  return (
    <div className="space-y-2 py-4">
      <div className="px-6">
        <div className="flex items-center gap-2">
          <TrophyFilledIcon />
          <h4 className="text-16 font-medium text-mercury-800">Leaderboard</h4>
        </div>
        <p className="text-14 text-mercury-500">
          All EXP converts to xDSTL after the competition ends.
        </p>
      </div>
      <div className="max-h-[calc(100dvh-350px)] space-y-2 overflow-y-auto px-6 pb-20">
        <RankCard
          classNames={{
            wrapper: "border border-brown-500 bg-brown-50",
          }}
          rank={100}
          avatarUrl=""
          publicAddress="100"
          username="SamOrai"
          exp={100}
          xDSTL={10}
        />
        {rankData.map((data, index) => (
          <RankCard
            key={index}
            rank={data.rank}
            avatarUrl=""
            publicAddress={data.publicAddress}
            username={data.userName}
            exp={data.exp}
            xDSTL={data.xDSTL}
          />
        ))}
      </div>
    </div>
  )
}

export default RankList
