const MarketVolumeBar = ({ fill, percentage } : {fill: string, percentage: number}) => {
  return (
    <div className="w-full h-[6px] relative">
      <span className={`rounded-[6px] h-[6px] block ${fill} opacity-40 relative`}></span>
      <span className={`w-full h-[6px] absolute left-0 top-0 rounded-[6px] ${fill}`} style={{ width: `${percentage}%`}}></span>
    </div>
  )
}

export default MarketVolumeBar;