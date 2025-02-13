import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ArrowUpDown } from "lucide-react"
import { useNavigate } from 'react-router-dom'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { AgentCard } from "@/components/AgentCard"

interface Agent {
  name: string
  telegram?: string
  twitter?: string
  marketCap: string
  marketCapValue: number
  photo: string
  description: string
  createdAt: Date
  bumpCount: number
}

const agents: Agent[] = [
  {
    name: "Agent 1",
    telegram: "https://t.me/agent1",
    twitter: "https://twitter.com/agent1",
    marketCap: "$1.2M",
    marketCapValue: 1200000,
    photo: "https://placehold.co/400x400/1a1a1a/ffffff?text=Agent+1",
    description: "A powerful AI agent specialized in market analysis and trading strategies.",
    createdAt: new Date('2024-03-15'),
    bumpCount: 25
  },
  {
    name: "Agent 2",
    telegram: "https://t.me/agent2",
    marketCap: "$800K",
    marketCapValue: 800000,
    photo: "https://placehold.co/400x400/1a1a1a/ffffff?text=Agent+2",
    description: "Expert in blockchain technology and smart contract development.",
    createdAt: new Date('2024-03-15'),
    bumpCount: 20
  },
  {
    name: "Agent 3",
    telegram: "https://t.me/agent3",
    twitter: "https://twitter.com/agent3",
    marketCap: "$2.1M",
    marketCapValue: 2100000,
    photo: "https://placehold.co/400x400/1a1a1a/ffffff?text=Agent+3",
    description: "Specialized in DeFi protocols and yield optimization.",
    createdAt: new Date('2024-03-15'),
    bumpCount: 25
  },
  {
    name: "Agent 4",
    telegram: "https://t.me/agent4",
    marketCap: "$1.5M",
    marketCapValue: 1500000,
    photo: "https://placehold.co/400x400/1a1a1a/ffffff?text=Agent+4",
    description: "NFT market analysis and trading strategies.",
    createdAt: new Date('2024-03-15'),
    bumpCount: 20
  },
  {
    name: "Agent 5",
    telegram: "https://t.me/agent5",
    twitter: "https://twitter.com/agent5",
    marketCap: "$900K",
    marketCapValue: 900000,
    photo: "https://placehold.co/400x400/1a1a1a/ffffff?text=Agent+5",
    description: "Cryptocurrency market trends and analysis.",
    createdAt: new Date('2024-03-15'),
    bumpCount: 20
  },
  {
    name: "Agent 6",
    telegram: "https://t.me/agent6",
    marketCap: "$1.8M",
    marketCapValue: 1800000,
    photo: "https://placehold.co/400x400/1a1a1a/ffffff?text=Agent+6",
    description: "AI-powered trading bot with advanced algorithms.",
    createdAt: new Date('2024-03-15'),
    bumpCount: 25
  },
  {
    name: "Agent 7",
    telegram: "https://t.me/agent7",
    twitter: "https://twitter.com/agent7",
    marketCap: "$2.5M",
    marketCapValue: 2500000,
    photo: "https://placehold.co/400x400/1a1a1a/ffffff?text=Agent+7",
    description: "Cross-chain bridge optimization specialist.",
    createdAt: new Date('2024-03-15'),
    bumpCount: 25
  },
  {
    name: "Agent 8",
    telegram: "https://t.me/agent8",
    marketCap: "$1.3M",
    marketCapValue: 1300000,
    photo: "https://placehold.co/400x400/1a1a1a/ffffff?text=Agent+8",
    description: "Liquidity pool management and yield farming expert.",
    createdAt: new Date('2024-03-15'),
    bumpCount: 20
  },
  {
    name: "Agent 9",
    telegram: "https://t.me/agent9",
    twitter: "https://twitter.com/agent9",
    marketCap: "$1.7M",
    marketCapValue: 1700000,
    photo: "https://placehold.co/400x400/1a1a1a/ffffff?text=Agent+9",
    description: "Arbitrage opportunities finder across DEXs.",
    createdAt: new Date('2024-03-15'),
    bumpCount: 20
  },
  {
    name: "Agent 10",
    telegram: "https://t.me/agent10",
    marketCap: "$2.2M",
    marketCapValue: 2200000,
    photo: "https://placehold.co/400x400/1a1a1a/ffffff?text=Agent+10",
    description: "Smart contract security analysis specialist.",
    createdAt: new Date('2024-03-15'),
    bumpCount: 25
  },
  {
    name: "Agent 11",
    telegram: "https://t.me/agent11",
    twitter: "https://twitter.com/agent11",
    marketCap: "$1.6M",
    marketCapValue: 1600000,
    photo: "https://placehold.co/400x400/1a1a1a/ffffff?text=Agent+11",
    description: "Governance proposal analyzer and voter.",
    createdAt: new Date('2024-03-15'),
    bumpCount: 20
  },
  {
    name: "Agent 12",
    telegram: "https://t.me/agent12",
    marketCap: "$1.9M",
    marketCapValue: 1900000,
    photo: "https://placehold.co/400x400/1a1a1a/ffffff?text=Agent+12",
    description: "MEV protection and frontrunning detection.",
    createdAt: new Date('2024-03-15'),
    bumpCount: 20
  },
  {
    name: "Agent 13",
    telegram: "https://t.me/agent13",
    twitter: "https://twitter.com/agent13",
    marketCap: "$2.3M",
    marketCapValue: 2300000,
    photo: "https://placehold.co/400x400/1a1a1a/ffffff?text=Agent+13",
    description: "On-chain data analysis and pattern recognition.",
    createdAt: new Date('2024-03-15'),
    bumpCount: 25
  },
  {
    name: "Agent 14",
    telegram: "https://t.me/agent14",
    marketCap: "$1.4M",
    marketCapValue: 1400000,
    photo: "https://placehold.co/400x400/1a1a1a/ffffff?text=Agent+14",
    description: "Gas optimization and transaction timing specialist.",
    createdAt: new Date('2024-03-15'),
    bumpCount: 20
  },
  {
    name: "Agent 15",
    telegram: "https://t.me/agent15",
    twitter: "https://twitter.com/agent15",
    marketCap: "$2.0M",
    marketCapValue: 2000000,
    photo: "https://placehold.co/400x400/1a1a1a/ffffff?text=Agent+15",
    description: "Token launch and IDO participation expert.",
    createdAt: new Date('2024-03-15'),
    bumpCount: 20
  }
]

type SortOption = 'bump' | 'marketCap' | 'created'

function HomePage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('marketCap')

  const filteredAndSortedAgents = agents
    .filter(agent => 
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'bump':
          return b.bumpCount - a.bumpCount
        case 'marketCap':
          return b.marketCapValue - a.marketCapValue
        case 'created':
          return b.createdAt.getTime() - a.createdAt.getTime()
        default:
          return 0
      }
    })

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Half */}
      <div className="flex-1 min-h-[50vh] flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">$MAIAR x $CUBIE</h1>
        <Button 
          className="text-sm" 
          variant="outline"
          onClick={() => navigate('/launch')}
        >
          Launch an agent
        </Button>
      </div>

      {/* Bottom Half */}
      <div className="min-h-[50vh] bg-background/50 backdrop-blur-sm p-4 md:p-8">
        <div className="max-w-[1800px] mx-auto">
          {/* Filter Section */}
          <div className="mb-6 flex flex-col sm:flex-row items-start gap-4">
            <div className="relative w-full sm:w-[500px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search agents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="w-full sm:w-48">
              <Select
                value={sortBy}
                onValueChange={(value) => setSortBy(value as SortOption)}
              >
                <SelectTrigger>
                  <div className="flex items-center gap-2">
                    <ArrowUpDown className="h-4 w-4" />
                    <SelectValue placeholder="Sort by" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bump">Bump Order</SelectItem>
                  <SelectItem value="marketCap">Market Cap</SelectItem>
                  <SelectItem value="created">Recently Created</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Agents Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {filteredAndSortedAgents.map((agent, index) => (
              <AgentCard 
                key={index}
                name={agent.name}
                telegram={agent.telegram}
                twitter={agent.twitter}
                marketCap={agent.marketCap}
                photo={agent.photo}
                description={agent.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage 