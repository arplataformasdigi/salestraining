import React from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Users,
  FileText,
  Book,
} from "lucide-react";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin" || user?.role === "manager";

  // Mock data for dashboard metrics
  const metrics = {
    completedSimulations: 28,
    inProgressPaths: 3,
    avgScore: 82,
    improvementRate: 12,
  };

  // Mock data for recent activities
  const recentActivities = [
    {
      id: 1,
      type: "simulation",
      title: "Cold Call Simulation",
      date: "2023-05-14T10:30:00",
      score: 85,
    },
    {
      id: 2,
      type: "training",
      title: "Objection Handling",
      date: "2023-05-12T14:45:00",
      score: 78,
    },
    {
      id: 3,
      type: "assessment",
      title: "SPIN Selling Techniques",
      date: "2023-05-10T11:15:00",
      score: 92,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {user?.name}</h1>
          <p className="text-gray-600">Here's an overview of your sales training progress</p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Completed Simulations</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.completedSimulations}</div>
              <p className="text-xs text-muted-foreground">
                +5 from last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Training Paths in Progress</CardTitle>
              <Book className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.inProgressPaths}</div>
              <p className="text-xs text-muted-foreground">
                1 path near completion
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <LineChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.avgScore}%</div>
              <p className="text-xs text-muted-foreground">
                +3% improvement
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Improvement Rate</CardTitle>
              <LineChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{metrics.improvementRate}%</div>
              <p className="text-xs text-muted-foreground">
                From baseline assessment
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      activity.type === "simulation" 
                        ? "bg-blue-100 text-blue-600" 
                        : activity.type === "training" 
                        ? "bg-green-100 text-green-600" 
                        : "bg-purple-100 text-purple-600"
                    }`}>
                      {activity.type === "simulation" && <FileText size={16} />}
                      {activity.type === "training" && <Book size={16} />}
                      {activity.type === "assessment" && <LineChart size={16} />}
                    </div>
                    <div>
                      <h3 className="font-medium">{activity.title}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(activity.date).toLocaleDateString('en-US', { 
                          day: 'numeric', 
                          month: 'short', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      activity.score >= 90 
                        ? "bg-green-100 text-green-800" 
                        : activity.score >= 75 
                        ? "bg-blue-100 text-blue-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {activity.score}% score
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Admin-specific section */}
        {isAdmin && (
          <Card>
            <CardHeader>
              <CardTitle>Team Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center p-6">
                <Users size={40} className="mx-auto text-gray-400 mb-2" />
                <h3 className="font-medium">Team Management</h3>
                <p className="text-gray-500 mb-4">
                  Access your team's performance and manage collaborators
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="font-semibold">15 Active Collaborators</h4>
                    <p className="text-sm text-gray-500">3 awaiting onboarding</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="font-semibold">4 Training Paths</h4>
                    <p className="text-sm text-gray-500">1 path needs review</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
