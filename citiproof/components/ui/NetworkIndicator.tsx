'use client'

import { useNetwork } from 'wagmi'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, CheckCircle } from 'lucide-react'

export function NetworkIndicator() {
  const { chain } = useNetwork()

  if (!chain) return null

  const isTestnet = chain.testnet
  const isSepolia = chain.id === 11155111

  return (
    <Badge 
      variant={isSepolia ? "default" : "destructive"}
      className={`${
        isSepolia 
          ? "bg-blue-100 text-blue-800 hover:bg-blue-200" 
          : "bg-orange-100 text-orange-800 hover:bg-orange-200"
      } flex items-center gap-1`}
    >
      {isSepolia ? (
        <CheckCircle className="w-3 h-3" />
      ) : (
        <AlertCircle className="w-3 h-3" />
      )}
      {chain.name}
      {isTestnet && " (Testnet)"}
    </Badge>
  )
}