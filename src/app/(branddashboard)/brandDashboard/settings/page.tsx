"use client";

import { useState } from "react";
import Image from "next/image";
import {
  MdSave, MdSearch, MdAdd, MdClose, MdPerson, MdGroup, MdSecurity,
  MdMoreVert, MdShield, MdLock, MdDevices,
  MdLogout, MdUpload,
} from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";
import profileImg from "@/app/assets/auth/Ellipse 2.png";

type Tab = "Brand Profile" | "Team" | "Security";

/* ─── Team members ─── */
const MEMBERS = [
  { id: 1, name: "Alex Rivera", email: "alex.r@portfolio.com", role: "Admin", active: "2 mins ago", img: profileImg },
  { id: 2, name: "Diana Soros", email: "diana.sor@nexus.io", role: "Designer", active: "Yesterday", img: profileImg },
  { id: 3, name: "Marcus Chan", email: "m.chan@pilothub.co", role: "Reviewer", active: "2 hours ago", img: profileImg },
  { id: 4, name: "David Vance", email: "vance@pilothub.co", role: "Product Analyst", active: "Last Week", img: profileImg },
];

const roleStyle: Record<string, string> = {
  Admin: "bg-[#3E3EDF] text-white",
  Designer: "bg-purple-100 text-purple-700",
  Reviewer: "bg-green-100 text-green-700",
  "Product Analyst": "bg-orange-100 text-orange-700",
};

const ROLE_PERMISSIONS = [
  "Can manage entire campaigns and settings",
  "Can manage performance metrics and analytics",
  "Campaign campaign objects and creative assets",
  "Access reporting and export data",
];

/* ─── Sessions ─── */
const SESSIONS = [
  { device: "LiveStore Pro 10", detail: "Active now · Chrome", canRevoke: false },
  { device: "iPhone 10 Pro", detail: "Last active 2 days ago", canRevoke: true },
  { device: "Windows WorkStation", detail: "Last active 5 days ago", canRevoke: true },
];

/* ─── Invite Modal ─── */
function InviteModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Manager");

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-[15px] font-bold text-gray-900">Invite Team Member</h2>
          <button onClick={onClose} className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
            <MdClose size={15} className="text-gray-500" />
          </button>
        </div>
        <div className="p-6 space-y-5">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-2">Email Address</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. team@company.com"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#3E3EDF]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-2">Role Permissions</label>
              <div className="space-y-2">
                {ROLE_PERMISSIONS.map((p, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded bg-[#3E3EDF] flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-2 h-0.5 bg-white rounded-full" />
                    </div>
                    <p className="text-xs text-gray-600 leading-snug">{p}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-2">Select Role</label>
              <div className="relative">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#3E3EDF] appearance-none bg-white"
                >
                  {["Admin", "Manager", "Designer", "Reviewer", "Product Analyst"].map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
                <FiChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              <p className="text-[11px] text-gray-400 mt-2 leading-snug">Invitation link valid for 72 hrs</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 px-6 pb-6">
          <button onClick={onClose} className="flex-1 border border-gray-300 text-gray-600 text-sm font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition">
            Cancel
          </button>
          <button className="flex-1 bg-[#3E3EDF] text-white text-sm font-bold py-2.5 rounded-xl hover:bg-[#3232c0] transition">
            Send Invitation →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Brand Profile Tab ─── */
function BrandProfileTab() {
  const [brandName, setBrandName] = useState("Nibbl Reg");
  const [category, setCategory] = useState("Product & Payments");
  const [website, setWebsite] = useState("boltbeyond.ai");
  const [supportEmail, setSupportEmail] = useState("support@nibbl.ai");

  return (
    <div className="space-y-6">
      {/* Brand Identity */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
        <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-5">Brand Identity</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-2">Brand Name</label>
            <input value={brandName} onChange={(e) => setBrandName(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#3E3EDF]" />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-2">Industry / Category</label>
            <div className="relative">
              <select value={category} onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#3E3EDF] appearance-none bg-white">
                <option>Product & Payments</option>
                <option>Food & Beverage</option>
                <option>Health & Wellness</option>
                <option>Electronics</option>
              </select>
              <FiChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Website & Contact */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
        <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-5">Website URL</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-2">Platform Name</label>
            <input value={website} onChange={(e) => setWebsite(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#3E3EDF]" />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-2">Support Email</label>
            <input value={supportEmail} onChange={(e) => setSupportEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#3E3EDF]" />
            <p className="text-[11px] text-gray-400 mt-1.5">You will be added as a customer facing support email</p>
          </div>
        </div>
      </div>

      {/* AI Activity Log */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
        <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4">AI Activity Log</h3>
        <div className="space-y-2">
          {[
            { label: "boltbeyond.ai", type: "Platform registered", color: "bg-green-100 text-green-700" },
            { label: "#TFRegistered", type: "Campaign activated", color: "bg-[#EEF0FF] text-[#3E3EDF]" },
            { label: "#TFRegistered", type: "Campaign activated", color: "bg-[#EEF0FF] text-[#3E3EDF]" },
            { label: "support@nibbl.ai", type: "Support email changed", color: "bg-yellow-100 text-yellow-700" },
          ].map((a, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${a.color}`}>{a.label}</span>
              <p className="text-xs text-gray-500">{a.type}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Visual Assets */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
        <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4">Visual Assets</h3>
        <div>
          <p className="text-xs font-bold text-gray-500 mb-3">Brand Logo</p>
          <p className="text-[11px] text-gray-400 mb-3">Upload a high-resolution logo (SVG or PNG). Recommended size at least 512×512.</p>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#3E3EDF] flex items-center justify-center text-white text-2xl font-black shrink-0">
              N
            </div>
            <div className="flex gap-2">
              <label className="cursor-pointer flex items-center gap-1.5 text-xs font-bold bg-[#EEF0FF] text-[#3E3EDF] px-3 py-2 rounded-xl hover:bg-[#dde0ff] transition">
                <MdUpload size={14} />
                Add Fav...
                <input type="file" accept="image/*" className="hidden" />
              </label>
              <button className="text-xs font-bold border border-red-200 text-red-500 px-3 py-2 rounded-xl hover:bg-red-50 transition">
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Team Tab ─── */
function TeamTab() {
  const [showInvite, setShowInvite] = useState(false);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-[20px] font-bold text-gray-900">Team &amp; Permissions</h2>
          <p className="text-sm text-gray-400">Manage your organization members and their access levels.</p>
        </div>
        <button
          onClick={() => setShowInvite(true)}
          className="flex items-center gap-2 bg-[#3E3EDF] text-white text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-[#3232c0] transition self-start"
        >
          <MdAdd size={16} />
          Invite User
        </button>
      </div>

      {/* Total members stat */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 inline-block">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Members</p>
        <p className="text-[32px] font-black text-gray-900">42</p>
      </div>

      {/* Member Directory */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm font-bold text-gray-800">Member Directory</h3>
        </div>
        <div className="hidden sm:grid grid-cols-5 px-5 py-3 bg-gray-50 text-[10px] font-bold tracking-wider text-gray-400 uppercase border-b border-gray-100">
          <div className="col-span-2">Name</div>
          <div>Email Address</div>
          <div>Role</div>
          <div>Last Active / Actions</div>
        </div>
        <div className="divide-y divide-gray-100">
          {MEMBERS.map((m) => (
            <div key={m.id} className="grid grid-cols-1 sm:grid-cols-5 px-5 py-4 items-center gap-2 hover:bg-gray-50 transition">
              <div className="col-span-2 flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0">
                  <Image src={m.img} alt={m.name} fill className="object-cover" />
                </div>
                <p className="text-sm font-semibold text-gray-800">{m.name}</p>
              </div>
              <p className="text-xs text-gray-500">{m.email}</p>
              <div>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${roleStyle[m.role] ?? "bg-gray-100 text-gray-600"}`}>
                  {m.role}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-400">{m.active}</p>
                <button className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-100">
                  <MdMoreVert size={14} className="text-gray-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="px-5 py-3 border-t border-gray-100">
          <p className="text-[11px] text-gray-400">Showing 4 of 12 members</p>
        </div>
      </div>

      {/* Role Blueprint */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
        <h3 className="text-sm font-bold text-gray-800 mb-4">Role Blueprint</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { title: "Administrative Access", desc: "Changes apply instantly to all assigned candidates.", icon: <MdShield size={18} className="text-[#3E3EDF]" />, bg: "bg-[#EEF0FF]" },
            { title: "Campaign Manager", desc: "Create campaign objects, view analytics, full creative control.", icon: <MdGroup size={18} className="text-purple-600" />, bg: "bg-purple-50" },
          ].map((r, i) => (
            <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
              <div className={`w-9 h-9 rounded-xl ${r.bg} flex items-center justify-center shrink-0`}>{r.icon}</div>
              <div>
                <p className="text-sm font-bold text-gray-800">{r.title}</p>
                <p className="text-xs text-gray-400 mt-0.5 leading-snug">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showInvite && <InviteModal onClose={() => setShowInvite(false)} />}
    </div>
  );
}

/* ─── Security Tab ─── */
function SecurityTab() {
  const [twoFa, setTwoFa] = useState(true);
  const [currentPw, setCurrentPw] = useState("••••••••••");
  const [newPw, setNewPw] = useState("••••••••••");
  const [confirmPw, setConfirmPw] = useState("••••••••••");

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-[20px] font-bold text-gray-900">Protection</h2>
        <p className="text-sm text-gray-400 mt-0.5 max-w-lg">
          Manage your organizational gatekeeping, access tokens, and multi-layered authorization protocols for Nibbl AI.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Change Credentials */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 space-y-4">
          <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
            <MdLock size={16} className="text-[#3E3EDF]" />
            Change Credentials
          </h3>
          {[
            { label: "Current Password", val: currentPw, set: setCurrentPw, showRemove: false },
            { label: "New Password", val: newPw, set: setNewPw, showRemove: false },
            { label: "Confirm Password", val: confirmPw, set: setConfirmPw, showRemove: true },
          ].map((f, i) => (
            <div key={i}>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">{f.label}</label>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={f.val}
                  onChange={(e) => f.set(e.target.value)}
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#3E3EDF]"
                />
                {f.showRemove && (
                  <button className="text-xs font-bold text-red-500 border border-red-200 px-3 rounded-xl hover:bg-red-50 transition">
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
          <button className="w-full border border-[#3E3EDF] text-[#3E3EDF] text-sm font-bold py-2.5 rounded-xl hover:bg-[#EEF0FF] transition">
            Update Key
          </button>
        </div>

        {/* Active Sessions */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 space-y-4">
          <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
            <MdDevices size={16} className="text-[#3E3EDF]" />
            Active Sessions
            <span className="ml-auto text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
              {SESSIONS.length}
            </span>
          </h3>
          <div className="space-y-3">
            {SESSIONS.map((s, i) => (
              <div key={i} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-sm font-semibold text-gray-800">{s.device}</p>
                  <p className="text-[11px] text-gray-400">{s.detail}</p>
                </div>
                {s.canRevoke && (
                  <button className="text-[11px] font-bold text-red-500 border border-red-200 px-2.5 py-1 rounded-lg hover:bg-red-50 transition">
                    Revoke
                  </button>
                )}
              </div>
            ))}
          </div>
          <button className="w-full flex items-center justify-center gap-2 text-xs font-bold text-red-500 border border-red-200 py-2.5 rounded-xl hover:bg-red-50 transition">
            <MdLogout size={14} />
            Logout All Devices
          </button>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-[#3E3EDF] text-white rounded-2xl p-5 flex items-center justify-between">
        <div className="flex items-start gap-3">
          <MdShield size={22} className="opacity-80 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold">Two-Factor Authentication</p>
            <p className="text-xs opacity-70 mt-0.5 max-w-sm leading-relaxed">
              Add an extra layer of security to your account. A verification code will be required at each login.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-[10px] font-bold bg-white/20 px-2.5 py-1 rounded-full">
            {twoFa ? "Protection Enabled" : "Disabled"}
          </span>
          <button
            onClick={() => setTwoFa(!twoFa)}
            className={`relative w-11 h-6 rounded-full overflow-hidden transition-colors ${twoFa ? "bg-white/30" : "bg-white/10"}`}
          >
            <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${twoFa ? "translate-x-6" : "translate-x-1"}`} />
          </button>
        </div>
      </div>

      {/* Audit Transparency */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-center">
          <div className="sm:col-span-2 space-y-2">
            <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
              <MdSecurity size={16} className="text-[#3E3EDF]" />
              Audit Transparency
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              The security of your organization is our highest mandate. Every login, token generation, and credential change is recorded in an immutable ledger for your review.
            </p>
            <div className="flex gap-4 pt-1">
              <div className="text-center">
                <p className="text-[18px] font-black text-gray-900">99.9%</p>
                <p className="text-[10px] text-gray-400">Uptime</p>
              </div>
              <div className="text-center">
                <p className="text-[18px] font-black text-[#3E3EDF]">AES-256</p>
                <p className="text-[10px] text-gray-400">Encryption</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#3E3EDF] to-indigo-900 flex items-center justify-center shadow-xl">
              <MdShield size={44} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>("Brand Profile");

  const TABS: { key: Tab; icon: React.ReactNode }[] = [
    { key: "Brand Profile", icon: <MdPerson size={15} /> },
    { key: "Team", icon: <MdGroup size={15} /> },
    { key: "Security", icon: <MdSecurity size={15} /> },
  ];

  return (
    <div className="p-4 md:p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-[22px] font-bold text-gray-900">Settings</h1>
          <div className="relative hidden sm:block">
            <MdSearch size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              placeholder="Search settings..."
              className="border border-gray-200 rounded-xl pl-8 pr-4 py-2 text-sm outline-none focus:border-[#3E3EDF] w-48"
            />
          </div>
        </div>
        <button className="flex items-center gap-2 bg-[#3E3EDF] text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-[#3232c0] transition self-start">
          <MdSave size={16} />
          Save Changes
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold whitespace-nowrap border-b-2 transition -mb-px ${
              tab === t.key ? "border-[#3E3EDF] text-[#3E3EDF]" : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {t.icon}
            {t.key}
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === "Brand Profile" && <BrandProfileTab />}
      {tab === "Team" && <TeamTab />}
      {tab === "Security" && <SecurityTab />}
    </div>
  );
}
