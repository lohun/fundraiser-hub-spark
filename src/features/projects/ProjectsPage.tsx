import { motion } from "framer-motion";
import { Users, Calendar } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import { mockProjects } from "@/api/mockData";
import AddProjectModal from "./AddProjectModal";

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Projects</h1>
          <p className="text-muted-foreground mt-1">Track fund sourcing campaigns and their progress.</p>
        </div>
        <AddProjectModal />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockProjects.map((project, i) => {
          const progress = (project.raisedAmount / project.targetAmount) * 100;
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-lg p-5 space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-semibold text-foreground">{project.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                </div>
                <StatusBadge status={project.status} />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-mono font-medium text-foreground">
                    ${(project.raisedAmount / 1_000_000).toFixed(2)}M
                  </span>
                  <span className="text-muted-foreground">
                    of ${(project.targetAmount / 1_000_000).toFixed(1)}M
                  </span>
                </div>
                <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(progress, 100)}%` }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                    className="h-full bg-accent rounded-full"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1.5">{progress.toFixed(0)}% funded</p>
              </div>

              <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" /> {project.alumniCount} contributors
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> Started {new Date(project.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
