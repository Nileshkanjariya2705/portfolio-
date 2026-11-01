import Image from "next/image";
import {
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  CircleDot,
  FileText,
  LayoutDashboard,
  Mountain,
  Plus,
  Search,
  Settings,
  Users,
  Waves,
} from "lucide-react";
import type { Project } from "@/lib/content";

export function ProjectPreview({
  project,
  large = false,
}: {
  project: Project;
  large?: boolean;
}) {
  // Only public captures that were successfully verified are used as screenshots.
  // Private and inaccessible projects use explicitly labeled interface concepts.
  if (project.image)
    return (
      <div
        className={`project-visual ${project.theme} ${large ? "large" : ""}`}
      >
        <div className="screenshot-frame">
          <div className="browser-chrome">
            <i />
            <i />
            <i />
            <span>{project.live?.replace("https://", "")}</span>
          </div>
          <Image
            src={project.image}
            alt={project.imageAlt || project.name}
            width={1440}
            height={960}
            loading={large ? "eager" : "lazy"}
            sizes={
              large
                ? "(max-width: 800px) 100vw, 1100px"
                : "(max-width: 800px) 100vw, 600px"
            }
          />
        </div>
      </div>
    );
  return (
    <div className={`project-visual ${project.theme} ${large ? "large" : ""}`}>
      {project.theme === "shred" ? (
        <div className="adventure-concept">
          <div className="adventure-logo">
            <Mountain size={20} /> SHRED HIMALAYAS
          </div>
          <div className="mountain-art">
            <span />
            <span />
            <span />
          </div>
          <div className="adventure-copy">
            <span>BEYOND THE EVERYDAY</span>
            <strong>
              Find your
              <br />
              higher ground.
            </strong>
            <span className="adventure-link">
              Explore the Himalayas <ArrowUpRight size={13} />
            </span>
          </div>
        </div>
      ) : (
        <div className="app-mockup">
          <aside className="mock-sidebar">
            <span className="mock-logo">
              {project.theme === "brainros" ? (
                <BookOpen size={18} />
              ) : project.theme === "property" ? (
                <Building2 size={18} />
              ) : (
                <Waves size={18} />
              )}
              <b>
                {project.theme === "brainros"
                  ? "brainros"
                  : project.theme === "property"
                    ? "property"
                    : "S&S"}
              </b>
            </span>
            <div className="mock-menu selected">
              <LayoutDashboard />
              Overview
            </div>
            <div className="mock-menu">
              <Users />
              {project.theme === "brainros"
                ? "Students"
                : project.theme === "property"
                  ? "Properties"
                  : "Suppliers"}
            </div>
            <div className="mock-menu">
              <CalendarDays />
              {project.theme === "procurement" ? "Requests" : "Schedule"}
            </div>
            <div className="mock-menu">
              <BarChart3 />
              Reports
            </div>
            <div className="mock-menu">
              <Settings />
              Settings
            </div>
            <div className="mock-sidebar-bottom">
              <span>N</span>
              <div>
                Workspace
                <small>
                  Administrator <ChevronDown size={8} />
                </small>
              </div>
            </div>
          </aside>
          <div className="mock-main">
            <div className="mock-topbar">
              <span>
                Workspace <span>/ Overview</span>
              </span>
              <Search size={12} />
            </div>
            <div className="mock-heading">
              <div>
                <h3>
                  {project.theme === "brainros"
                    ? "Academic overview"
                    : project.theme === "property"
                      ? "Your properties, in sync."
                      : "Procurement overview"}
                </h3>
                <p>
                  {project.theme === "brainros"
                    ? "A clearer view of every learning journey."
                    : project.theme === "property"
                      ? "Everything you need. All in one place."
                      : "From request to the right partnership."}
                </p>
              </div>
              <span className="mock-add">
                <Plus size={11} /> New{" "}
                {project.theme === "procurement"
                  ? "RFQ"
                  : project.theme === "brainros"
                    ? "exam"
                    : "property"}
              </span>
            </div>
            <div className="mock-stats">
              {(project.theme === "brainros"
                ? ["Students", "Examinations", "Performance"]
                : project.theme === "property"
                  ? ["Properties", "Bookings", "Availability"]
                  : ["Active RFQs", "Quotations", "Suppliers"]
              ).map((s, i) => (
                <div key={s}>
                  <span>{s}</span>
                  <strong>{["Overview", "Manage", "Explore"][i]}</strong>
                  <div className="mini-bar">
                    <i style={{ width: `${54 + i * 15}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mock-chart">
              <div className="mock-chart-title">
                <b>
                  {project.theme === "procurement"
                    ? "Quotation activity"
                    : project.theme === "property"
                      ? "Booking calendar"
                      : "Performance insights"}
                </b>
                <span>
                  This month <ChevronDown size={9} />
                </span>
              </div>
              {project.theme === "property" ? (
                <div className="calendar-concept">
                  {Array.from({ length: 28 }, (_, i) => (
                    <span
                      key={i}
                      className={
                        (i > 7 && i < 13) || (i > 17 && i < 23) ? "booked" : ""
                      }
                    >
                      {i + 1}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="chart-bars">
                  {[35, 49, 40, 62, 54, 78, 70, 88, 76, 95, 84, 100].map(
                    (h, i) => (
                      <span key={i} style={{ height: `${h}%` }} />
                    ),
                  )}
                </div>
              )}
              <div className="chart-labels">
                <span>MON</span>
                <span>TUE</span>
                <span>WED</span>
                <span>THU</span>
                <span>FRI</span>
                <span>SAT</span>
                <span>SUN</span>
              </div>
            </div>
            <div className="mock-bottom">
              <span>
                <CircleDot size={11} />{" "}
                {project.theme === "brainros"
                  ? "Examination management"
                  : project.theme === "property"
                    ? "Connected property operations"
                    : "Quotation comparison"}
              </span>
              <Check size={12} />
            </div>
          </div>
        </div>
      )}
      <span className="concept-label">
        <FileText size={10} /> Illustrative interface concept
      </span>
    </div>
  );
}
