"use client";
import React, { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import GroupChart4 from "@/components/partials/widget/chart/group-chart-4";
import DonutChart from "@/components/partials/widget/chart/donut-chart";
import BasicArea from "@/components/partials/chart/appex-chart/BasicArea";
import RecentTasks from "@/components/partials/widget/recent-tasks";
import RecentUsers from "@/components/partials/widget/recent-users";
import HomeBredCurbs from "@/components/partials/HomeBredCurbs";
import { useTranslation } from "@/context/LanguageContext";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    let cancelled = false;
    async function fetchStats() {
      try {
        const res = await fetch("/api/stats");
        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${await res.text()}`);
        }
        const data = await res.json();
        if (!cancelled) {
          setStats(data);
          setLoading(false);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e.message);
          setLoading(false);
        }
      }
    }
    fetchStats();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return <div className="p-4 text-slate-500">Loading dashboard stats...</div>;
  }

  if (error) {
    return <div className="p-4 text-danger-500">Error loading stats: {error}</div>;
  }

  if (!stats) return null;

  return (
    <div className="space-y-5">
      <HomeBredCurbs title={t("dashboard.overview")} />

      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 space-y-5">
          <Card>
            <div className="grid grid-cols-12 gap-5">
              <div className="xl:col-span-8 col-span-12">
                <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3">
                  <GroupChart4 stats={stats} />
                </div>
              </div>

              <div className="xl:col-span-4 col-span-12">
                <div className="bg-slate-50 dark:bg-slate-900 rounded-md p-4">
                  <span className="block dark:text-slate-400 text-sm text-slate-600">
                    {t("dashboard.taskStatus")}
                  </span>
                  <DonutChart
                    series={[stats.tasksCompleted || 0, stats.tasksOpen || 0]}
                    labels={[t("dashboard.completed"), t("dashboard.open")]}
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card title={t("dashboard.taskActivity")}>
            <BasicArea
              height={310}
              series={[{ name: "Tasks Created", data: [12, 19, 15, 25, 32, 28, 40, 35, 50, 45, 60, 55] }]}
            />
          </Card>
        </div>

        <div className="lg:col-span-8 col-span-12">
          <Card title={t("dashboard.recentTasks")} noborder>
            <RecentTasks tasks={stats.recentTasks} />
          </Card>
        </div>

        <div className="lg:col-span-4 col-span-12">
          <Card title={t("dashboard.newestMembers")}>
            <RecentUsers users={stats.recentUsers} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
