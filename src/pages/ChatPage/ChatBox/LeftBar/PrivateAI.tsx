import AvatarContainer from "@components/AvatarContainer"
import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { FilledSearchIcon } from "@components/Icons/SearchIcon"
import { FilledUserIcon, FilledUsersPlusIcon } from "@components/Icons/UserIcon"

const PrivateAI: React.FC = () => {
  return (
    <div>
      <div className="my-4 h-[1px] w-full bg-mercury-100" />
      <div className="flex-items-center mb-4 justify-between px-2">
        <span className="text-base-14">Private AI Agents</span>
        <div className="flex-items-center gap-4">
          <FilledUsersPlusIcon />
          <FilledSearchIcon />
        </div>
      </div>

      <div className="hover-light-effect mb-1 gap-2 rounded-full px-2 py-2">
        <AvatarContainer
          badgeIcon={<FilledBrainAIIcon />}
          avatarUrl="https://i.pravatar.cc/150?u=a04258a2462d826712d"
          userName="Thuong Do"
          badgeColor="bg-yellow-10"
        />
      </div>
      <div className="hover-light-effect mb-1 gap-2 rounded-full px-2 py-2">
        <AvatarContainer
          badgeIcon={<FilledUserIcon size={18} />}
          avatarUrl="/src/assets/images/thuongdo.png"
          userName="Do Do"
          badgeColor="bg-[#0FE9A4]"
        />
      </div>
    </div>
  )
}
export default PrivateAI
