import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
} from "@tanstack/react-table";
import { motion } from "framer-motion";
import { Search, ArrowUpDown } from "lucide-react";
import { alumniFilterSchema, type Alumni } from "@/api/schemas";
import { mockAlumni } from "@/api/mockData";
import StatusBadge from "@/components/StatusBadge";
import { useAppStore } from "@/store/appStore";
import AddAlumniModal from "./AddAlumniModal";

const columnHelper = createColumnHelper<Alumni>();

const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-semibold shrink-0">
          {info.getValue().split(" ").map((n) => n[0]).join("")}
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{info.getValue()}</p>
          <p className="text-xs text-muted-foreground">{info.row.original.email}</p>
        </div>
      </div>
    ),
  }),
  columnHelper.accessor("company", {
    header: "Company",
    cell: (info) => (
      <div>
        <p className="text-sm text-foreground">{info.getValue()}</p>
        <p className="text-xs text-muted-foreground">{info.row.original.role}</p>
      </div>
    ),
  }),
  columnHelper.accessor("graduationYear", {
    header: "Year",
    cell: (info) => <span className="text-sm text-muted-foreground">{info.getValue()}</span>,
  }),
  columnHelper.accessor("fundingStatus", {
    header: "Status",
    cell: (info) => <StatusBadge status={info.getValue()} />,
  }),
  columnHelper.accessor("totalContributed", {
    header: "Contributed",
    cell: (info) => (
      <span className="text-sm font-medium font-mono text-foreground">
        ${info.getValue().toLocaleString()}
      </span>
    ),
  }),
  columnHelper.accessor("location", {
    header: "Location",
    cell: (info) => <span className="text-sm text-muted-foreground">{info.getValue()}</span>,
  }),
];

const statusOptions = ["all", "active", "potential", "contacted", "committed", "inactive"] as const;

export default function AlumniRegistryPage() {
  const { alumniFilter, setAlumniFilter } = useAppStore();
  const [sorting, setSorting] = useState<SortingState>([]);

  const filteredData = useMemo(() => {
    const parsed = alumniFilterSchema.safeParse(alumniFilter);
    const filter = parsed.success ? parsed.data : {};

    return mockAlumni.filter((a) => {
      if (filter.search && !a.name.toLowerCase().includes(filter.search.toLowerCase()) && !a.company.toLowerCase().includes(filter.search.toLowerCase())) {
        return false;
      }
      if (filter.status && filter.status !== "all" && a.fundingStatus !== filter.status) {
        return false;
      }
      return true;
    });
  }, [alumniFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Alumni Registry</h1>
          <p className="text-muted-foreground mt-1">Manage and track alumni donors across your network.</p>
        </div>
        <AddAlumniModal />
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-lg p-4 flex flex-col sm:flex-row gap-3"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name or company..."
            value={alumniFilter.search || ""}
            onChange={(e) => setAlumniFilter({ search: e.target.value })}
            className="w-full pl-9 pr-4 py-2 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring/20 text-foreground placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {statusOptions.map((status) => (
            <button
              key={status}
              onClick={() => setAlumniFilter({ status })}
              className={`px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-colors ${
                (alumniFilter.status || "all") === status
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-lg overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id} className="border-b border-border bg-muted/30">
                  {hg.headers.map((header) => (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors"
                    >
                      <div className="flex items-center gap-1">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        <ArrowUpDown className="w-3 h-3" />
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-border">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-muted/20 transition-colors">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3.5">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-border text-xs text-muted-foreground">
          Showing {filteredData.length} of {mockAlumni.length} alumni
        </div>
      </motion.div>
    </div>
  );
}
