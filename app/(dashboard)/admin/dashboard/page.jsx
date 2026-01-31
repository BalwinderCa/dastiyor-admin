"use client";

import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import ImageBlock1 from "@/components/partials/widget/block/image-block-1";
import GroupChart1 from "@/components/partials/widget/chart/group-chart-1";
import RevenueBarChart from "@/components/partials/widget/chart/revenue-bar-chart";
import RadialsChart from "@/components/partials/widget/chart/radials";
import SelectMonth from "@/components/partials/SelectMonth";
import CompanyTable from "@/components/partials/table/company-table";
import RecentActivity from "@/components/partials/widget/recent-activity";
import RadarChart from "@/components/partials/widget/chart/radar-chart";
import HomeBredCurbs from "@/components/partials/HomeBredCurbs";
import Icon from "@/components/ui/Icon";

const MostSales = dynamic(
  () => import("@/components/partials/widget/most-sales"),
  { ssr: false }
);

export default function AdminDashboard() {
  const [filterMap, setFilterMap] = useState("usa");
  const [stats, setStats] = useState(null);
  const [statsError, setStatsError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/stats")
      .then((r) => r.ok ? r.json() : Promise.reject(new Error(r.statusText)))
      .then((data) => { if (!cancelled) setStats(data); })
      .catch((e) => { if (!cancelled) setStatsError(e.message); });
    return () => { cancelled = true; };
  }, []);

  return (
    <div>
      <HomeBredCurbs title="Dashboard (Analytics)" />
      {/* Live counts from shared website database */}
      <Card title="Live from shared database" className="mb-5">
        {statsError && (
          <p className="text-danger text-sm mb-3">
            Could not load stats. Set .env DATABASE_URL to the same DB as your website.
          </p>
        )}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm mb-1">
                <Icon icon="heroicons-outline:users" /> Users
              </div>
              <div className="text-xl font-semibold text-slate-900 dark:text-white">{stats.users}</div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm mb-1">
                <Icon icon="heroicons-outline:clipboard-document-list" /> Tasks
              </div>
              <div className="text-xl font-semibold text-slate-900 dark:text-white">{stats.tasks}</div>
              <div className="text-xs text-slate-500 mt-1">{stats.tasksOpen} open · {stats.tasksCompleted} done</div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm mb-1">
                <Icon icon="heroicons-outline:star" /> Reviews
              </div>
              <div className="text-xl font-semibold text-slate-900 dark:text-white">{stats.reviews}</div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm mb-1">
                <Icon icon="heroicons-outline:credit-card" /> Active subs
              </div>
              <div className="text-xl font-semibold text-slate-900 dark:text-white">{stats.subscriptionsActive}</div>
            </div>
          </div>
        )}
        {!stats && !statsError && <p className="text-slate-500 text-sm">Loading…</p>}
      </Card>
      <div className="grid grid-cols-12 gap-5 mb-5">
        <div className="2xl:col-span-3 lg:col-span-4 col-span-12">
          <ImageBlock1 />
        </div>
        <div className="2xl:col-span-9 lg:col-span-8 col-span-12">
          <Card bodyClass="p-4">
            <div className="grid md:grid-cols-3 col-span-1 gap-4">
              <GroupChart1 />
            </div>
          </Card>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-5">
        <div className="lg:col-span-8 col-span-12">
          <Card>
            <div className="legend-ring">
              <RevenueBarChart />
            </div>
          </Card>
        </div>
        <div className="lg:col-span-4 col-span-12">
          <Card title="Overview" headerslot={<SelectMonth />}>
            <RadialsChart />
          </Card>
        </div>
        <div className="lg:col-span-8 col-span-12">
          <Card title="All Company" headerslot={<SelectMonth />} noborder>
            <CompanyTable />
          </Card>
        </div>
        <div className="lg:col-span-4 col-span-12">
          <Card title="Recent Activity" headerslot={<SelectMonth />}>
            <RecentActivity />
          </Card>
        </div>
        <div className="lg:col-span-8 col-span-12">
          <Card
            title="Most Sales"
            headerslot={
              <div className="border border-slate-200 dark:border-slate-700 dark:bg-slate-900 rounded p-1 flex items-center">
                <span
                  className={`flex-1 text-sm font-normal px-3 py-1 transition-all duration-150 rounded cursor-pointer ${
                    filterMap === "global"
                      ? "bg-slate-900 text-white dark:bg-slate-700 dark:text-slate-300"
                      : "dark:text-slate-300"
                  }`}
                  onClick={() => setFilterMap("global")}
                >
                  Global
                </span>
                <span
                  className={`flex-1 text-sm font-normal px-3 py-1 rounded transition-all duration-150 cursor-pointer ${
                    filterMap === "usa"
                      ? "bg-slate-900 text-white dark:bg-slate-700 dark:text-slate-300"
                      : "dark:text-slate-300"
                  }`}
                  onClick={() => setFilterMap("usa")}
                >
                  USA
                </span>
              </div>
            }
          >
            <MostSales filterMap={filterMap} />
          </Card>
        </div>
        <div className="lg:col-span-4 col-span-12">
          <Card title="Overview" headerslot={<SelectMonth />}>
            <RadarChart />
            <div className="bg-slate-50 dark:bg-slate-900 rounded p-4 mt-8 flex justify-between flex-wrap">
              <div className="space-y-1">
                <h4 className="text-slate-600 dark:text-slate-200 text-xs font-normal">Invested amount</h4>
                <div className="text-sm font-medium text-slate-900 dark:text-white">$8264.35</div>
                <div className="text-slate-500 dark:text-slate-300 text-xs font-normal">+0.001.23 (0.2%)</div>
              </div>
              <div className="space-y-1">
                <h4 className="text-slate-600 dark:text-slate-200 text-xs font-normal">Invested amount</h4>
                <div className="text-sm font-medium text-slate-900 dark:text-white">$8264.35</div>
              </div>
              <div className="space-y-1">
                <h4 className="text-slate-600 dark:text-slate-200 text-xs font-normal">Invested amount</h4>
                <div className="text-sm font-medium text-slate-900 dark:text-white">$8264.35</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
