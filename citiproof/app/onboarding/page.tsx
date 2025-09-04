"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Wallet, Shield, Globe, Copy, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CitizenOnboarding() {
  const [currentStep, setCurrentStep] = useState(1)
  const [walletConnected, setWalletConnected] = useState(false)
  const [efpVerified, setEfpVerified] = useState(false)
  const [ensGenerated, setEnsGenerated] = useState(false)

  const steps = [
    { id: 1, title: "Connect Wallet", icon: Wallet, completed: walletConnected },
    { id: 2, title: "EFP Verification", icon: Shield, completed: efpVerified },
    { id: 3, title: "ENS Subname", icon: Globe, completed: ensGenerated },
  ]

  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100

  const handleWalletConnect = () => {
    setWalletConnected(true)
    setCurrentStep(2)
  }

  const handleEfpVerify = () => {
    setEfpVerified(true)
    setCurrentStep(3)
  }

  const handleEnsGenerate = () => {
    setEnsGenerated(true)
  }

  const isOnboardingComplete = walletConnected && efpVerified && ensGenerated

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#3D7EFF] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CP</span>
              </div>
              <span className="font-bold text-xl text-gray-900">CitiProof</span>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Wallet className="w-4 h-4 mr-2" />
            Connect Wallet
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-bold text-2xl text-gray-900 mb-2">Welcome to CitiProof</h1>
            <p className="text-base text-gray-700">Complete your citizen onboarding in 3 simple steps</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      step.completed
                        ? "bg-[#27AE60] border-[#27AE60] text-white"
                        : currentStep === step.id
                          ? "bg-[#3D7EFF] border-[#3D7EFF] text-white"
                          : "bg-white border-gray-300 text-gray-500"
                    }`}
                  >
                    {step.completed ? <CheckCircle className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-20 h-0.5 mx-4 ${step.completed ? "bg-[#27AE60]" : "bg-gray-300"}`} />
                  )}
                </div>
              ))}
            </div>
            <Progress
              value={progressPercentage}
              className="h-2"
              style={
                {
                  "--progress-background": "#3D7EFF",
                } as React.CSSProperties
              }
            />
          </div>

          {/* Onboarding Cards */}
          <div className="space-y-6">
            {/* Step 1: Wallet Connection */}
            <Card className="rounded-2xl shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        walletConnected ? "bg-[#27AE60]" : "bg-[#3D7EFF]"
                      }`}
                    >
                      {walletConnected ? (
                        <CheckCircle className="w-5 h-5 text-white" />
                      ) : (
                        <Wallet className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-lg">Connect Your Wallet</CardTitle>
                      <CardDescription>Link your Ethereum wallet to get started</CardDescription>
                    </div>
                  </div>
                  {walletConnected && (
                    <Badge className="bg-[#27AE60] text-white hover:bg-[#27AE60]/90">Connected</Badge>
                  )}
                </div>
              </CardHeader>
              {!walletConnected && (
                <CardContent>
                  <Button
                    onClick={handleWalletConnect}
                    className="w-full bg-[#3D7EFF] hover:bg-[#3D7EFF]/90 text-white rounded-xl"
                  >
                    <Wallet className="w-4 h-4 mr-2" />
                    Connect Wallet
                  </Button>
                </CardContent>
              )}
            </Card>

            {/* Step 2: EFP Verification */}
            <Card className="rounded-2xl shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        efpVerified ? "bg-[#27AE60]" : currentStep >= 2 ? "bg-[#3D7EFF]" : "bg-gray-300"
                      }`}
                    >
                      {efpVerified ? (
                        <CheckCircle className="w-5 h-5 text-white" />
                      ) : (
                        <Shield className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-lg">EFP Verification</CardTitle>
                      <CardDescription>Verify your identity through Ethereum Follow Protocol</CardDescription>
                    </div>
                  </div>
                  <Badge
                    className={`${
                      efpVerified
                        ? "bg-[#27AE60] text-white hover:bg-[#27AE60]/90"
                        : "bg-red-500 text-white hover:bg-red-500/90"
                    }`}
                  >
                    {efpVerified ? "Verified" : "Not Verified"}
                  </Badge>
                </div>
              </CardHeader>
              {currentStep >= 2 && !efpVerified && (
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">
                      Complete EFP verification to prove your identity and build trust in the CitiProof network.
                    </p>
                    <Button
                      onClick={handleEfpVerify}
                      className="w-full bg-[#3D7EFF] hover:bg-[#3D7EFF]/90 text-white rounded-xl"
                      disabled={!walletConnected}
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Start EFP Verification
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Step 3: ENS Subname Generator */}
            <Card className="rounded-2xl shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        ensGenerated ? "bg-[#27AE60]" : currentStep >= 3 ? "bg-[#3D7EFF]" : "bg-gray-300"
                      }`}
                    >
                      {ensGenerated ? (
                        <CheckCircle className="w-5 h-5 text-white" />
                      ) : (
                        <Globe className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-lg">ENS Subname</CardTitle>
                      <CardDescription>Get your unique CitiProof identity</CardDescription>
                    </div>
                  </div>
                  {ensGenerated && <Badge className="bg-[#27AE60] text-white hover:bg-[#27AE60]/90">Generated</Badge>}
                </div>
              </CardHeader>
              {currentStep >= 3 && (
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500 uppercase font-medium mb-1">Your ENS Subname</p>
                          <p className="font-mono text-lg text-gray-900">ama.citiproof.eth</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    {!ensGenerated && (
                      <Button
                        onClick={handleEnsGenerate}
                        className="w-full bg-[#3D7EFF] hover:bg-[#3D7EFF]/90 text-white rounded-xl"
                        disabled={!efpVerified}
                      >
                        <Globe className="w-4 h-4 mr-2" />
                        Generate ENS Subname
                      </Button>
                    )}
                  </div>
                </CardContent>
              )}
            </Card>
          </div>

          {/* Complete Onboarding CTA */}
          <div className="mt-8">
            <Button
              className={`w-full py-6 text-lg rounded-xl ${
                isOnboardingComplete
                  ? "bg-[#3D7EFF] hover:bg-[#3D7EFF]/90 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!isOnboardingComplete}
            >
              {isOnboardingComplete ? "Complete Onboarding" : "Complete All Steps Above"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
