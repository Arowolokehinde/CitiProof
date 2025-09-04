"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, Trash2, Building, Wallet, Calendar, Target } from "lucide-react"
import Link from "next/link"

export default function ProjectPostingPage() {
  const [milestones, setMilestones] = useState([
    { id: 1, title: "Planning & Design", description: "Initial project planning and design phase", budget: "100" },
    { id: 2, title: "Execution", description: "Main construction and implementation", budget: "300" },
    { id: 3, title: "Audit & Completion", description: "Final audit and project completion", budget: "100" },
  ])

  const addMilestone = () => {
    const newId = Math.max(...milestones.map((m) => m.id)) + 1
    setMilestones([...milestones, { id: newId, title: "", description: "", budget: "" }])
  }

  const removeMilestone = (id: number) => {
    setMilestones(milestones.filter((m) => m.id !== id))
  }

  const updateMilestone = (id: number, field: string, value: string) => {
    setMilestones(milestones.map((m) => (m.id === id ? { ...m, [field]: value } : m)))
  }

  const totalBudget = milestones.reduce((sum, m) => sum + (Number.parseFloat(m.budget) || 0), 0)

  return (
    <div className="min-h-screen bg-neutral-gray">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-ens-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CP</span>
              </div>
              <span className="font-bold text-xl text-gray-900">CitiProof</span>
            </div>
          </div>
          <Badge variant="outline" className="text-ens-blue border-ens-blue">
            Government Portal
          </Badge>
        </div>
      </nav>

      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="font-bold text-3xl text-gray-900 mb-2">Project Posting</h1>
            <p className="text-gray-600">
              Register a new government project for transparent tracking and citizen oversight
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Form */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building className="w-5 h-5 text-ens-blue" />
                  <span>Project Details</span>
                </CardTitle>
                <CardDescription>Fill in the project information for blockchain registration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-ens-blue font-medium">
                    Project Title
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g., Accra Road Infrastructure Development"
                    className="border-gray-300 focus:border-ens-blue focus:ring-ens-blue"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ens-name" className="text-ens-blue font-medium">
                    ENS Project Name
                  </Label>
                  <div className="flex">
                    <Input
                      id="ens-name"
                      placeholder="accra-road"
                      className="border-gray-300 focus:border-ens-blue focus:ring-ens-blue rounded-r-none"
                    />
                    <div className="bg-gray-100 border border-l-0 border-gray-300 px-3 py-2 rounded-r-md text-gray-600">
                      .citiproof.eth
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-ens-blue font-medium">
                    Project Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Detailed description of the project objectives, scope, and expected outcomes..."
                    className="border-gray-300 focus:border-ens-blue focus:ring-ens-blue min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ministry" className="text-ens-blue font-medium">
                    Ministry/Department ENS
                  </Label>
                  <Input
                    id="ministry"
                    placeholder="roads-ministry.ghana.eth"
                    className="border-gray-300 focus:border-ens-blue focus:ring-ens-blue"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-ens-blue font-medium">Project Milestones</Label>
                    <Button
                      onClick={addMilestone}
                      size="sm"
                      variant="outline"
                      className="border-ens-blue text-ens-blue hover:bg-ens-blue hover:text-white bg-transparent"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Milestone
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {milestones.map((milestone) => (
                      <div key={milestone.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <Input
                            placeholder="Milestone title"
                            value={milestone.title}
                            onChange={(e) => updateMilestone(milestone.id, "title", e.target.value)}
                            className="flex-1 mr-2 border-gray-300 focus:border-ens-blue focus:ring-ens-blue"
                          />
                          <Button
                            onClick={() => removeMilestone(milestone.id)}
                            size="sm"
                            variant="ghost"
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <Textarea
                          placeholder="Milestone description"
                          value={milestone.description}
                          onChange={(e) => updateMilestone(milestone.id, "description", e.target.value)}
                          className="border-gray-300 focus:border-ens-blue focus:ring-ens-blue"
                        />
                        <div className="flex items-center space-x-2">
                          <Label className="text-sm text-gray-600">Budget (ETH):</Label>
                          <Input
                            type="number"
                            placeholder="0"
                            value={milestone.budget}
                            onChange={(e) => updateMilestone(milestone.id, "budget", e.target.value)}
                            className="w-24 border-gray-300 focus:border-ens-blue focus:ring-ens-blue"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-ens-blue hover:bg-ens-blue/90 text-white px-8">Register Project</Button>
                </div>
              </CardContent>
            </Card>

            {/* Right Column - Preview */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-civic-green" />
                  <span>Project Preview</span>
                </CardTitle>
                <CardDescription>How your project will appear on the blockchain</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-xl text-gray-900">accra-road.citiproof.eth</h3>
                    <Badge className="bg-ens-blue text-white">Registered</Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Wallet className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Total Funding Goal:</span>
                      <span className="font-semibold text-ens-blue">{totalBudget} ETH</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Building className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Ministry:</span>
                      <span className="font-medium">roads-ministry.ghana.eth</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Status:</span>
                      <Badge variant="outline" className="text-amber-warning border-amber-warning">
                        Pending
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Project Milestones</h4>
                  <div className="space-y-3">
                    {milestones.map((milestone, index) => (
                      <div
                        key={milestone.id}
                        className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg"
                      >
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{milestone.title || `Milestone ${index + 1}`}</p>
                          <p className="text-sm text-gray-600">{milestone.description || "No description provided"}</p>
                          <p className="text-sm text-ens-blue font-medium">Budget: {milestone.budget || "0"} ETH</p>
                        </div>
                        <Badge variant="outline" className="text-amber-warning border-amber-warning">
                          Pending
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-civic-green/10 border border-civic-green/20 rounded-lg p-4">
                  <h4 className="font-semibold text-civic-green mb-2">Transparency Features</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Real-time fund tracking</li>
                    <li>• Citizen verification system</li>
                    <li>• Immutable milestone records</li>
                    <li>• Public audit trail</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
