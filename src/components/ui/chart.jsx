import React, { useId, useContext, useMemo } from "react";
import * as Recharts from "recharts";
import { cn } from "@/lib/utils";

const THEMES = { light: "", dark: ".dark" };

const ChartContext = React.createContext(null);

export function useChart() {
  const context = useContext(ChartContext);
  if (!context) throw new Error("useChart must be used within a <ChartContainer />");
  return context;
}

const ChartContainer = React.forwardRef(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs",
          "[&_.recharts-cartesian-axis-tick_text]:text-muted-foreground",
          '[&_.recharts-cartesian-grid_line[stroke="#ccc"]]:stroke-border/50',
          "[&_.recharts-curve.recharts-tooltip-cursor]:stroke-border",
          '[&_.recharts-dot[stroke="#fff"]]:stroke-transparent',
          "[&_.recharts-layer]:fill-none",
          '[&_.recharts-polar-grid_[stroke="#ccc"]]:stroke-border',
          "[&_.recharts-radial-bar-background-sector]:fill-muted",
          "[&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted",
          '[&_.recharts-reference-line_[stroke="#ccc"]]:stroke-border',
          '[&_.recharts-sector[stroke="#fff"]]:stroke-transparent',
          "[&_.recharts-sector]:fill-none",
          "[&_.recharts-surface]:fill-none",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <Recharts.ResponsiveContainer>{children}</Recharts.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = "ChartContainer";

function ChartStyle({ id, config }) {
  const colorConfig = Object.entries(config || {}).filter(([, cfg]) => cfg.theme || cfg.color);
  if (!colorConfig.length) return null;

  const styles = Object.entries(THEMES)
    .map(([theme, prefix]) => {
      const rules = colorConfig
        .map(([key, itemConfig]) => {
          const color = (itemConfig.theme && itemConfig.theme[theme]) || itemConfig.color;
          return color ? `  --color-${key}: ${color};` : "";
        })
        .join("\n");
      return `${prefix} [data-chart="${id}"] {\n${rules}\n}`;
    })
    .join("\n");

  return <style dangerouslySetInnerHTML={{ __html: styles }} />;
}

const ChartTooltip = Recharts.Tooltip;

const ChartTooltipContent = React.forwardRef(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref
  ) => {
    const { config } = useChart();

    const tooltipLabel = useMemo(() => {
      if (hideLabel || !payload?.length) return null;
      const [item] = payload;
      const key = labelKey || item.dataKey || item.name || "value";
      const itemConfig = getPayloadConfig(config, item, key);
      const value = !labelKey && typeof label === "string" ? config[label]?.label || label : label;

      if (labelFormatter) {
        return <div className={cn("font-medium", labelClassName)}>{labelFormatter(value, payload)}</div>;
      }
      if (!value) return null;
      return <div className={cn("font-medium", labelClassName)}>{value}</div>;
    }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey]);

    if (!active || !payload?.length) return null;

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className
        )}
      >
        {tooltipLabel && <div className="grid gap-1.5">{tooltipLabel}</div>}
        {payload.map((item, index) => {
          const key = nameKey || item.name || item.dataKey || "value";
          const itemConfig = getPayloadConfig(config, item, key);
          const indicatorColor = color || item.payload.fill || item.color;

          return (
            <div
              key={item.dataKey || index}
              className={cn(
                "flex w-full flex-wrap items-center gap-2",
                "[&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground"
              )}
            >
              {!hideIndicator && (
                <div
                  className={cn(
                    "shrink-0 rounded-[2px]",
                    indicator === "dot" && "h-2.5 w-2.5",
                    indicator === "line" && "w-1 h-2.5",
                    indicator === "dashed" && "w-0 border-[1.5px] border-dashed bg-transparent my-0.5"
                  )}
                  style={{
                    backgroundColor: indicator === "dot" ? indicatorColor : "transparent",
                    borderColor: indicatorColor,
                  }}
                />
              )}
              <div className="flex flex-1 justify-between leading-none items-center">
                <span className="text-muted-foreground">{itemConfig?.label || item.name}</span>
                <span className="font-mono font-medium tabular-nums text-foreground">
                  {item.value?.toLocaleString?.() ?? item.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);
ChartTooltipContent.displayName = "ChartTooltipContent";

const ChartLegend = Recharts.Legend;

const ChartLegendContent = React.forwardRef(
  ({ className, hideIcon = false, payload, verticalAlign = "bottom", nameKey }, ref) => {
    const { config } = useChart();
    if (!payload?.length) return null;

    return (
      <div
        ref={ref}
        className={cn("flex items-center justify-center gap-4", verticalAlign === "top" ? "pb-3" : "pt-3", className)}
      >
        {payload.map((item, index) => {
          const key = nameKey || item.dataKey || "value";
          const itemConfig = getPayloadConfig(config, item, key);
          const color = item.color || item.payload?.fill;

          return (
            <div
              key={index}
              className="flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
            >
              {!hideIcon && <div className="h-2 w-2 shrink-0 rounded-[2px]" style={{ backgroundColor: color }} />}
              <span>{itemConfig?.label || item.value}</span>
            </div>
          );
        })}
      </div>
    );
  }
);
ChartLegendContent.displayName = "ChartLegendContent";

// Helper to find config
function getPayloadConfig(config, payload, key) {
  if (!payload || typeof payload !== "object") return undefined;
  const itemData = payload.payload || {};
  const possibleLabel =
    typeof payload[key] === "string" ? payload[key] : typeof itemData[key] === "string" ? itemData[key] : key;
  return config?.[possibleLabel];
}

export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartStyle };
