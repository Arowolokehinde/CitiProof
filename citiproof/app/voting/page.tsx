"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Vote, Trophy, Users, CheckCircle, Clock } from "lucide-react"
import Link from "next/link"

export default function CommunityVotingPage() {
  const [votedProjects, setVotedProjects] = useState<number[]>([])

  const projects = [
    {
      id: 1,
      ens: "tamale-road.eth",
      title: "Tamale Road Construction",
      description: "Major road infrastructure development connecting Tamale to surrounding communities",
      votes: 250,
      fundingGoal: 400,
      status: "voting",
      priority: 1,
    },
    {
      id: 2,
      ens: "kumasi-hospital.eth",
      title: "Kumasi Regional Hospital Expansion",
      description: "Expansion of medical facilities and equipment for better healthcare access",
      votes: 189,
      fundingGoal: 600,
      status: "voting",
      priority: 2,
    },
    {
      id: 3,
      ens: "accra-school.eth",
      title: "Accra Primary School Renovation",
      description: "Renovation and modernization of educational facilities in Accra district",
      votes: 156,
      fundingGoal: 200,
      status: "voting",
      priority: 3,
    },
    {
      id: 4,
      ens: "cape-coast-water.eth",
      title: "Cape Coast Water Treatment Plant",
      description: "New water treatment facility to improve clean water access for coastal communities",
      votes: 134,
      fundingGoal: 350,
      status: "voting",
      priority: 4,
    },
  ]

  const handleVote = (projectId: number) => {
    if (!votedProjects.includes(projectId)) {
      setVotedProjects([...votedProjects, projectId])
    }
  }

  const topProjects = [...projects].sort((a, b) => b.votes - a.votes).slice(0, 3)

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
            Community Portal
          </Badge>
        </div>
      </nav>

      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="font-bold text-3xl text-gray-900 mb-2">Community Voting</h1>
            <p className="text-gray-600">Vote for government projects that matter most to your community</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Project Cards */}
            <div className="lg:col-span-2 space-y-6">
              {projects.map((project) => (
                <Card key={project.id} className="shadow-lg">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="flex items-center space-x-2 mb-2">
                          <span className="text-ens-blue">{project.ens}</span>
                          {project.priority === 1 && (
                            <Badge className="bg-amber-warning text-white">
                              <Trophy className="w-3 h-3 mr-1" />
                              Leading
                            </Badge>
                          )}
                        </CardTitle>
                        <h3 className="font-semibold text-lg text-gray-900 mb-2">{project.title}</h3>
                        <CardDescription className="text-base">{project.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Community Support:</span>
                        <span className="font-semibold text-ens-blue">{project.votes} votes</span>
                      </div>
                      <Progress value={(project.votes / 300) * 100} className="h-2" />

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Funding Goal:</span>
                        <span className="font-semibold">{project.fundingGoal} ETH</span>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">Voting ends in 5 days</span>
                        </div>
                        <Button
                          onClick={() => handleVote(project.id)}
                          disabled={votedProjects.includes(project.id)}
                          className={`${
                            votedProjects.includes(project.id)
                              ? "bg-civic-green hover:bg-civic-green text-white"
                              : "bg-ens-blue hover:bg-ens-blue/90 text-white"
                          }`}
                        >
                          {votedProjects.includes(project.id) ? (
                            <>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Voted
                            </>
                          ) : (
                            <>
                              <Vote className="w-4 h-4 mr-2" />
                              Vote Now
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Right Column - Leaderboard */}
            <div className="space-y-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5 text-amber-warning" />
                    <span>Project Leaderboard</span>
                  </CardTitle>
                  <CardDescription>Top projects by community votes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topProjects.map((project, index) => (
                      <div
                        key={project.id}
                        className={`p-4 rounded-lg border-2 ${
                          index === 0 ? "border-civic-green bg-civic-green/5" : "border-gray-200 bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                              index === 0
                                ? "bg-civic-green text-white"
                                : index === 1
                                  ? "bg-gray-400 text-white"
                                  : "bg-amber-600 text-white"
                            }`}
                          >
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900 text-sm">{project.ens}</p>
                            <p className="text-xs text-gray-600">{project.title}</p>
                            <p className="text-xs font-medium text-ens-blue">{project.votes} votes</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-ens-blue" />
                    <span>Voting Stats</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Total Voters:</span>
                      <span className="font-semibold">1,247</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Active Projects:</span>
                      <span className="font-semibold">{projects.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Your Votes:</span>
                      <span className="font-semibold text-ens-blue">{votedProjects.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Votes Remaining:</span>
                      <span className="font-semibold text-civic-green">{3 - votedProjects.length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg bg-ens-blue text-white">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">How Voting Works</h3>
                  <ul className="text-sm space-y-2 text-blue-100">
                    <li>• Each verified citizen gets 3 votes</li>
                    <li>• Vote for projects that matter to you</li>
                    <li>• Top projects get priority funding</li>
                    <li>• Voting is transparent and immutable</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
