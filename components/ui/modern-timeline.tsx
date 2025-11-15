"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Circle, Clock } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/domains/shared/utils/cn";

export interface TimelineItem {
  title: string;
  description: string;
  date?: string;
  image?: string;
  status?: "completed" | "current" | "upcoming";
  category?: string;
}

export interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

const STATUS_CONFIG = {
  completed: {
    progressColor: "bg-emerald-500",
    borderColor: "border-emerald-500/25",
    badgeBg: "bg-emerald-500/10",
    badgeText: "text-emerald-300",
  },
  current: {
    progressColor: "bg-siso-orange",
    borderColor: "border-siso-orange/30",
    badgeBg: "bg-siso-orange/10",
    badgeText: "text-siso-orange",
  },
  upcoming: {
    progressColor: "bg-slate-500",
    borderColor: "border-slate-500/20",
    badgeBg: "bg-slate-500/10",
    badgeText: "text-slate-400",
  },
};

const getStatusConfig = (status: TimelineItem["status"]) =>
  STATUS_CONFIG[status || "upcoming"] ?? STATUS_CONFIG.upcoming;

const getStatusIcon = (status: TimelineItem["status"]) => {
  switch (status) {
    case "completed":
      return CheckCircle;
    case "current":
      return Clock;
    default:
      return Circle;
  }
};

export function Timeline({ items, className }: TimelineProps) {
  if (!items || items.length === 0) {
    return (
      <div className={cn("w-full max-w-3xl mx-auto px-4 sm:px-6 py-8", className)}>
        <p className="text-center text-muted-foreground">No timeline items to display.</p>
      </div>
    );
  }

  return (
    <section
      className={cn("w-full max-w-3xl mx-auto px-4 sm:px-6 py-4", className)}
      role="list"
      aria-label="Timeline of product updates"
    >
      <div className="relative">
        <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-siso-border" aria-hidden="true" />
        <motion.div
          className="absolute left-4 sm:left-6 top-0 w-px bg-siso-orange origin-top"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1, transition: { duration: 1.1, ease: "easeOut", delay: 0.2 } }}
          viewport={{ once: true }}
          aria-hidden="true"
        />

        <div className="space-y-8 sm:space-y-10 relative">
          {items.map((item, index) => {
            const config = getStatusConfig(item.status);
            const IconComponent = getStatusIcon(item.status);

            return (
              <motion.div
                key={`${item.title}-${index}`}
                className="relative"
                initial={{ opacity: 0, y: 32, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, delay: index * 0.08 } }}
                viewport={{ once: true, margin: "-40px" }}
                role="listitem"
              >
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="relative flex-shrink-0">
                    <motion.div whileHover={{ scale: 1.05 }} className="relative">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-siso-bg shadow-lg">
                        {item.image ? (
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
                        ) : (
                          <div className="w-full h-full bg-siso-bg-tertiary flex items-center justify-center">
                            <IconComponent className="w-5 h-5 text-siso-text-muted" aria-hidden="true" />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </div>

                  <motion.div className="flex-1 min-w-0" whileHover={{ y: -2 }}>
                    <Card className={cn("border bg-siso-bg-secondary/80 backdrop-blur-md", config.borderColor)}>
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <motion.h3 className="text-lg font-semibold text-siso-text-primary" layoutId={`timeline-title-${index}`}>
                              {item.title}
                            </motion.h3>
                            <div className="flex flex-wrap items-center gap-2 text-xs text-siso-text-muted">
                              {item.category && <span className="font-semibold uppercase tracking-wide">{item.category}</span>}
                              {item.category && item.date && <span className="w-1 h-1 rounded-full bg-siso-text-muted" aria-hidden="true" />}
                              {item.date && (
                                <time dateTime={item.date} className="text-siso-text-muted/80">
                                  {item.date}
                                </time>
                              )}
                            </div>
                          </div>
                          <Badge className={cn("w-fit text-xs font-semibold", config.badgeBg, config.badgeText)}>
                            {item.status ? item.status.charAt(0).toUpperCase() + item.status.slice(1) : "Upcoming"}
                          </Badge>
                        </div>

                        <p className="mt-3 text-sm text-siso-text-muted leading-relaxed">{item.description}</p>

                        <div
                          className="mt-4 h-1 bg-siso-border rounded-full overflow-hidden"
                          role="progressbar"
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-valuenow={item.status === "completed" ? 100 : item.status === "current" ? 60 : 20}
                        >
                          <motion.div
                            className={cn("h-full rounded-full", config.progressColor)}
                            initial={{ width: 0 }}
                            whileInView={{ width: item.status === "completed" ? "100%" : item.status === "current" ? "60%" : "20%" }}
                            transition={{ duration: 1, delay: index * 0.1 + 0.4, ease: "easeOut" }}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
