import { useMemo } from "react";
import { DollarSign, Users, TrendingUp, FolderKanban } from "lucide-react";
import { motion } from "framer-motion";
import MetricCard from "@/components/MetricCard";
import StatusBadge from "@/components/StatusBadge";
import { mockAlumni, mockProjects } from "@/api/mockData";

export default function DashboardPage() {
  const metrics = useMemo(() => {
    const totalValueRaised = mockProjects.reduce((sum, p) => sum + p.raisedAmount, 0);
    const totalAlumni = mockAlumni.length;
    const activeProjects = mockProjects.filter((p) => p.status === "active").length;
    const committedAlumni = mockAlumni.filter((a) => a.fundingStatus === "committed").length;
    return { totalValueRaised, totalAlumni, activeProjects, committedAlumni };
  }, []);

  const recentAlumni = useMemo(
    () => [...mockAlumni].sort((a, b) => b.lastContactDate.localeCompare(a.lastContactDate)).slice(0, 5),
    []
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of your alumni fund sourcing pipeline.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Value Raised"
          value={`$${(metrics.totalValueRaised / 1_000_000).toFixed(1)}M`}
          change="+12.5% from last quarter"
          changeType="positive"
          icon={DollarSign}
          delay={0}
        />
        <MetricCard
          title="Alumni Network"
          value={metrics.totalAlumni.toString()}
          change="+3 new this month"
          changeType="positive"
          icon={Users}
          delay={0.1}
        />
        <MetricCard
          title="Committed Donors"
          value={metrics.committedAlumni.toString()}
          change="30% conversion rate"
          changeType="neutral"
          icon={TrendingUp}
          delay={0.2}
        />
        <MetricCard
          title="Active Projects"
          value={metrics.activeProjects.toString()}
          icon={FolderKanban}
          delay={0.3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-lg"
        >
          <div className="p-5 border-b border-border">
            <h2 className="text-base font-semibold text-foreground">Recent Alumni Activity</h2>
          </div>
          <div className="divide-y divide-border">
            {recentAlumni.map((alumni) => (
              <div key={alumni.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-semibold">
                    {alumni.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{alumni.name}</p>
                    <p className="text-xs text-muted-foreground">{alumni.company} · {alumni.role}</p>
                  </div>
                </div>
                <StatusBadge status={alumni.fundingStatus} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Projects Overview */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-lg"
        >
          <div className="p-5 border-b border-border">
            <h2 className="text-base font-semibold text-foreground">Project Progress</h2>
          </div>
          <div className="divide-y divide-border">
            {mockProjects.map((project) => {
              const progress = (project.raisedAmount / project.targetAmount) * 100;
              return (
                <div key={project.id} className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">{project.name}</p>
                      <p className="text-xs text-muted-foreground">{project.alumniCount} alumni contributors</p>
                    </div>
                    <StatusBadge status={project.status} />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                      <span>${(project.raisedAmount / 1_000_000).toFixed(1)}M raised</span>
                      <span>${(project.targetAmount / 1_000_000).toFixed(1)}M goal</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(progress, 100)}%` }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="h-full bg-accent rounded-full"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
