import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';

export type DeAreaProps = {
  color?: string,
  tip?: boolean,
  data: Object[],
  xKey: any,
}

// Up: #00c087, Down: #f63d3d
const DeArea = ({ color='#00c087', tip=true, data=[], xKey }: DeAreaProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="colorGr" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.6}/>
            <stop offset="95%" stopColor={color} stopOpacity={0}/>
          </linearGradient>
        </defs>
        { tip && <Tooltip />}
        <Area type="monotone" dataKey={xKey} stroke={color} fillOpacity={1} fill="url(#colorGr)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default DeArea
