import type { Alumni, Project } from "./schemas";

export const mockAlumni: Alumni[] = [
  { id: "1", name: "Sarah Chen", email: "sarah.chen@techcorp.com", graduationYear: 2015, degree: "MBA", company: "TechCorp", role: "VP Engineering", fundingStatus: "committed", totalContributed: 250000, lastContactDate: "2026-01-15", location: "San Francisco, CA" },
  { id: "2", name: "James Okafor", email: "j.okafor@finserv.io", graduationYear: 2012, degree: "MS Finance", company: "FinServ", role: "Managing Director", fundingStatus: "active", totalContributed: 500000, lastContactDate: "2026-02-01", location: "New York, NY" },
  { id: "3", name: "Maria Rodriguez", email: "maria.r@biohealth.com", graduationYear: 2018, degree: "PhD Biotech", company: "BioHealth", role: "CTO", fundingStatus: "contacted", totalContributed: 75000, lastContactDate: "2026-01-28", location: "Boston, MA" },
  { id: "4", name: "David Kim", email: "d.kim@venture.vc", graduationYear: 2010, degree: "MBA", company: "Venture Capital Partners", role: "General Partner", fundingStatus: "committed", totalContributed: 1000000, lastContactDate: "2026-02-10", location: "Palo Alto, CA" },
  { id: "5", name: "Aisha Patel", email: "aisha@startuplab.co", graduationYear: 2019, degree: "BS CS", company: "StartupLab", role: "Founder & CEO", fundingStatus: "potential", totalContributed: 0, lastContactDate: "2025-12-15", location: "Austin, TX" },
  { id: "6", name: "Robert Müller", email: "r.muller@eurotech.de", graduationYear: 2008, degree: "MS Engineering", company: "EuroTech", role: "SVP Product", fundingStatus: "active", totalContributed: 350000, lastContactDate: "2026-01-20", location: "Berlin, Germany" },
  { id: "7", name: "Lisa Wang", email: "l.wang@quantfund.com", graduationYear: 2014, degree: "MS Mathematics", company: "QuantFund", role: "Portfolio Manager", fundingStatus: "committed", totalContributed: 750000, lastContactDate: "2026-02-05", location: "Chicago, IL" },
  { id: "8", name: "Omar Hassan", email: "omar.h@globalaid.org", graduationYear: 2016, degree: "MA Int'l Relations", company: "GlobalAid", role: "Program Director", fundingStatus: "contacted", totalContributed: 25000, lastContactDate: "2026-01-10", location: "Washington, DC" },
  { id: "9", name: "Emily Foster", email: "e.foster@lawpartners.com", graduationYear: 2011, degree: "JD", company: "Law Partners LLP", role: "Senior Partner", fundingStatus: "inactive", totalContributed: 150000, lastContactDate: "2025-08-20", location: "Los Angeles, CA" },
  { id: "10", name: "Raj Krishnamurthy", email: "raj.k@cloudscale.io", graduationYear: 2017, degree: "MS CS", company: "CloudScale", role: "Co-Founder", fundingStatus: "potential", totalContributed: 0, lastContactDate: "2026-01-30", location: "Seattle, WA" },
];

export const mockProjects: Project[] = [
  { id: "1", name: "Innovation Lab Fund", description: "Funding for the new campus innovation laboratory", targetAmount: 5000000, raisedAmount: 3250000, status: "active", alumniCount: 47, startDate: "2025-06-01" },
  { id: "2", name: "Scholarship Endowment", description: "Merit-based scholarships for underrepresented students", targetAmount: 2000000, raisedAmount: 2000000, status: "completed", alumniCount: 82, startDate: "2024-01-15" },
  { id: "3", name: "Research Center Expansion", description: "Expanding the biotech research facilities", targetAmount: 8000000, raisedAmount: 1500000, status: "active", alumniCount: 23, startDate: "2025-09-01" },
  { id: "4", name: "Global Alumni Network", description: "Building regional alumni chapters worldwide", targetAmount: 500000, raisedAmount: 125000, status: "planning", alumniCount: 8, startDate: "2026-03-01" },
];
